# 🗄️ Database Schema & Models

Ethio-Brew uses a relational MySQL database designed for high performance and data integrity. The schema is optimized for e-commerce transactions and cultural content management.

## 📐 Entity Relationship (ER) Diagram
```text
+------------------+          +-------------------+
|      USERS       |          |     ORDERS        |
+------------------+          +-------------------+
| PK id            | 1      * | PK id             |
|    name          |----------| FK user_id        |
|    email         |          |    total_price    |
|    password      |          |    status         |
|    created_at     |          |    created_at     |
+------------------+          +-------------------+
                                        | 1
                                        |
                                        | *
+------------------+          +-------------------+
|    PRODUCTS      |          |   ORDER_ITEMS     |
+------------------+ 1      * +-------------------+
| PK id            |----------| PK id             |
|    name          |          | FK order_id       |
|    price         |          | FK product_id     |
|    stock         |          |    quantity       |
+------------------+          +-------------------+
```

---

## 📋 Core Tables

### 1. `users` (Identity Management)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key. |
| `email` | VARCHAR | Unique identifier for login. |
| `password` | VARCHAR | Bcrypt hashed (255 chars). |
| `role` | ENUM | 'user' or 'admin'. |
| `is_verified`| BOOLEAN | Email verification gate. |

### 2. `products` (Coffee Inventory)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key. |
| `name` | VARCHAR | Localized name (AM/OM support). |
| `price` | DECIMAL | Stored in ETB. |
| `stock` | INT | Real-time inventory count. |

### 3. `orders` (Transaction Ledger)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary Key. |
| `user_id` | INT | Reference to buyer. |
| `total` | DECIMAL | Grand total including delivery. |
| `status` | ENUM | Pending, Processing, Delivered. |
| `proof_url` | TEXT | Link to payment verification screenshot. |

---

## 🛠️ Database Setup
The database logic is handled via connection pooling in `backend/config/db.js`.
To initialize the schema:
1. Access your MySQL instance (Local or Remote).
2. Execute `db/schema.sql`.
3. (Optional) Run `db/seeds.sql` to populate initial coffee varieties.

---
*© 2026 Ethio-Brew — Database Architecture.*
