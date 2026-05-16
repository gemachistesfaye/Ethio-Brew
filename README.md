# ☕ Ethio-Brew — AI-Powered Ethiopian Coffee Platform

![Banner](./assets/banner.png)

**Ethio-Brew** is a high-fidelity, production-grade e-commerce ecosystem designed to bring the heritage of Ethiopian coffee into the digital age. Built with **React**, **Node.js**, **MySQL**, and **Google Gemini AI**.

---

## 🌐 Live Production Links
| Component | Status | URL |
| :--- | :--- | :--- |
| **Storefront (Vercel)** | 🟢 Online | [https://ethio-brew.vercel.app](https://ethio-brew.vercel.app) |
| **API Backend (Render)** | 🟢 Healthy | [https://ethio-brew-1.onrender.com](https://ethio-brew-1.onrender.com) |
| **Admin Panel** | 🔐 Restricted | [Login to Access](https://ethio-brew.vercel.app/login) |

---

## ✨ Enterprise Product Gallery

| **Home Page** | **Coffee Shop** | **Product Discovery** |
| :---: | :---: | :---: |
| ![Home](./assets/home.png) | ![Shop](./assets/shop.png) | ![Details](./assets/shop_details.png) |
| *Cinematic landing experience* | *Dynamic coffee catalog* | *Regional varieties & cards* |

| **Stories & Blog** | **Checkout Flow** | **Contact Center** |
| :---: | :---: | :---: |
| ![Blog](./assets/stories.png) | ![Checkout](./assets/checkout.png) | ![Contact](./assets/contact.png) |
| *Cultural heritage portal* | *Secure order process* | *Customer support portal* |

| **Admin Command** | **Live Tracking** | **Mobile Experience** |
| :---: | :---: | :---: |
| ![Admin](./assets/admin.png) | ![Track](./assets/track.png) | ![Mobile](./assets/mobile.png) |
| *Business intelligence center* | *Real-time order tracker* | *Fully responsive design* |

---

## 🛠️ Infrastructure Requirements

### 📡 Backend Configuration (Render)
| Variable | Value Requirement | Purpose |
| :--- | :--- | :--- |
| `DB_HOST` | Aiven/AWS MySQL Host | Database connectivity. |
| `EMAIL_USER` | System Email Address | For sending verification/reset emails. |
| `EMAIL_PASS` | 16-char App Password | **Google Security App Password** (Mandatory). |
| `FRONTEND_URL` | `https://ethio-brew.vercel.app` | Security & CORS validation. |

### 🎨 Frontend Configuration (Vercel)
| Variable | Value Requirement | Purpose |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://ethio-brew-1.onrender.com/api` | Live connection to Production API. |

---

## ⚠️ Deployment & Security Notes
> [!IMPORTANT]
> **Email Verification**: This platform requires real email verification for all new accounts. Ensure your SMTP settings are correctly configured in the backend environment.

> [!WARNING]
> **Browser Extensions**: Some "Site Blocker" or "AdBlock" browser extensions can interfere with React network requests. If the site hangs during checkout or registration, please test in **Incognito Mode**.

---

## 👤 Developer Profile
**Gemachis Tesfaye**  
*Full Stack Software Engineer*

- 📞 **Phone**: +251 976 601 074
- 📧 **Email**: [gemachistesfaye36@gmail.com](mailto:gemachistesfaye36@gmail.com)
- 📍 **Telegram**: [@urjiiko1](https://t.me/urjiiko1)

---
*© 2026 Ethio-Brew — Preserving Heritage, Brewing Excellence.*
