package utils

import (
	"net/http"
	"encoding/json"
)

type SuccessResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type ErrorResponse struct {
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
}

func ResponsewithSuccess(w http.ResponseWriter,code int, message string, data interface{}) {
	response := SuccessResponse{
		Message: message,
		Data:    data,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(response)
}

func ResponsewithError(w http.ResponseWriter, code int, message string, err string) {
	response := ErrorResponse{
		Message: message,
		Error:   err,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(response)
}