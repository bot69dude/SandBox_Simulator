package dbconfig

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

func ConnectDB(DatabaseURL string) *sql.DB {
	db, err := sql.Open("postgres", DatabaseURL)
	if err != nil {
		panic(err)
	}

	if err := db.Ping(); err != nil {
		panic(err)
	}

	fmt.Println("Connected to the database successfully")
	return db
}

func MigrateDB(db *sql.DB) error {
	migrationSQL, err := os.ReadFile("internal/migrations/schema.sql")
	if err != nil {
		return fmt.Errorf("error reading migration file: %v", err)
	}

	_, err = db.Exec(string(migrationSQL))
	if err != nil {
		return fmt.Errorf("error executing migrations: %v", err)
	}

	fmt.Println("Database migrations completed successfully")
	return nil
}
