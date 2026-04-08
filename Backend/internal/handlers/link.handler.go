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

// CreateLink godoc
// @Summary Create short link
// @Description Generate short link from original URL
// @Tags links
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body models.CreateLinkRequest true "Create Link Request"
// @Success 201 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 401 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/links [post]
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

	userID, exists := ctx.Get("userId")
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

// GetUserLinks godoc
// @Summary Get user links
// @Description Get all links owned by authenticated user
// @Tags links
// @Produce json
// @Security BearerAuth
// @Success 200 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/links [get]
func (h *LinkHandler) GetUserLinks(ctx *gin.Context) {
	userID, _ := ctx.Get("userId")

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

// DeleteLink godoc
// @Summary Delete link
// @Description Delete a link by ID
// @Tags links
// @Produce json
// @Security BearerAuth
// @Param id path string true "Link ID"
// @Success 200 {object} models.Response
// @Failure 403 {object} models.Response
// @Router /api/links/{id} [delete]
func (h *LinkHandler) DeleteLink(ctx *gin.Context) {
	linkID := ctx.Param("id")
	userID, _ := ctx.Get("userId")

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

// Redirect godoc
// @Summary Redirect to original URL
// @Description Redirect user to original URL using slug
// @Tags redirect
// @Param slug path string true "Short link slug"
// @Success 302
// @Failure 404 {object} models.Response
// @Router /api/{slug} [get]
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
