# 🗄️ Ethio-Brew Database Schema

The platform uses a **MySQL Relational Database** with the following core entities.

## 👥 Users & Roles
- **`users`**: Master user table.
  - `id`, `full_name`, `email`, `password`, `phone`, `is_verified`, `created_at`
- **`roles`**: Available system roles.
  - `id`, `name` (admin, customer, delivery_staff), `description`
- **`user_roles`**: Junction table for Many-to-Many relationship.
  - `user_id`, `role_id`

## ☕ Products
- **`products`**: Coffee inventory.
  - `id`, `name_en`, `name_am`, `name_or`, `description_en`, `price`, `stock`, `region`, `roast_level`, `image_url`

## 📦 Orders & Payments
- **`orders`**: Customer purchases.
  - `id`, `user_id`, `total_amount`, `status` (Pending, Roasting, Shipped, Delivered), `shipping_address`, `created_at`
- **`order_items`**: Line items per order.
  - `id`, `order_id`, `product_id`, `quantity`, `price`
- **`payments`**: Financial transaction tracking.
  - `id`, `order_id`, `method` (Telebirr, CBE, Cash), `status` (pending, completed), `receipt_url`

## 🤖 AI & Engagement
- **`subscriptions`**: Recurring coffee deliveries.
  - `id`, `user_id`, `frequency`, `status`
- **`reviews`**: Customer sentiment data.
  - `id`, `user_id`, `product_id`, `rating`, `comment_en`, `sentiment_score`

---
*Created by Gemachis Tesfaye (Software Developer)*
