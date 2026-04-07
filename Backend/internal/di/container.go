package di

import (
	"koda-b6-url-shortener/internal/handlers"
	"koda-b6-url-shortener/internal/repository"
	service "koda-b6-url-shortener/internal/services"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Container struct {
	db *pgxpool.Pool

	userRepo    *repository.UserRepository
	userService *service.UserService
	userHandler *handlers.UserHandler
}

func NewContainer(db *pgxpool.Pool) *Container {

	container := Container{
		db: db,
	}

	container.initDependencies()

	return &container
}

func (c *Container) initDependencies() {
	c.userRepo = repository.NewUserRepository(c.db)
	c.userService = service.NewUserService(c.userRepo)
	c.userHandler = handlers.NewUserHandler(c.userService)
}

func (c *Container) UserHandler() *handlers.UserHandler {
	return c.userHandler
}
