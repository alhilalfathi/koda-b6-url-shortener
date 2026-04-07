package main

import (
	"context"
	"fmt"
	"koda-b6-url-shortener/internal/routes"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	dbURL := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("PGUSER"),
		os.Getenv("PGPASSWORD"),
		os.Getenv("PGHOST"),
		os.Getenv("PGPORT"),
		os.Getenv("PGDATABASE"),
	)

	config, err := pgxpool.ParseConfig(dbURL)
	if err != nil {
		fmt.Printf("Failed to parse config: %v\n", err)
		os.Exit(1)
	}

	config.MaxConns = 20
	config.MinConns = 5

	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		fmt.Println("Failed to connecting db")
		os.Exit(1)
	}

	defer pool.Close()

	err = pool.Ping(context.Background())
	if err != nil {
		fmt.Printf("Failed to ping database: %v\n", err)
		os.Exit(1)
	}

	r := gin.Default()

	routes.SetupRoutes(r, pool)

	r.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
