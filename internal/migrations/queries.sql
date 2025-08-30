-- name: CreateUsersTable :one
INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;

-- name: CreateBlogsTable :one
INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users 
WHERE email = $1 
LIMIT 1;

-- name: GetBlogByID :one
SELECT * FROM blogs WHERE id = $1;

-- name: UpdateUser :exec
UPDATE users SET 
    username = $1, 
    email = $2, 
    password = $3, 
    updated_at = CURRENT_TIMESTAMP 
WHERE id = $4;

-- name: UpdateBlog :exec
UPDATE blogs SET 
    title = $1, 
    content = $2, 
    updated_at = CURRENT_TIMESTAMP 
WHERE id = $3;

-- name: DeleteUser :exec
DELETE FROM users WHERE id = $1;

-- name: DeleteBlog :exec
DELETE FROM blogs WHERE id = $1;

-- name: ListUsers :many
SELECT * FROM users 
ORDER BY created_at DESC 
LIMIT $1 OFFSET $2;

-- name: ListBlogs :many
SELECT * FROM blogs 
ORDER BY created_at DESC 
LIMIT $1 OFFSET $2;