# ☕ Ethio-Brew — AI-Powered Ethiopian Coffee E-Commerce

![Banner](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/ethio_brew_banner_1778959805830.png)

**Ethio-Brew** is a high-fidelity, production-grade e-commerce ecosystem designed to bring the heritage of Ethiopian coffee into the digital age. Built with **React**, **Node.js**, **MySQL**, and **Google Gemini AI**.

---

## 🌍 Live Production Links
| Component | Status | URL |
| :--- | :--- | :--- |
| **Storefront (Vercel)** | 🟢 Online | [https://ethio-brew.vercel.app](https://ethio-brew.vercel.app) |
| **API Backend (Render)** | 🟢 Online | [https://ethio-brew-1.onrender.com](https://ethio-brew-1.onrender.com) |
| **Admin Panel** | 🔐 Restricted | [Login to Access](/login) |

---

## ✨ Features & Interface
| Feature | Description | Preview |
| :--- | :--- | :--- |
| **AI Sommelier** | Get brewing tips and coffee recommendations from our integrated Gemini AI expert. | ☕ |
| **Premium Shop** | Interactive catalog with regional filtering (Sidamo, Yirgacheffe, Harar). | ![Shop](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/ethio_brew_shop_preview_1778959882675.png) |
| **Stories & Blog** | Immerse yourself in the cultural history of coffee through our unified story portal. | 📖 |
| **Multilingual** | Full native support for English, Amharic (አማርኛ), and Afaan Oromo. | 🌍 |

---

## 🛠️ Infrastructure Requirements (Production)

To run this platform in production, the following **Environment Variables** are mandatory:

### 📡 Backend (Render/Heroku)
| Key | Required Value | Purpose |
| :--- | :--- | :--- |
| `DB_HOST` | Aiven/AWS MySQL Host | Database connectivity. |
| `EMAIL_USER` | your-email@gmail.com | System email for verification & resets. |
| `EMAIL_PASS` | 16-character App Password | **Google Security App Password** (Mandatory). |
| `FRONTEND_URL` | `https://ethio-brew.vercel.app` | CORS & Email link security. |
| `GEMINI_API_KEY` | Google AI Studio Key | Powers the Coffee AI Expert. |

### 🎨 Frontend (Vercel)
| Key | Required Value | Purpose |
| :--- | :--- | :--- |
| `VITE_API_URL` | `https://ethio-brew-1.onrender.com/api` | Direct connection to production API. |

---

## ⚠️ Important Security Notes
> [!IMPORTANT]
> **Email Verification**: This platform uses a "Double Opt-In" system. Users MUST verify their email address before they can log in. Ensure your SMTP settings are correctly configured in the backend environment.

> [!WARNING]
> **Browser Extensions**: Some "Site Blocker" or "AdBlock" extensions may interfere with the React lifecycle. If you experience a "CORS" error while the server is live, please test in **Incognito Mode**.

---

## 📂 Project Documentation
- [📖 Architecture Overview](./docs/architecture.md)
- [📡 API Reference](./docs/api-documentation.md)
- [🗄️ Database Schema](./docs/database-schema.md)
- [🛠️ Detailed Setup Guide](./docs/setup-guide.md)

---

## 👤 Lead Developer
**Gemachis Tesfaye**  
*Full Stack Developer & Coffee Enthusiast*

- 📞 **Phone**: +251 976 601 074
- 📧 **Email**: [gemachistesfaye36@gmail.com](mailto:gemachistesfaye36@gmail.com)
- 📍 **Telegram**: [@urjiiko1](https://t.me/urjiiko1)

---
*© 2026 Ethio-Brew — Preserving Heritage, Brewing Excellence.*
