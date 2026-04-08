package services

import (
	"errors"
	"fmt"
	"koda-b6-url-shortener/internal/lib"
	"koda-b6-url-shortener/internal/models"
	"koda-b6-url-shortener/internal/repository"
)

type LinkService struct {
	repo *repository.LinkRepository
}

func NewLinkService(rp *repository.LinkRepository) *LinkService {
	return &LinkService{
		repo: rp,
	}
}

// membuat slug
func (s *LinkService) CreateLink(req models.CreateLinkRequest, userID int) (*models.LinkResponse, error) {
	var slug string

	if req.Slug != "" {
		exists, err := s.repo.SlugExists(req.Slug)
		if err != nil {
			return nil, err
		}
		if exists {
			return nil, errors.New("slug already taken, please use another one")
		}
		slug = req.Slug
	} else {
		slug = lib.GenerateRandomString(6)
	}

	newLink := models.Link{
		UserId:      userID,
		OriginalURL: req.OriginalURL,
		Slug:        slug,
	}

	err := s.repo.Create(newLink)
	if err != nil {
		return nil, err
	}

	return &models.LinkResponse{
		OriginalURL: newLink.OriginalURL,
		Slug:        newLink.Slug,
		ShortenURL:  fmt.Sprintf("http://localhost:8888/%s", newLink.Slug),
	}, nil
}

// mencari URL asli berdasarkan slug untuk redirect
func (s *LinkService) GetOriginalURL(slug string) (string, error) {
	link, err := s.repo.GetBySlug(slug)
	if err != nil {
		return "", errors.New("link not found")
	}
	return link.OriginalURL, nil
}

// mengambil semua link berdasarkan user
func (s *LinkService) GetUserLinks(userID int) ([]models.LinkResponse, error) {
	links, err := s.repo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	var res []models.LinkResponse
	for _, l := range links {
		res = append(res, models.LinkResponse{
			Id:          l.Id,
			OriginalURL: l.OriginalURL,
			Slug:        l.Slug,
			ShortenURL:  fmt.Sprintf("http://localhost:8888/%s", l.Slug),
			CreatedAt:   l.CreatedAt,
		})
	}
	return res, nil
}

// menghapus link
func (s *LinkService) DeleteLink(id string, userID int) error {
	link, err := s.repo.GetLinkById(id)
	if err != nil {
		return errors.New("link not found")
	}

	if link.UserId != userID {
		return errors.New("unauthorized")
	}

	return s.repo.Delete(id)
}
