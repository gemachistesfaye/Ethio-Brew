# 🚀 Local Setup & Cloud Deployment

This comprehensive guide covers everything from local development installation to production cloud deployment on Vercel and Render.

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher.
- **MySQL**: Local instance or Aiven cloud DB.
- **Google Cloud**: API key for Gemini 2.0 (optional).

### 2. Database Initialization
1. Create a database named `ethio_brew`.
2. Execute the schema: `mysql -u root -p ethio_brew < db/schema.sql`.
3. (Optional) Seed the data: `mysql -u root -p ethio_brew < db/seeds.sql`.

### 3. Backend (Node.js/Express)
1. `cd backend && npm install`
2. Create a `.env` file with:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   DB_NAME=ethio_brew
   JWT_SECRET=supersecretkey
   EMAIL_USER=system@ethiobrew.com
   EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
   GEMINI_API_KEY=your_key
   ```
3. Run `npm start`.

### 4. Frontend (React/Vite)
1. `cd frontend && npm install`
2. Run `npm run dev`.

---

## 🌐 Cloud Deployment

### 1. Frontend (Vercel)
- **Framework Preset**: Vite.
- **Root Directory**: `frontend`.
- **Build Command**: `npm run build`.
- **Environment Variable**: `VITE_API_URL` -> Your Render backend URL.

### 2. Backend (Render)
- **Service Type**: Web Service.
- **Runtime**: Node.js.
- **Build Command**: `npm install`.
- **Start Command**: `node server.js`.
- **CORS Configuration**: Ensure `FRONTEND_URL` env variable matches your Vercel domain.

---

## 🛠️ Troubleshooting
| Issue | Potential Cause | Solution |
| :--- | :--- | :--- |
| **White Screen** | Missing dependency or runtime error. | Check browser console (F12) for reference errors. |
| **CORS Error** | Backend doesn't recognize frontend. | Update `FRONTEND_URL` in backend `.env`. |
| **Database Timeout** | Aiven/AWS connection sleeping. | Ensure database pooling is configured in `db.js`. |
| **Email Not Sending** | Invalid App Password. | Generate a 16-character **App Password** from Google Security settings. |

---
*© 2026 Ethio-Brew — Dev-Ops Manual.*
