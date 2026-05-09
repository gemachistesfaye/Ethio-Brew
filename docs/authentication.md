# Authentication & Security

Ethio-Brew implements a robust, production-ready authentication system using **JSON Web Tokens (JWT)** and **HTTP-only Cookies**.

## Architecture Flow

```text
User → Login → JWT Generated → Stored in Cookie → Access Protected Routes
```

## 1. Registration Flow
1. User submits details (Name, Email, Password, etc.) via the Frontend `RegisterPage`.
2. The Backend (`authController.js`) receives the request.
3. The password is cryptographically hashed using **bcryptjs** (salt rounds = 10).
4. The user is saved to the MySQL database with `is_verified` set to `FALSE`.
5. An email containing a verification link is dispatched via **nodemailer**.

## 2. Login Flow
1. User submits Email and Password via the `LoginPage`.
2. Backend verifies the user exists and that `is_verified` is `TRUE`.
3. Backend compares the provided password against the bcrypt hash in the database.
4. If successful, the Backend generates a **JWT** signed with the `JWT_SECRET`.
5. The JWT is injected into a secure, `HTTP-only`, `Strict` cookie attached to the response.
6. The Frontend receives the user metadata (excluding the token) and updates the React `AuthContext`.

## 3. Why HTTP-Only Cookies?
Storing JWTs in `localStorage` exposes them to Cross-Site Scripting (XSS) attacks. By setting the token in an `HTTP-only` cookie:
- The token cannot be accessed via JavaScript (`document.cookie`).
- The browser automatically attaches the cookie to all subsequent API requests.
- This represents an industry-standard security measure for modern web applications.

## 4. Protected Routes
Access to specific pages (like Checkout, Settings, and Admin Panels) is guarded by:
- **Frontend Route Guard**: The `ProtectedRoute` component in `App.jsx` prevents rendering unless the `AuthContext` confirms an active session.
- **Backend Middleware**: The `authMiddleware.js` extracts the JWT from the incoming cookie, verifies the signature, and rejects unauthorized API requests with a `401 Unauthorized` or `403 Forbidden`.
