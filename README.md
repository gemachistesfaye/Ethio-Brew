# ☕ Ethio-Brew — AI-Powered Ethiopian Coffee Platform

![Banner](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/ethio_brew_banner_1778959805830.png)

**Ethio-Brew** is a high-fidelity, production-grade e-commerce ecosystem designed to bring the heritage of Ethiopian coffee into the digital age. Built with **React**, **Node.js**, **MySQL**, and **Google Gemini AI**.

---

## 🌐 Live Production Links
| Component | Status | URL |
| :--- | :--- | :--- |
| **Storefront (Vercel)** | 🟢 Online | [https://ethio-brew.vercel.app](https://ethio-brew.vercel.app) |
| **API Backend (Render)** | 🟢 Online | [https://ethio-brew-1.onrender.com](https://ethio-brew-1.onrender.com) |
| **Admin Panel** | 🔐 Restricted | [Login to Access](/login) |

---

## ✨ Product Features & Interface
| Page | Detailed Description | Actual Screenshot |
| :--- | :--- | :--- |
| **Home Page** | Cinematic landing experience with immersive background imagery, cultural storytelling, and call-to-actions for the coffee club and shop. | ![Home](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/home_page_viewport_1778960274219.png) |
| **Coffee Shop** | Dynamic catalog featuring regional varieties (Jimma, Sidama, Yirgacheffe). Includes real-time filtering by roast level and category. | ![Shop](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/shop_page_products_1778960319913.png) |
| **Checkout Flow** | Secure, streamlined order process with cart persistence, automatic total calculation, and regional phone/address validation. | ![Checkout](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/checkout_page_summary_1778960358091.png) |
| **Stories & Blog** | A unified content portal for legends of Kaldi, brewing guides (Jebena Buna), and sustainable sourcing stories from Oromia and beyond. | ![Blog](file:///C:/Users/HP/.gemini/antigravity/brain/f615579d-ea59-44ad-91ca-c8d84cbe4665/blog_page_stories_1778960377361.png) |

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
