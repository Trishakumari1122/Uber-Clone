
# User Logout

Invalidate the current user's session token.

## Endpoint

```
POST /users/logout
```

## Headers

| Name | Type | Description |
|------|------|-------------|
| Authorization | string | Bearer token for authentication |

## Response

### Success (200 OK)
```json
{
  "message": "Successfully logged out"
}
```

### Errors

| Status Code | Description |
|-------------|-------------|
| 401 | Unauthorized - Invalid or missing token |