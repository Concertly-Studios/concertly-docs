# Error Handling

The API uses conventional HTTP response codes to indicate the success or failure of a request.

## Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource was successfully created
- `400 Bad Request` - Request was malformed or invalid
- `401 Unauthorized` - Authentication failed or token missing
- `403 Forbidden` - Authentication succeeded but user lacks permissions
- `404 Not Found` - Requested resource doesn't exist
- `500 Internal Server Error` - Server error occurred

## Error Response Format

Error responses will include a message explaining what went wrong:

```json
{
  "error": "Detailed error message here"
}
```

## Common Error Scenarios

### Authentication Errors

- Missing credentials
```json
{
  "error": "Email and password are required."
}
```

- Invalid credentials
```json
{
  "error": "Invalid email or password"
}
```

### User Management Errors

- Failed registration
```json
{
  "error": "Failed to register user."
}
```

- User deletion errors
```json
{
  "error": "Failed to delete user: [specific error message]"
}
```