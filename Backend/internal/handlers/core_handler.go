package handlers

import (
	"database/sql"

	"github.com/bot69dude/golang_restapi.git/internal/dbschema"
)

type Handler struct {
	DB *sql.DB
	Queries *dbschema.Queries
}

func NewHandler(db *sql.DB, queries *dbschema.Queries) *Handler {
	return &Handler{
		DB: db,
		Queries: queries,
	}
}