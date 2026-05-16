# 🛡️ Security & Authentication Architecture

Ethio-Brew implements enterprise-grade security protocols to protect user data, financial transactions and system integrity.

## 🔑 Authentication Framework
The platform uses a **Cookie-Based JWT Authentication** strategy.

### 1. The Token Lifecycle
- **Access Tokens**: Short-lived (15 mins) for active session security.
- **Refresh Tokens**: Long-lived (7 days) for seamless user experience.
- **Storage**: Tokens are stored in **HttpOnly, Secure** cookies to prevent XSS (Cross-Site Scripting) attacks.

### 2. Password Hardening
- **Encryption**: Passwords never touch the database in plain text.
- **Hashing**: We use **Bcrypt.js** with a high salt cost (12) to ensure brute-force resistance.

---

## 🛡️ Defensive Layers

### 1. Request Protection
- **Helmet.js**: Dynamically sets secure HTTP headers (CSP, HSTS) to protect against common web vulnerabilities.
- **CORS Management**: Strictly restricts API access to the approved Vercel storefront domain.
- **Rate Limiting**: Protects authentication and AI endpoints from DoS and brute-force attacks.

### 2. Role-Based Access Control (RBAC)
- **Customer**: Access to shop, profile, and order tracking.
- **Admin**: Exclusive access to the Business Intelligence Dashboard, Order Verification and Content Management.
- **Middleware Gate**: Every administrative request passes through a `verifyAdmin` middleware.

### 3. Account Hardening
- **Email Verification**: Mandatory OTP verification before account activation.
- **Session Termination**: Secure logout mechanism that clears all server-side and client-side cookies.

---

## 🏗️ Data Integrity
- **Sanitization**: All user inputs are sanitized to prevent SQL/NoSQL Injection.
- **Error Masking**: Production environments suppress stack traces to prevent system metadata leakage.

---
*© 2026 Ethio-Brew — Security Protocol Document.*
