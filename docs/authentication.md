# Authentication

DataStack API uses API keys to authenticate requests. You can view and manage your API keys in the [Dashboard](https://dashboard.datastack.io).

## API Keys

Your API key carries many privileges, so keep it secure! Do not share your API key in publicly accessible areas such as GitHub, client-side code, etc.

### Obtaining an API Key

1. Sign up for a DataStack account at [datastack.io/signup](https://datastack.io/signup)
2. Navigate to the API Keys section in your dashboard
3. Click "Create New API Key"
4. Give your key a descriptive name
5. Copy and securely store your key - it won't be shown again

## Using Your API Key

Include your API key in the `Authorization` header of all API requests:

```http
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl -X GET "https://api.datastack.io/api/quotes/AAPL" \
  -H "Authorization: Bearer sk_live_abc123xyz789"
```

```javascript
const response = await fetch('https://api.datastack.io/api/quotes/AAPL', {
  headers: {
    'Authorization': 'Bearer sk_live_abc123xyz789'
  }
});
```

```python
import requests

headers = {
    'Authorization': 'Bearer sk_live_abc123xyz789'
}

response = requests.get(
    'https://api.datastack.io/api/quotes/AAPL',
    headers=headers
)
```

## API Key Types

| Type        | Prefix      | Description                              |
|-------------|-------------|------------------------------------------|
| Live        | `sk_live_`  | Production API key with full access      |
| Test        | `sk_test_`  | Sandbox key with simulated data          |
| Restricted  | `sk_rstr_`  | Key with limited endpoint access         |

## Key Permissions

You can create restricted API keys with specific permissions:

- **read:quotes** - Access to quotes endpoints
- **read:historical** - Access to historical data
- **read:news** - Access to news endpoints
- **read:forex** - Access to forex endpoints
- **write:portfolio** - Create and modify portfolios
- **read:portfolio** - View portfolio data

## Error Responses

### Missing API Key

```json
{
  "success": false,
  "error": {
    "code": "MISSING_API_KEY",
    "message": "API key is required. Include it in the Authorization header."
  }
}
```

### Invalid API Key

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or has been revoked."
  }
}
```

### Insufficient Permissions

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Your API key does not have permission to access this resource."
  }
}
```

## Rate Limiting

API keys are subject to rate limits based on your plan:

| Plan        | Requests/Second | Requests/Day |
|-------------|-----------------|--------------|
| Free        | 5               | 1,000        |
| Pro         | 100             | 100,000      |
| Enterprise  | Unlimited       | Unlimited    |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705330200
```

## Security Best Practices

1. **Never expose keys in client-side code** - Always make API calls from your server
2. **Use environment variables** - Store keys in environment variables, not in code
3. **Rotate keys regularly** - Create new keys and revoke old ones periodically
4. **Use restricted keys** - Create keys with only the permissions you need
5. **Monitor usage** - Check your dashboard for unusual activity

## OAuth 2.0 (Enterprise)

Enterprise customers can use OAuth 2.0 for user-level authentication. Contact sales for details.
