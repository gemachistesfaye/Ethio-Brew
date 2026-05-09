# ☕ Ethio-Brew: Premium Ethiopian Coffee Platform

Ethio-Brew is a professional-grade, full-stack e-commerce and SaaS platform designed for the Ethiopian coffee market. It features a stunning React frontend, a modular Node.js backend, and a production-ready SQL database.

---

## 📁 Project Structure

```text
Ethio-Brew/
├── frontend/          → React (Vanilla JavaScript, Vite, Tailwind CSS)
├── backend/           → Node.js + Express API (MVC Pattern)
├── db/                → SQL database migrations & schema
├── docs/              → Technical documentation & API guides
└── README.md          → System overview & run guide
```

---

## 🚀 Getting Started

### 1. Database Setup
1. Create a MySQL database named `ethiobrew`.
2. Import the schema from `db/schema.sql`.
   ```bash
   mysql -u root -p ethiobrew < db/schema.sql
   ```

### 2. Backend Setup
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Start the API: `node server.js`.

### 3. Frontend Setup
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Access at: **http://localhost:3000**

---

## 🎨 Key Features
- **Multilingual Support**: Real-time switching between English, Amharic, and Afaan Oromoo.
- **Admin Dashboard**: Advanced analytics, order tracking, and inventory management.
- **Payment Verification**: Manual transfer proof (Telebirr/CBE) audit system.
- **AI Integration**: Smart coffee recommendations and support assistant.

---

## 🛠️ Technology Stack
- **Frontend**: React, Tailwind CSS, Lucide Icons, Chart.js.
- **Backend**: Node.js, Express, MySQL, JWT, Bcrypt.
- **Database**: MySQL / MariaDB.

---

## Documentation

Detailed project documentation is available inside the `/docs` folder.
