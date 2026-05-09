# System Architecture

Ethio-Brew is built on a modern, decoupled client-server architecture, ensuring scalability, maintainability, and a seamless developer experience.

## High-Level Architecture Diagram

```text
+-------------------+       HTTP / REST       +-------------------+
|                   |  (JSON, Credentials)    |                   |
|  React Frontend   | <=====================> | Express Backend   |
|  (Vite + Tailwind)|                         | (Node.js API)     |
|                   |                         |                   |
+-------------------+                         +-------------------+
                                                       ^
                                                       |
                                                  MySQL Driver
                                                       |
                                                       v
                                              +-------------------+
                                              |                   |
                                              |  MySQL Database   |
                                              |  (Relational)     |
                                              |                   |
                                              +-------------------+
```

## Frontend Architecture

The frontend is a Single Page Application (SPA) built with **React** and bundled using **Vite** for optimized performance.
- **Styling**: Tailwind CSS is used for rapid, utility-first UI development.
- **State Management**: React Context API is used globally (e.g., `AuthContext`) to manage user sessions and authentication states. Local state is managed via `useState`.
- **Routing**: `react-router-dom` handles client-side routing, ensuring fast transitions without page reloads. Protected routes ensure unauthorized users cannot access checkout or settings.
- **Internationalization**: `react-i18next` handles multi-language support (English, Amharic, Afaan Oromoo).

## Backend Architecture

The backend is a RESTful API built with **Node.js** and **Express.js**.
- **Design Pattern**: Strictly follows the **MVC (Model-View-Controller)** paradigm.
  - *Models*: Handle database queries and data logic (e.g., `User.js`).
  - *Controllers*: Process incoming requests, apply business logic, and send responses.
  - *Routes*: Map HTTP endpoints to specific controller methods.
- **Security**: 
  - Passwords are cryptographically hashed using `bcryptjs`.
  - Authentication relies on JSON Web Tokens (JWT) stored securely in **HTTP-only cookies** to prevent XSS attacks.
  - CORS is strictly configured to only accept requests from the frontend origin.

## Database Layer

The application uses **MySQL**, a relational database management system.
- Structured with tables for Users, Products, and Orders.
- Uses `mysql2/promise` for asynchronous, non-blocking queries using standard SQL.

## Folder Structure

```text
Ethio-Brew/
├── backend/
│   ├── config/       # Database connection setup
│   ├── controllers/  # Core business logic
│   ├── middleware/   # JWT verification & error handling
│   ├── models/       # Database interaction layer
│   ├── routes/       # Express API route definitions
│   └── server.js     # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI pieces
│   │   ├── context/    # Global state (Auth)
│   │   ├── locales/    # i18n translation files
│   │   ├── pages/      # Full views (Home, Blog, Login)
│   │   ├── services/   # Axios API calls
│   │   ├── App.jsx     # Main router setup
│   │   └── main.jsx    # React DOM rendering
│   └── tailwind.config.js
│
└── db/
    └── schema.sql    # Database schema
```
