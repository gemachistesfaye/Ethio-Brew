# 🛠️ Ethio-Brew Production Setup Guide (Pro)

This guide provides the exact steps required to deploy the **Ethio-Brew** platform to a professional cloud environment.

---

## 1. Database Configuration (Aiven MySQL)
1. Create a MySQL instance on [Aiven.io](https://aiven.io/).
2. Download the **CA Certificate** and store it in the `/backend` folder.
3. Use the following connection parameters in your `.env`:
   - `DB_HOST`: Your Aiven Hostname.
   - `DB_PORT`: `21992` (Default for Aiven).
   - `DB_USER`: `avnadmin`.
   - `DB_PASSWORD`: Your secret Aiven password.

## 2. Backend Deployment (Render)
1. Connect your GitHub repository to [Render.com](https://render.com/).
2. Create a **Web Service**.
3. **Build Command**: `cd backend && npm install`
4. **Start Command**: `node server.js`
5. **Environment Variables**: Add all variables listed in the root `README.md`.

### 📧 SMTP / Email Setup (Critical)
To send verification emails, you MUST use a Google App Password:
1. Enable **2-Step Verification** on your Gmail account.
2. Go to **Google Account > Security > App Passwords**.
3. Create a new password called "EthioBrew".
4. Copy the 16-character code into the `EMAIL_PASS` field on Render.

## 3. Frontend Deployment (Vercel)
1. Import your repository into [Vercel](https://vercel.com/).
2. **Root Directory**: `frontend`.
3. **Build Command**: `npm run build`.
4. **Environment Variables**:
   - `VITE_API_URL`: Your full Render API URL (e.g., `https://ethio-brew-1.onrender.com/api`).

---

## 4. Troubleshooting Production Issues

### CORS Blocked Errors
If your browser console shows a "CORS" error, check these two things:
1. **Trailing Slashes**: Ensure your `FRONTEND_URL` in Render matches your Vercel URL exactly (e.g., `https://ethio-brew.vercel.app` with NO `/` at the end).
2. **Extensions**: Disable any "Site Blocker" or "AdBlock" extensions. They often intercept network requests and cause fake CORS errors. Use **Incognito Mode** to verify.

### 404 on Refresh
The platform uses SPA routing. We have included a `vercel.json` file to handle this. If you get a 404 when refreshing the page, ensure the `vercel.json` is in the `frontend` root directory:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---
*© 2026 Ethio-Brew Documentation — v1.2.0*
