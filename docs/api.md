# API Documentation

The Ethio-Brew backend provides a fully RESTful API. All endpoints are prefixed with `/api`.

## Base URL
`http://localhost:5000/api`

## Endpoints Overview

| Method | Route                       | Description                          | Auth Required |
|--------|-----------------------------|--------------------------------------|---------------|
| POST   | `/api/auth/register`        | Register a new user account          | No            |
| POST   | `/api/auth/login`           | Authenticate user and issue JWT      | No            |
| POST   | `/api/auth/verify`          | Verify user email/account            | No            |
| POST   | `/api/auth/logout`          | Clear JWT cookie                     | Yes           |
| POST   | `/api/auth/forgot-password` | Send password reset email            | No            |
| POST   | `/api/auth/reset-password`  | Update password using token          | No            |
| GET    | `/api/auth/profile`         | Get logged-in user profile           | Yes           |
| PUT    | `/api/auth/profile`         | Update user profile                  | Yes           |
| POST   | `/api/ai`                   | Communicate with AI assistant        | No            |

---

## Detailed Examples

### 1. Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "Abebe Kebede",
  "email": "abebe@example.com",
  "phone": "+251911234567",
  "address": "Bole, Addis Ababa",
  "password": "securepassword123"
}
```

**Success Response (201 Created):**
```json
{
  "message": "User registered successfully. Verification email sent.",
  "userId": 42
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "User already exists"
}
```

### 2. Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "abebe@example.com",
  "password": "securepassword123"
}
```

**Success Response (200 OK):**
*(Sets HTTP-Only Cookie with JWT)*
```json
{
  "user": {
    "id": 42,
    "name": "Abebe Kebede",
    "email": "abebe@example.com",
    "role": "user"
  }
}
```

**Error Response (403 Forbidden):**
```json
{
  "message": "Please verify your account first",
  "userId": 42
}
```

### 3. Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "abebe@example.com"
}
```

**Success Response (200 OK):**
```json
{
  "message": "Password reset link sent to your email"
}
```

## Error Handling
The API uses standard HTTP status codes:
- **200 OK**: The request succeeded.
- **201 Created**: A new resource was successfully created.
- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Missing or invalid JWT.
- **403 Forbidden**: Account not verified or lacking permissions.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected server error occurred.
