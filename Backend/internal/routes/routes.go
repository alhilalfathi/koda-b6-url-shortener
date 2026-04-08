package routes

import (
	"koda-b6-url-shortener/internal/di"
	"koda-b6-url-shortener/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Backend shortlink
// @version 1.0.0
// @description API for URL Shortener Link
// @host localhost:8888
// @BasePath /
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
func SetupRoutes(r *gin.Engine, conn *pgxpool.Pool) {
	container := di.NewContainer(conn)

	userHandler := container.UserHandler()
	linkHandler := container.LinkHandler()

	a := r.Group("/api")
	{
		a.POST("/register", userHandler.Create)
		a.POST("/login", userHandler.Login)
		l := a.Group("/links")
		l.Use(middleware.AuthMiddleware())
		{
			l.POST("", linkHandler.CreateLink)
			l.GET("", linkHandler.GetUserLinks)
			l.DELETE("/:id", linkHandler.DeleteLink)
		}
	}
	r.GET("/:slug", linkHandler.Redirect)
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}
