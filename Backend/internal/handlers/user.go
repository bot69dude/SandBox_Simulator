package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/bot69dude/golang_restapi.git/internal/dbschema"
	"github.com/bot69dude/golang_restapi.git/internal/dtos"
	"github.com/bot69dude/golang_restapi.git/internal/utils"
)

func (h *Handler) CreateUserHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		var req dtos.CreateUserRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			utils.ResponsewithError(w, http.StatusBadRequest, "Invalid request payload", err.Error())
			return
		}

		hashedPassword, err := utils.HashPassword(req.Password)
		if err != nil {
			utils.ResponsewithError(w, http.StatusInternalServerError, "Failed to hash password", err.Error())
			return
		}

		// CreateUsersTable is generated from the SQL query named "CreateUsersTable"
		_, err = h.Queries.CreateUsersTable(ctx, dbschema.CreateUsersTableParams{
			Username: req.Name,
			Email:    req.Email,
			Password: hashedPassword,
		})

		if err != nil {
			utils.ResponsewithError(w, http.StatusInternalServerError, "Failed to create user", err.Error())
			return
		}

		utils.ResponsewithSuccess(w, http.StatusCreated, "User created successfully", nil)
		
	}
}

func (h *Handler) LoginUserHandler() http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        var req dtos.LoginUserRequest
        
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            utils.ResponsewithError(w, http.StatusBadRequest, "Invalid request payload", err.Error())
            return
        }

        // Get user by email
        user, err := h.Queries.GetUserByEmail(ctx, req.Email)
        if err != nil {
            utils.ResponsewithError(w, http.StatusUnauthorized, "Invalid credentials", err.Error())
            return
        }

        // Verify password
        if err := utils.ComparePassword(user.Password, req.Password); err != nil {
            utils.ResponsewithError(w, http.StatusUnauthorized, "Invalid credentials", "Invalid password")
            return
        }

        // Create JWT claims
        claims := utils.CreateUserClaims(
            int(user.ID),
            user.Username,
            user.Email,
        )

        // Generate JWT token using config secret key
        token, err := utils.GenerateJWT(claims, "your-secret-key")
        if err != nil {
            utils.ResponsewithError(w, http.StatusInternalServerError, "Failed to generate token", err.Error())
            return
        }

        response := map[string]interface{}{
            "token": token,
            "user": map[string]interface{}{
                "id":       user.ID,
                "username": user.Username,
                "email":    user.Email,
            },
        }

        utils.ResponsewithSuccess(w, http.StatusOK, "Login successful", response)
    }
}