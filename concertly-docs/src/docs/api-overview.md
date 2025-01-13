# API Overview

The Concertly API is a RESTful API that uses JSON for request and response bodies. It's built on standard HTTP and secured using JWT (JSON Web Tokens) authentication.

## Base URL

```
https://api.concertly.com/
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, you'll receive an access token that must be included in the `Authorization` header of subsequent requests:

```bash
Authorization: Bearer your_access_token_here
```

## Request Format

All requests should be made with JSON bodies and appropriate headers:

```bash
Content-Type: application/json
Accept: application/json
```

## Response Format

All responses are returned in JSON format. Successful responses will have a 2xx status code and contain either a `data` object or a `message` string:

```json
{
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```