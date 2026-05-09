# Troubleshooting Guide

This document covers common issues encountered during local development and deployment, and how to resolve them.

## 1. CORS Errors (Frontend ↔ Backend)
**Symptom**: `Access-Control-Allow-Origin '*' not allowed with credentials` or `net::ERR_FAILED` when attempting to register/login.
**Cause**: The browser blocked the request because the backend CORS policy is misconfigured for credentials.
**Fix**: Ensure `backend/server.js` exactly matches the frontend origin:
```javascript
const corsOptions = {
  origin: "http://localhost:3000", // Must exactly match your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // Express 5 preflight fix
```

## 2. JWT Authentication Failures
**Symptom**: Always redirected to `/login` despite successfully logging in.
**Cause**: The HTTP-only cookie was not saved by the browser.
**Fix**: 
1. Ensure your frontend Axios calls explicitly include `withCredentials: true`.
2. Ensure you are accessing the frontend via `localhost` (browsers block cookies on raw IP addresses like `127.0.0.1` unless configured).

## 3. Database Connection Problems
**Symptom**: `ECONNREFUSED` or `Access denied for user 'root'@'localhost'` in the backend terminal.
**Cause**: MySQL is not running, or the `.env` credentials are incorrect.
**Fix**: 
1. Open XAMPP (or your MySQL service) and ensure the MySQL module is running.
2. Verify `DB_HOST`, `DB_USER`, and `DB_PASSWORD` in `backend/.env`.

## 4. "Missing parameter name at index 1: *" (Express 5 Error)
**Symptom**: Backend crashes immediately on startup with `PathError`.
**Cause**: Express 5 upgraded its routing engine (`path-to-regexp` v8), which no longer allows `*` as a global wildcard.
**Fix**: Change `app.options("*", cors())` to use a regex `app.options(/.*/, cors())`.

## 5. Emails Not Sending on Registration
**Symptom**: The console logs "Email not sent: EMAIL_USER and EMAIL_PASS are not set."
**Cause**: Missing Nodemailer configuration.
**Fix**: Add your Gmail address and a generated **App Password** (not your login password) to `EMAIL_USER` and `EMAIL_PASS` in the backend `.env`.
