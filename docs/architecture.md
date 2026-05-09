# Ethio-Brew System Architecture

## 🚀 Overview
Ethio-Brew is a production-level e-commerce platform dedicated to the Ethiopian coffee marketplace. It leverages a modern full-stack architecture to provide a seamless experience for customers and a robust management system for admins.

## 🏗️ Technology Stack
- **Frontend**: React.js (Vanilla JavaScript), styled with Tailwind CSS for high-performance, responsive UI.
- **Backend**: Node.js with Express framework for a scalable REST API.
- **Database**: SQL (MySQL/MariaDB) for structured data management, ensuring data integrity and fast queries.
- **State Management**: React Context API for lightweight, efficient state handling.
- **Internationalization**: i18next for multi-language support (English, Amharic, Afaan Oromoo).

## 🧩 Core Systems

### 1. Product Marketplace
- Dynamic product catalog with regional filtering (Yirgacheffe, Sidamo, etc.).
- Multilingual descriptions stored at the database level.

### 2. Order & Payment Lifecycle
- **Flow**: User → Checkout → Payment Upload → Admin Verification → Processing → Delivery.
- **Verification**: Unique "Proof-of-Payment" system allowing manual bank/Telebirr transfers to be verified by administrators.

### 3. Admin Dashboard
- Centralized management hub for CRUD operations on products.
- Real-time order tracking and payment approval panel.
- Analytics engine for revenue and growth monitoring.

### 4. Loyalty Program (EthioPoints)
- Automated point calculation based on purchase volume (10 points per 100 ETB).
- Points are persisted in the database and linked to the user account.

## 🔒 Security
- Password hashing using bcrypt.
- JWT-based authentication for secure session management.
- Role-based access control (Admin vs. Customer).
