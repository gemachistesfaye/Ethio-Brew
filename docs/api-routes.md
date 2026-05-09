# Ethio-Brew API Routes Documentation

All API routes are prefixed with `/api`.

## 🛍️ Products
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Get all coffee products | No |
| `GET` | `/products/:id` | Get single product details | No |
| `POST` | `/admin/products` | Add new coffee product | Yes (Admin) |
| `PUT` | `/admin/products/:id` | Update product details | Yes (Admin) |
| `DELETE` | `/admin/products/:id` | Delete a product | Yes (Admin) |

## 📦 Orders
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/orders` | Create a new order | Yes |
| `GET` | `/orders/my` | Get user order history | Yes |
| `GET` | `/admin/orders` | Get all platform orders | Yes (Admin) |
| `PUT` | `/admin/orders/:id/status` | Update order status | Yes (Admin) |

## 💳 Payments
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/payments/upload` | Upload proof of payment | Yes |
| `GET` | `/admin/payments` | Get pending verifications | Yes (Admin) |
| `PUT` | `/admin/payments/:id/verify` | Approve/Reject payment | Yes (Admin) |

## 👤 Users & Auth
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new account | No |
| `POST` | `/auth/login` | Authenticate user | No |
| `GET` | `/users/profile` | Get current user data | Yes |
| `GET` | `/admin/users` | List all registered users | Yes (Admin) |

## 📊 Analytics
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/analytics/revenue` | Get monthly revenue data | Yes (Admin) |
| `GET` | `/admin/analytics/top-products`| Get best selling coffee | Yes (Admin) |
