# Ethio-Brew Production-Grade Architecture

## 🚀 Overview
Ethio-Brew follows a modular, industry-standard full-stack architecture designed for scalability, maintainability, and production readiness. The system is split into a clean **Frontend** (React) and **Backend** (Node.js/Express) with a robust **Database** (SQL) layer.

## 📁 Project Structure

```text
Ethio-Brew/
├── frontend/          → React (Vanilla JavaScript, Vite)
│   ├── src/
│   │   ├── components/  → Reusable UI units (Modal, Layout, etc.)
│   │   ├── pages/       → Full page views (Home, Menu, Admin panels)
│   │   ├── context/     → State management (Context API)
│   │   ├── hooks/       → Custom React hooks
│   │   ├── utils/       → Helper functions
│   │   ├── locales/     → i18n JSON files (en, am, om)
│   │   ├── services/    → API abstraction layer (Axios)
│   │   └── App.js       → Main router
│   ├── public/        → Static assets
│   └── index.html     → Entry point
│
├── backend/           → Node.js + Express API
│   ├── routes/        → API endpoint definitions
│   ├── controllers/   → Request handling logic
│   ├── models/        → Database abstraction (MVC pattern)
│   ├── middleware/    → Auth & validation layers
│   ├── config/        → DB & system configuration
│   └── server.js      → API entry point
│
├── db/                → SQL database migrations & seeds
├── docs/              → Technical documentation
├── package.json       → Root scripts & dependencies
└── .env               → Environment variables
```

## 🏗️ Design Patterns
- **MVC (Model-View-Controller)**: The backend is strictly separated into Models (Data), Controllers (Logic), and Routes (Delivery).
- **Component-Based UI**: The frontend uses atomic design principles, breaking the UI into reusable components.
- **RESTful API**: Stateless communication between frontend and backend.
- **i18n Localization**: JSON-based translation system supporting English, Amharic, and Afaan Oromoo.

## 🔄 Data Flow
1. **Frontend**: A user interacts with a React component (e.g., "Add to Cart").
2. **Service**: The frontend calls a service function (in `services/`) which makes an Axios request to the Backend.
3. **Route**: The backend route receives the request and passes it to the appropriate Controller.
4. **Controller**: The controller performs business logic and calls a Model function.
5. **Model**: The model executes a SQL query via the connection pool in `config/db.js`.
6. **Response**: Data flows back up through the controller and route as JSON to the frontend.

## 🔒 Best Practices
- **Environment Separation**: Secrets are stored in `.env`.
- **Database Pooling**: Efficient connection management for high traffic.
- **Modular Routing**: Keeps `server.js` clean and readable.
- **Role-Based Access**: Internal checks for Admin vs. Customer permissions.
