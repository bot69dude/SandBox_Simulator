package serverconfig

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	ServerPort  string
	DatabaseURL string
	Environment string
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, fmt.Errorf("Error loading .env file: %v", err)
	}

	return &Config{
		ServerPort:  GetEnv("PORT", "8080"),
		DatabaseURL: GetEnv("DATABASE_URL", "postgres://user:password@localhost:5432/mydb"),
		Environment: GetEnv("ENVIRONMENT", "development"),
	}, nil
}

func GetEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
