package handlers

import (
	"koda-b6-url-shortener/internal/models"
	"koda-b6-url-shortener/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *services.UserService
}

func NewUserHandler(sr *services.UserService) *UserHandler {
	return &UserHandler{
		service: sr,
	}
}

// GetById godoc
// @Summary Get user by ID
// @Description Retrieve user detail by ID
// @Tags users
// @Produce json
// @Param id path string true "User ID"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 404 {object} models.Response
// @Router /api/users/{id} [get]
func (h *UserHandler) GetById(ctx *gin.Context) {
	id := ctx.Param("id")
	user, err := h.service.GetById(id)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Input Invalid",
		})
	}

	if user == nil {
		ctx.JSON(http.StatusNotFound, models.Response{
			Success: false,
			Message: "User not found",
		})
		return
	}
	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "User found",
		Results: user,
	})
}

// Create godoc
// @Summary Register user
// @Description Create new user account
// @Tags auth
// @Accept json
// @Produce json
// @Param request body models.CreateUserRequest true "Register Request"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 500 {object} models.Response
// @Router /api/register [post]
func (h *UserHandler) Create(ctx *gin.Context) {
	var newUser models.CreateUserRequest

	if err := ctx.ShouldBindJSON(&newUser); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Create user failed",
		})
		return
	}

	if err := h.service.Register(&newUser); err != nil {
		ctx.JSON(http.StatusInternalServerError, models.Response{
			Success: false,
			Message: "Register Failed",
		})
		return
	}
	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Register successfuly",
	})
}

// Login godoc
// @Summary Login user
// @Description Authenticate user and return JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param request body models.LoginUserRequest true "Login Request"
// @Success 200 {object} models.Response
// @Failure 400 {object} models.Response
// @Failure 401 {object} models.Response
// @Router /api/login [post]
func (h *UserHandler) Login(ctx *gin.Context) {
	var req models.LoginUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, models.Response{
			Success: false,
			Message: "Email and password required",
		})
		return
	}

	user, token, err := h.service.Login(req)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, models.Response{
			Success: false,
			Message: "Invalid email or password",
		})
		return
	}

	ctx.JSON(http.StatusOK, models.Response{
		Success: true,
		Message: "Login success",
		Results: models.LoginUserResponse{
			Token: token,
			User:  user,
		},
	})
}
