# 🛠️ Ethio-Brew Setup Guide

Follow these steps to deploy and run Ethio-Brew on your local machine or server.

## 📋 Prerequisites
- **Node.js** (v16+)
- **MySQL** (v8.0+)
- **NPM** or **Yarn**

## 🚀 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/gemachistesfaye/Ethio-Brew.git
cd Ethio-Brew
```

### 2. Database Setup
1. Open your MySQL client.
2. Run the schema script: `db/schema.sql`.
3. (Optional) Run the seed script: `db/seed_data.sql`.

### 3. Backend Configuration
1. Navigate to the backend: `cd backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=ethio_brew
   JWT_SECRET=your_secret_key
   GEMINI_API_KEY=your_gemini_key
   ```
4. Start the server: `node server.js`.

### 4. Frontend Configuration
1. Navigate to the frontend: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.

## 🧪 Testing the Admin
Once both servers are running:
1. Go to `http://localhost:5173/login`.
2. Use credentials: `admin@ethiobrew.com` / `admin123`.

---
*Created by Gemachis Tesfaye (Software Developer)*
