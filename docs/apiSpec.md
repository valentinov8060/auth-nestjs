# Auth API Spec

## 1. Register Auth API

Public endpoint : POST /auth/register

Request Body :
```json
{
  "email" : "user@example.com",
  "password" : "securePassword123",
  "username" : "valentinov8060",
}
```

Response Body Success (201 Created) : 
```json
{
 "data" : {
    "token" : "unique-token",
    "user": {
      "id": "6wopd62vz5",
      "email": "user@example.com",
      "username" : "valentinov8060",
    }
  }
}
```

Response Body Error (400 Bad Request) :
```json
{
  "message": "Email already registered",
  "error": "Bad Request",
  "statusCode": 400
}
```

## 2. Login Auth API

Public endpoint : POST /auth/login

Request Body :
```json
{
  "email" : "user@example.com",
  "password" : "securePassword123"
}
```

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "token" : "unique-token",
    "user": {
      "id": "6wopd62vz5",
      "email": "user@example.com",
      "username" : "valentinov8060",
    }
  }
}
```

Response Body Error (401 Unauthorized) :
```json
{
  "message": "Invalid email",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## 3. Me Auth API

Endpoint : GET /auth/me

Headers :
- Authorization : Bearer token

Response Body Success (200 OK) :
```json
{
  "data" : {
    "user": {
      "id": "6wopd62vz5",
      "email": "user@example.com",
      "username" : "valentinov8060",
    }
  }
}
```

Response Body Error (401 Unauthorized) : 
```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

## 4. Update Auth API

Endpoint : PATCH /auth/update

Headers :
- Authorization : Bearer token 

Request Body :
```json
{
  "username" : "Valentinov", // optional
  "password" : "************" // optional
}
```

Response Body Success (200 OK) : 
```json
{
  "data" : {
    "token" : "unique-token",
    "user": {
      "id": "6wopd62vz5",
      "email": "user@example.com",
      "username" : "valentinov8060",
    }
  }
}
```

Response Body Error (400 Bad Request) : 
```json
{
  "message": [
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    "Password must be at least 8 characters long"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```
