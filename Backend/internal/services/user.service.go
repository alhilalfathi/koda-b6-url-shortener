package service

import (
	"errors"
	"koda-b6-url-shortener/internal/lib"
	"koda-b6-url-shortener/internal/models"
	"koda-b6-url-shortener/internal/repository"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(rp *repository.UserRepository) *UserService {
	return &UserService{
		repo: rp,
	}
}

func (s *UserService) GetById(id string) (*models.Users, error) {

	user, err := s.repo.GetById(id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) GetByEmail(email string) (*models.Users, error) {

	user, err := s.repo.GetByEmail(email)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) Login(req models.LoginUserRequest) (*models.Users, string, error) {
	user, err := s.repo.GetByEmail(req.Email)
	if err != nil {
		return nil, "", errors.New("Invalid email or password")
	}

	ok := lib.VerifyPassword(req.Password, user.Password)
	if !ok {
		return nil, "", errors.New("Invalid Email or Password")
	}

	if ok {
		token, err := lib.GenerateToken(user.Id)
		if err != nil {
			return nil, "", err
		}

		return user, token, nil
	}
	return nil, "", err
}

func (s *UserService) Register(req *models.CreateUserRequest) error {
	existingUser, _ := s.repo.GetByEmail(req.Email)

	if existingUser != nil {
		return errors.New("Email was registered")
	}

	hashed, err := lib.HashPassword(req.Password)
	if err != nil {
		return err
	}

	newUser := models.Users{
		FullName: req.FullName,
		Email:    req.Email,
		Password: hashed,
	}
	return s.repo.Create(newUser)
}
