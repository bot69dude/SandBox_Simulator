package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Claims struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	jwt.RegisteredClaims
}

// CreateUserClaims creates a new Claims struct for a user with standard JWT claims
func CreateUserClaims(userID int, username, email string) Claims {
	return Claims{
		UserID:   userID,
		Username: username,
		Email:    email,
		RegisteredClaims: jwt.RegisteredClaims{
			// Set expiration time (e.g., 24 hours from now)
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "your-app-name",
			Subject:   username,
		},
	}
}

func GenerateJWT(claims Claims, secretKey string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secretKey))
}

// Example usage:
/*
func CreateTokenForUser(user *models.User, secretKey string) (string, error) {
    // Create claims for the user
    claims := CreateUserClaims(
        user.ID,
        user.Username,
        user.Email,
    )

    // Generate the JWT token
    return GenerateJWT(claims, secretKey)
}
*/
