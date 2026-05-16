# 🚀 System Architecture & Flow

This document outlines the architectural design and structural organization of the Ethio-Brew platform.

## 🏗️ Technical Stack
Ethio-Brew is built using a **Modular Client-Server Architecture** designed for scalability and high-fidelity user experiences.

### 1. Frontend (The Experience)
- **Framework**: React.js 19
- **Styling**: Tailwind CSS + Framer Motion (for premium animations)
- **State Management**: React Context API (Auth & Cart)
- **Internationalization**: Custom `useTranslation` hook (Supporting EN, AM, OM)

### 2. Backend (The Engine)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (Aiven / AWS)
- **Security**: JWT for sessions, Bcrypt for passwords, Helmet for headers.

### 3. AI Integration
- **Engine**: Google Gemini AI
- **Features**: Multi-lingual chat, Coffee recommendations, Cultural wisdom.

---

## 📦 Folder Structure
```text
Ethio-Brew/
├── backend/            # Express.js Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Business Logic
│   ├── middleware/     # Auth Guards
│   ├── routes/         # API Paths
├── frontend/           # React App
│   ├── src/
│   │   ├── admin/      # Admin Suite
│   │   ├── components/ # UI Elements
│   │   ├── pages/      # Main Views
│   │   └── locales/    # JSON Translations
└── db/                 # SQL Schema & Seeds
```

---

## 🔄 System Flow

### 🛒 Customer Journey
1. **Browse**: Explore coffee catalog filtered by origin/roast.
2. **AI Assistance**: Get personalized recommendations from the Sommelier.
3. **Checkout**: Provide delivery info and select payment method (Telebirr/CBE).
4. **Verification**: Upload payment screenshot for Admin review.
5. **Loyalty**: Earn `EthioPoints` automatically upon order completion.

### 🔐 Admin Workflow
1. **Intelligence**: View total sales and inventory metrics via Dashboard.
2. **Verification**: Review payment screenshots against actual bank statements.
3. **Fulfillment**: Manage order states (Pending → Processing → Delivered).
4. **Content**: Post new Stories and Blog articles to the Cultural Portal.

---
*© 2026 Ethio-Brew — Architecture Blueprint.*
