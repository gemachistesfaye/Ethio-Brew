# Ethio-Brew Setup & Installation Guide

This guide provides step-by-step instructions for installing and running the Ethio-Brew platform locally.

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MySQL** (Native or via XAMPP)
- **Git**

## 1. Clone the Repository

Clone the project to your local machine:
```bash
git clone https://github.com/gemachistesfaye/Ethio-Brew.git
cd Ethio-Brew
```

## 2. Database Setup

1. Start your MySQL server.
2. Open your preferred database management tool (e.g., phpMyAdmin, MySQL Workbench).
3. Create a new database named `ethiobrew`.
4. Import the SQL schema located at `db/schema.sql` to generate all required tables:
   ```sql
   source db/schema.sql;
   ```

## 3. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend` folder and add the following environment variables:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ethiobrew
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   GEMINI_API_KEY=optional_ai_key
   ```
4. Start the backend development server:
   ```bash
   npm start
   # The server will run on http://localhost:5000
   ```

## 4. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies (use `--legacy-peer-deps` if conflicts arise with specific React versions):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   # The application will be available at http://localhost:3000
   ```

## 5. Usage

1. Open your browser and navigate to the frontend URL.
2. Register a new user account.
3. Check your email for the verification link (or use the simulated verification page).
4. Log in to access the platform's protected features.
