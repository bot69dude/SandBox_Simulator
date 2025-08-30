package routes

import (
	"net/http"
	"github.com/bot69dude/golang_restapi.git/internal/handlers"
	
)

func SetupRoutes(mux *http.ServeMux, handler *handlers.Handler) {
	SetupHealthRoutes(mux, handler)
	SetupUserRoutes(mux, handler)
}