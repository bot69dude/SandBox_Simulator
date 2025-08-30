package routes

import (
	"net/http"

	"github.com/bot69dude/golang_restapi.git/internal/handlers"
)

func SetupUserRoutes(mux *http.ServeMux, handlerFunc *handlers.Handler) {
	mux.HandleFunc("POST /users/register", handlerFunc.CreateUserHandler())
	mux.HandleFunc("POST /users/login", handlerFunc.LoginUserHandler())
}