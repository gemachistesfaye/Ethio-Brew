# 🚀 How to Run Ethio-Brew

Follow these steps to get the full-stack system running on your local machine.

## 📋 1. Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (via XAMPP, WAMP, or standalone)
- **Git**

## 🗄️ 2. Database Setup
1. Open your MySQL management tool (e.g., phpMyAdmin).
2. Create a new database named `ethiobrew`.
3. Import the schema file located at `db/schema.sql`.
   - Alternatively, run this command in your terminal:
     `mysql -u root -p ethiobrew < db/schema.sql`

## ⚙️ 3. Environment Configuration
1. Navigate to the `backend/` folder.
2. Ensure the `.env` file has your correct database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ethiobrew
   JWT_SECRET=ethio_brew_secret_key_2026
   ```

## 📦 4. Installation
You can install dependencies for both frontend and backend at once from the root folder:
```bash
npm run install:all
```

## 🚀 5. Running the Application

### Option A: The "One-Command" Way (Recommended)
This will start both the React frontend and the Node.js backend simultaneously.
```bash
npm start
```

### Option B: Separate Terminals (For Debugging)
- **Terminal 1 (Backend):**
  ```bash
  cd backend
  node server.js
  ```
- **Terminal 2 (Frontend):**
  ```bash
  cd frontend
  npm run dev
  ```

## 🌐 6. Accessing the System
- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

### 🔑 Admin Login (Default for testing)
*The system currently uses mock data for the dashboard demo. To enable real database auth, use the routes documented in `/docs/api-routes.md`.*
