# API Endpoints

## Authentication

### Register
```http
POST /register
```

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password123",
  "displayName": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully. Please verify your email."
}
```

**Error Responses:**

`400 Bad Request`
```json
{
  "error": "Email and password are required."
}
```

`500 Internal Server Error`
```json
{
  "error": "Failed to register user.",
  "email": "user@example.com"
}
```

### Login
```http
POST /login
```

Authenticate a user and receive an access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGc..."
}
```

**Error Responses:**

`400 Bad Request`
```json
{
  "error": "Email and password are required."
}
```

`401 Unauthorized`
```json
{
  "error": "Invalid email or password"
}
```

### Delete Account
```http
DELETE /delete-user
```

Delete the authenticated user's account. Requires JWT authentication.

**Headers:**
| Name | Value | Description |
|------|--------|-------------|
| Authorization | Bearer {token} | JWT access token obtained from login |

**Response:** `200 OK`
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**

`400 Bad Request`
```json
{
  "error": "Failed to delete user: {specific error message}"
}
```

`401 Unauthorized`
```json
{
  "error": "Missing Authorization Header"
}
```

`500 Internal Server Error`
```json
{
  "error": "An error occurred: {error details}"
}
```

### Home
```http
GET /
```

Returns the signup/login HTML page.

**Response:** `200 OK`
```
HTML content for signup/login page
```