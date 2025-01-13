# Rate Limits

To ensure the stability and availability of our API, we implement rate limiting on all endpoints.

## Default Limits

- **Anonymous Requests**: 30 requests per minute
- **Authenticated Requests**: 60 requests per minute
- **Bulk Operations**: 10 requests per minute

## Rate Limit Headers

Rate limit information is included in the response headers:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

## Exceeding Rate Limits

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "error": "Rate limit exceeded. Please try again in X seconds.",
  "reset_at": "2024-01-13T12:00:00Z"
}
```

## Best Practices

To avoid hitting rate limits:
1. Implement caching where appropriate
2. Batch operations when possible
3. Handle rate limit errors gracefully with exponential backoff
4. Monitor your rate limit headers