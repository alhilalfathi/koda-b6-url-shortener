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

	linkRepo    *repository.LinkRepository
	linkService *service.LinkService
	linkHandler *handlers.LinkHandler
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

	c.linkRepo = repository.NewLinkRepository(c.db)
	c.linkService = service.NewLinkService(c.linkRepo)
	c.linkHandler = handlers.NewLinkHandler(c.linkService)
}

func (c *Container) UserHandler() *handlers.UserHandler {
	return c.userHandler
}

func (c *Container) LinkHandler() *handlers.LinkHandler {
	return c.linkHandler
}
