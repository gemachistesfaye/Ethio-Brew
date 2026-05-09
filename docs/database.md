# Database Schema

Ethio-Brew uses a relational MySQL database designed for an e-commerce platform. The schema is highly normalized to ensure data integrity.

## Entity Relationship (ER) Diagram

```text
+------------------+          +-------------------+
|      USERS       |          |     ORDERS        |
+------------------+          +-------------------+
| PK id            | 1      * | PK id             |
|    name          |----------| FK user_id        |
|    email         |          |    total_price    |
|    password      |          |    status         |
|    phone         |          |    created_at     |
|    address       |          +-------------------+
|    is_verified   |                    | 1
|    role          |                    |
+------------------+                    | *
                               +-------------------+
+------------------+           |   ORDER_ITEMS     |
|    PRODUCTS      |           +-------------------+
+------------------+ 1       * | PK id             |
| PK id            |-----------| FK order_id       |
|    name          |           | FK product_id     |
|    description   |           |    quantity       |
|    price         |           |    price_at_time  |
|    stock         |           +-------------------+
+------------------+
```

## Tables & Columns

### 1. `users` Table
Stores all user account information, authentication details, and roles.

| Column        | Type         | Attributes                     | Description                          |
|---------------|--------------|--------------------------------|--------------------------------------|
| `id`          | INT          | PRIMARY KEY, AUTO_INCREMENT    | Unique identifier                    |
| `name`        | VARCHAR(100) | NOT NULL                       | Full name of the user                |
| `email`       | VARCHAR(100) | UNIQUE, NOT NULL               | Used for login and contact           |
| `password`    | VARCHAR(255) | NOT NULL                       | Bcrypt hashed password               |
| `phone`       | VARCHAR(20)  |                                | Contact number                       |
| `address`     | TEXT         |                                | Delivery address                     |
| `is_verified` | BOOLEAN      | DEFAULT FALSE                  | Email verification status            |
| `role`        | ENUM         | DEFAULT 'user'                 | Defines permissions ('user', 'admin')|

### 2. `products` Table
Holds the catalog of Ethiopian coffee available on the marketplace.

| Column        | Type         | Attributes                     | Description                          |
|---------------|--------------|--------------------------------|--------------------------------------|
| `id`          | INT          | PRIMARY KEY, AUTO_INCREMENT    | Unique identifier                    |
| `name`        | VARCHAR(100) | NOT NULL                       | Name of the coffee (e.g., Yirgacheffe)|
| `description` | TEXT         |                                | Flavor profile and origin details    |
| `price`       | DECIMAL(10,2)| NOT NULL                       | Cost in ETB                          |
| `stock`       | INT          | DEFAULT 0                      | Inventory tracking                   |

### 3. `orders` Table
Tracks user purchases and their fulfillment status.

| Column        | Type         | Attributes                     | Description                          |
|---------------|--------------|--------------------------------|--------------------------------------|
| `id`          | INT          | PRIMARY KEY, AUTO_INCREMENT    | Unique identifier                    |
| `user_id`     | INT          | FOREIGN KEY (users.id)         | The customer who placed the order    |
| `total_price` | DECIMAL(10,2)| NOT NULL                       | Grand total of the purchase          |
| `status`      | ENUM         | DEFAULT 'pending'              | pending, processing, shipped, etc.   |
| `created_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP      | Time of purchase                     |

## SQL Schema Generation
To generate this schema, run the script provided in `db/schema.sql` against your MySQL instance.
