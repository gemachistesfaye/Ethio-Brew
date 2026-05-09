# Ethio-Brew Deployment Guide

This guide outlines the steps to deploy the Ethio-Brew platform to a production environment.

## 🛠️ Prerequisites
- A Linux server (Ubuntu 22.04+ recommended).
- Node.js (v18+) and NPM.
- MySQL or MariaDB instance.
- Nginx for reverse proxy.

## 📦 Step 1: Database Setup
1. Log in to your MySQL server.
2. Create the database: `CREATE DATABASE ethiobrew;`
3. Import the schema: `mysql -u root -p ethiobrew < db/schema.sql`

## ⚙️ Step 2: Backend Deployment
1. Navigate to `/backend`.
2. Create a `.env` file with production credentials:
   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=ethiobrew
   JWT_SECRET=your_long_random_secret
   ```
3. Install dependencies: `npm install --production`
4. Use a process manager like **PM2** to keep the server running:
   `pm2 start server.js --name "ethiobrew-api"`

## 🎨 Step 3: Frontend Deployment
1. Navigate to `/frontend`.
2. Update the API base URL in your services to point to your production IP/Domain.
3. Build the production bundle: `npm run build`
4. This creates a `/dist` folder.

## 🌐 Step 4: Nginx Configuration
Configure Nginx to serve the frontend files and proxy API requests.
```nginx
server {
    listen 80;
    server_name ethiobrew.com;

    root /path/to/ethiobrew/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔐 Step 5: SSL (Optional but Recommended)
Use **Certbot** to enable HTTPS:
`sudo certbot --nginx -d ethiobrew.com`
