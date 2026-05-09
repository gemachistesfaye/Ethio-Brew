# Ethio-Brew Setup & Installation Guide

This guide explains how to install and run the Ethio-Brew platform locally.

## Prerequisites

- Node.js (v18+)
- MySQL (via XAMPP or native)
- Git

## 1. Database Setup

1. Start your MySQL server (e.g., open XAMPP Control Panel and start MySQL).
2. Open your preferred database tool (phpMyAdmin, MySQL Workbench, etc.).
3. Create a database named `ethiobrew`.
4. Run the SQL script found in `db/schema.sql` to create all required tables.

## 2. Backend Setup

1. Open a terminal and navigate to the `backend` directory.
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ethiobrew
   PORT=5000
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm start
   # or node server.js
   ```

## 3. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install dependencies (use legacy-peer-deps to avoid chart.js conflicts):
   ```bash
   npm install --legacy-peer-deps
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 4. Usage

1. Open your browser and go to `http://localhost:5173`.
2. Register a new user account.
3. Complete the simulated verification.
4. Log in to access protected features (Checkout, Settings).

*Note: For admin access, you will need to manually change a user's role to 'admin' directly in the MySQL database.*
