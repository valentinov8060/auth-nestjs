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
  "error" : "Username or email already registered"
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
  "error" : "email atau password salah"
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
  "error" : "Unauthorized"
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
  "error" : "Username length max 100"
}
```
