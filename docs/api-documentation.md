# 📡 Ethio-Brew API Documentation

This document lists the available API endpoints for the Ethio-Brew platform.

## 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new customer | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |
| GET | `/api/auth/me` | Get current user profile | JWT |

## ☕ Products
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/products` | List all coffee products | No |
| GET | `/api/products/:id` | Get details of one product | No |
| POST | `/api/products` | Add new coffee (Admin only) | JWT + Admin |
| PUT | `/api/products/:id` | Update product (Admin only) | JWT + Admin |
| DELETE | `/api/products/:id` | Delete product (Admin only) | JWT + Admin |

## 📊 Admin Command Center
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/admin/analytics` | Get business intelligence data | JWT + Admin |
| GET | `/api/admin/users` | List all registered users | JWT + Admin |
| PUT | `/api/admin/users/role` | Update user role (e.g. Promote) | JWT + Admin |
| PUT | `/api/admin/orders/status` | Update order status (Roasting) | JWT + Admin |
| POST | `/api/admin/orders/verify` | Approve/Reject payment receipt | JWT + Admin |

## 🤖 AI Assistant
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/ai` | Interact with Gemini Coffee AI | No |

---
*Base URL: `http://localhost:5000`*
