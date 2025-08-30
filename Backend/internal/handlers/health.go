package handlers

import (
	"net/http"
	"encoding/json"
)

func (h *Handler) HealthCheckHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		response := map[string]string{"status": "ok"}
		json.NewEncoder(w).Encode(response)
	}

}