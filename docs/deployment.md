# Deployment Guide

This guide outlines the process of taking Ethio-Brew from a local development environment to a live, production-ready state.

## 1. Frontend Deployment (Vercel)

The React/Vite frontend is optimized for seamless deployment on Vercel.

1. **Build the Application**:
   Ensure your Vite configuration is set properly. The build command will bundle the React application into static files.
   ```bash
   npm run build
   ```
2. **Deploying**:
   - Push your code to a GitHub repository.
   - Go to [Vercel](https://vercel.com/) and create a new project from your repository.
   - Set the Root Directory to `frontend`.
   - Vercel will automatically detect Vite and run `npm run build`.

## 2. Backend Deployment (Render or Railway)

The Node.js/Express backend requires a Node runtime environment. Services like Render or Railway are ideal.

1. **Configuration**:
   - Create a new Web Service on your chosen platform.
   - Point it to your GitHub repository and set the Root Directory to `backend`.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
2. **Environment Variables**:
   You must replicate your local `.env` file in the hosting provider's dashboard:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (Must point to your production database)
   - `JWT_SECRET` (Use a strong, random 64-character string)
   - `EMAIL_USER`, `EMAIL_PASS` (For verification emails)
   - `CORS_ORIGIN` (Update to your Vercel frontend URL so the backend accepts requests)

## 3. Database Hosting

A managed SQL database is required for production.
- **Providers**: PlanetScale, AWS RDS, DigitalOcean Managed Databases, or Railway.
- **Migration**: Export your local `ethiobrew` schema using `mysqldump` or phpMyAdmin, and import it into your cloud database.
- **Connection**: Update your backend's `DB_HOST`, `DB_USER`, and `DB_PASSWORD` variables to point to the cloud database URL.

## 4. Production Checklist
- [ ] Ensure all API calls in `frontend/src/services` use the production backend URL (not `localhost`).
- [ ] Verify CORS in `backend/server.js` strictly allows the Vercel domain.
- [ ] Ensure `NODE_ENV=production` is set on the backend so cookies require HTTPS.
- [ ] Test the full authentication flow (Register -> Email -> Login) on the live URLs.
