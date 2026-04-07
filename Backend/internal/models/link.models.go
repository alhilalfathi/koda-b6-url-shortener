package models

import "time"

type Link struct {
	Id          int       `json:"id" db:"id"`
	UserId      int       `json:"user_id" db:"user_id"`
	OriginalURL string    `json:"original_url" db:"original_url"`
	Slug        string    `json:"slug" db:"slug"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

type CreateLinkRequest struct {
	OriginalURL string `json:"original_url" db:"original_url" binding:"required"`
	Slug        string `json:"slug" db:"slug" binding:"omitempty,alphanum,min=3,max=50"`
}

type LinkResponse struct {
	Id          int       `json:"id"`
	OriginalURL string    `json:"original_url"`
	Slug        string    `json:"slug"`
	ShortenURL  string    `json:"shorten_url"`
	CreatedAt   time.Time `json:"created_at"`
}
