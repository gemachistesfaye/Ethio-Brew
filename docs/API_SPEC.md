# 📡 API Specification & Endpoints

The Ethio-Brew backend provides a fully RESTful API. All endpoints are prefixed with `/api`.

## 🌐 Base Environment
| Environment | URL |
| :--- | :--- |
| **Local Development** | `http://localhost:5000/api` |
| **Production API** | `https://ethio-brew-1.onrender.com/api` |

---

## 🔑 Authentication & Profile
| Method | Route | Description | Auth |
| :--- | :--- | :--- | :---: |
| POST | `/auth/register` | Create a new account & send OTP. | No |
| POST | `/auth/login` | Authenticate & issue JWT cookie. | No |
| POST | `/auth/verify` | Verify email with OTP. | No |
| POST | `/auth/logout` | Clear session cookies. | Yes |
| GET | `/auth/profile` | Retrieve user account details. | Yes |
| PUT | `/auth/profile` | Update user account details. | Yes |

---

## 🤖 AI & Intelligence
| Method | Route | Description | Auth |
| :--- | :--- | :--- | :---: |
| POST | `/ai` | Send query to Gemini Coffee Sommelier. | No |

---

## 🛒 Shop & Orders
| Method | Route | Description | Auth |
| :--- | :--- | :--- | :---: |
| GET | `/products` | List all coffee products. | No |
| GET | `/orders/my` | View user order history. | Yes |
| POST | `/orders` | Create a new pending order. | Yes |
| POST | `/orders/verify` | Upload payment proof (screenshot). | Yes |

---

## 🔐 Administrative Controls
| Method | Route | Description | Role |
| :--- | :--- | :--- | :---: |
| GET | `/admin/stats` | Business intelligence & sales metrics. | Admin |
| GET | `/admin/orders` | View all system orders for verification. | Admin |
| PUT | `/admin/orders/:id` | Update order status (Approve/Ship). | Admin |

---

## 🛡️ Standard Error Codes
- **200/201**: Success / Resource Created.
- **401**: Unauthorized (Missing JWT).
- **403**: Forbidden (Unverified account or lack of Admin role).
- **429**: Rate limit exceeded (Anti-brute force).
- **500**: Internal server error.

---
*© 2026 Ethio-Brew — API Documentation.*
