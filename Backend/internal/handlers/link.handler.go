package handlers

import (
	"koda-b6-url-shortener/internal/models"
	"koda-b6-url-shortener/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LinkHandler struct {
	svc *services.LinkService
}

func NewLinkHandler(s *services.LinkService) *LinkHandler {
	return &LinkHandler{
		svc: s,
	}
}

func (h *LinkHandler) CreateLink(ctx *gin.Context) {
	var req models.CreateLinkRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "Unauthorized",
		})
		return
	}

	res, err := h.svc.CreateLink(req, userID.(int))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to create link",
			Error:   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusCreated, models.Response{
		Success: true,
		Message: "Link shortened successfully",
		Results: res,
	})
}

func (h *LinkHandler) GetUserLinks(ctx *gin.Context) {
	userID, _ := ctx.Get("user_id")

	links, err := h.svc.GetUserLinks(userID.(int))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Failed to fetch links",
			Error:   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Links retrieved successfully",
		Results: links,
	})
}

func (h *LinkHandler) DeleteLink(ctx *gin.Context) {
	linkID := ctx.Param("id")
	userID, _ := ctx.Get("user_id")

	err := h.svc.DeleteLink(linkID, userID.(int))
	if err != nil {
		ctx.JSON(http.StatusForbidden, models.Response{
			Success: false,
			Message: "Failed to delete link",
			Error:   err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Link deleted successfully",
	})
}

func (h *LinkHandler) Redirect(ctx *gin.Context) {
	slug := ctx.Param("slug")

	originalURL, err := h.svc.GetOriginalURL(slug)
	if err != nil {
		ctx.JSON(http.StatusNotFound, models.Response{
			Success: false,
			Message: "Short link not found",
		})
		return
	}

	ctx.Redirect(http.StatusFound, originalURL)
}
