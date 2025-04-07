# Get User Profile

Get the profile information of the currently authenticated user.

## Endpoint

```
GET /users/profile
```

## Headers

| Name | Type | Description |
|------|------|-------------|
| Authorization | string | Bearer token for authentication |

## Response

### Success (200 OK)
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phoneNumber": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Errors

| Status Code | Description |
|-------------|-------------|
| 401 | Unauthorized - Invalid or missing token |
| 404 | User not found |
