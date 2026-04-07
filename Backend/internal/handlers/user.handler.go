package handlers

import (
	"koda-b6-url-shortener/internal/models"
	service "koda-b6-url-shortener/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *service.UserService
}

func NewUserHandler(sr *service.UserService) *UserHandler {
	return &UserHandler{
		service: sr,
	}
}

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
