package routes

import (
	"net/http"
	"github.com/bot69dude/golang_restapi.git/internal/handlers"
)

func SetupHealthRoutes(mux *http.ServeMux, handler *handlers.Handler) {
	mux.HandleFunc("/health", handler.HealthCheckHandler())
}
