# 🚀 Ethio-Brew — Enterprise Project Architecture

This document outlines the architectural design and structural organization of the Ethio-Brew platform.

## 🏗️ System Overview
Ethio-Brew is built using a **Modular Client-Server Architecture** designed for scalability, security, and high-fidelity user experiences.

### 1. Frontend (The Experience)
- **Framework**: React.js
- **Styling**: Tailwind CSS + Framer Motion (for premium animations)
- **State Management**: React Context API (Auth & Cart)
- **Internationalization**: Custom `useTranslation` hook (Supporting EN, AM, OM)
- **Structure**:
  - `/src/components`: Atomic UI components (Buttons, Modals, Cards)
  - `/src/pages`: Main view layouts (Home, Shop, Admin)
  - `/src/hooks`: Custom logic (Translation, API interactions)

### 2. Backend (The Engine)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Relational)
- **Security**: 
  - JWT (JSON Web Tokens) for session management
  - Bcrypt.js for enterprise-grade password hashing
  - Helmet & CORS for header security
  - Rate Limiting to prevent brute-force attacks
- **Structure**:
  - `/controllers`: Business logic (Auth, Products, Orders)
  - `/routes`: Endpoint definitions and Middleware gating
  - `/middleware`: Auth verification and Role-based access control
  - `/config`: Database pooling and Environment management

### 3. AI Integration
- **Engine**: Google Gemini AI
- **Features**: 
  - Multilingual sentiment analysis
  - Context-aware coffee recommendations
  - Automated business intelligence for Admins

## 📦 Folder Structure
```text
Ethio-Brew/
├── backend/            # Express.js Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Logic
│   ├── middleware/     # Auth Guards
│   ├── models/         # DB Queries
│   └── routes/         # API Paths
├── frontend/           # React App
│   ├── src/
│   │   ├── admin/      # Admin Suite
│   │   ├── components/ # UI Elements
│   │   ├── pages/      # Views
│   │   └── hooks/      # Logic
├── db/                 # SQL Scripts
└── docs/               # Professional Docs
```

---
*Created by Gemachis Tesfaye (Software Developer)*
