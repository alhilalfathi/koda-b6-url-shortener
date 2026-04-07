package repository

import (
	"context"
	"koda-b6-url-shortener/internal/models"
	"strconv"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type LinkRepository struct {
	db *pgxpool.Pool
}

func NewLinkRepository(d *pgxpool.Pool) *LinkRepository {
	return &LinkRepository{
		db: d,
	}
}

func (r *LinkRepository) Create(link models.Link) error {
	query := `
		INSERT INTO "LINKS" (user_id, original_url, slug, created_at) 
		VALUES ($1, $2, $3, $4)
	`
	_, err := r.db.Exec(context.Background(), query, link.UserId, link.OriginalURL, link.Slug, time.Now())
	return err
}

func (r *LinkRepository) GetLinkById(id string) (*models.Link, error) {
	numId, _ := strconv.Atoi(id)

	query := `SELECT id, user_id, original_url, slug, created_at FROM "LINKS" WHERE id=$1`

	rows, err := r.db.Query(context.Background(), query, numId)
	if err != nil {
		return nil, err
	}

	user, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *LinkRepository) GetByUserID(userID int) ([]models.Link, error) {
	query := `
		SELECT id, user_id, original_url, slug, created_at
		FROM "LINKS"
		WHERE user_id = $1
		ORDER BY created_at DESC
	`
	rows, err := r.db.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	links, err := pgx.CollectRows(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}
	return links, nil
}

func (r *LinkRepository) GetBySlug(slug string) (*models.Link, error) {
	query := `
		SELECT id, user_id, original_url, slug, created_at
		FROM "LINKS"
		WHERE slug = $1
	`
	rows, err := r.db.Query(context.Background(), query, slug)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	link, err := pgx.CollectOneRow(rows, pgx.RowToStructByName[models.Link])
	if err != nil {
		return nil, err
	}
	return &link, nil
}

func (r *LinkRepository) SlugExists(slug string) (bool, error) {
	query := `
		SELECT COUNT(*) FROM "LINKS" WHERE slug = $1
	`
	var count int
	err := r.db.QueryRow(context.Background(), query, slug).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}

func (r *LinkRepository) Delete(id string) error {
	numId, _ := strconv.Atoi(id)
	query := `DELETE FROM "LINKS" WHERE id=$1`

	_, err := r.db.Exec(context.Background(), query, numId)

	return err
}
