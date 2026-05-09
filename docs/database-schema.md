# Ethio-Brew Database Schema Documentation

## 📦 Tables

### 1. `users`
Stores all account data for both customers and admins.
- `id`: Primary Key (Auto-increment)
- `role`: `customer` or `admin`.

### 2. `products`
The core coffee catalog. Supports 3 languages at the column level.
- `name_en`, `name_am`, `name_om`
- `description_en`, `description_am`, `description_om`
- `origin`: Geographic source (Yirgacheffe, Sidamo, etc.)

### 3. `orders`
Tracks the lifecycle of a purchase.
- `status`: `pending`, `verified`, `processing`, `delivered`.
- `total_price`: Final amount in ETB.

### 4. `payments`
Stores proof of transaction for manual payment methods.
- `proof_image`: URL/Path to the uploaded screenshot.
- `status`: `pending`, `approved`, `rejected`.

### 5. `loyalty_points`
User reward balance.
- `points`: Calculated as 10% of total spend.

---

## 🔗 Relationships
- **One User** has **Many Orders**.
- **One Order** has **One Payment**.
- **One Order** has **Many Order Items**.
- **One User** has **One Loyalty Point** record.
