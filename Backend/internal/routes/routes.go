package routes

import (
	"koda-b6-url-shortener/internal/di"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
)

func SetupRoutes(r *gin.Engine, conn *pgxpool.Pool) {
	container := di.NewContainer(conn)

	userHandler := container.UserHandler()

	a := r.Group("/api")
	{
		a.POST("/register", userHandler.Create)
		a.POST("/login", userHandler.Login)
		a.GET("/:id", userHandler.GetById)
	}
}
