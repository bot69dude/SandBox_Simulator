package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/bot69dude/golang_restapi.git/dbconfig"
	"github.com/bot69dude/golang_restapi.git/internal/dbschema"
	"github.com/bot69dude/golang_restapi.git/internal/handlers"
	"github.com/bot69dude/golang_restapi.git/internal/routes"
	"github.com/bot69dude/golang_restapi.git/serverconfig"
)

func main() {

	config, err := serverconfig.LoadConfig()
	if err != nil {
		log.Fatal("Could not load config:", err)
	}

	db := dbconfig.ConnectDB(config.DatabaseURL)
	defer db.Close()

	queries := dbschema.New(db)

	fmt.Printf("Server starting on port %s in %s mode\n", config.ServerPort, config.Environment)

	handler := handlers.NewHandler(db, queries)

	mux := http.NewServeMux()

	routes.SetupRoutes(mux, handler)

	// Run migrations before starting the server
	if err := dbconfig.MigrateDB(db); err != nil {
		log.Fatal("Migration failed:", err)
	}

	serverAddr := fmt.Sprintf(":%s", config.ServerPort)
	server := &http.Server{
		Addr:    serverAddr,
		Handler: mux,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Server error:", err)
	}
}
