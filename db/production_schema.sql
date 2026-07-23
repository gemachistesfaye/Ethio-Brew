-- Ethio-Brew Production Schema (v3.1 - Postgres, idempotent)
-- Safe to run multiple times. Uses IF NOT EXISTS everywhere.

-- 1. ROLES SYSTEM
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES
('customer', 'Regular store customer'),
('admin', 'Super administrator with full access'),
('coffee_manager', 'Manages products, roasting and inventory'),
('delivery_staff', 'Handles order fulfillment and shipping')
ON CONFLICT (name) DO NOTHING;

-- 2. USERS SYSTEM
CREATE TABLE IF NOT EXISTS users (
    id CHAR(36) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_pic VARCHAR(255) DEFAULT 'default_avatar.png',
    is_verified BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(10) DEFAULT 'en' CHECK (preferred_language IN ('en', 'am', 'om')),
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_is_blocked ON users (is_blocked);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id CHAR(36),
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id CHAR(36),
    token VARCHAR(1024) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens (token);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires ON refresh_tokens (expires_at);

CREATE TABLE IF NOT EXISTS password_resets (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets (email);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets (token);

-- 3. PRODUCT & INVENTORY SYSTEM
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(100),
    name_am VARCHAR(100),
    name_om VARCHAR(100),
    description_en TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INT,
    name_en VARCHAR(255) NOT NULL,
    name_am VARCHAR(255),
    name_om VARCHAR(255),
    description_en TEXT,
    description_am TEXT,
    description_om TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    roast_level VARCHAR(20) DEFAULT 'Medium' CHECK (roast_level IN ('Light', 'Medium', 'Dark')),
    origin_region VARCHAR(100),
    altitude VARCHAR(50),
    process_method VARCHAR(100),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products (is_active);
CREATE INDEX IF NOT EXISTS idx_products_price ON products (price);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at);
CREATE INDEX IF NOT EXISTS idx_products_origin_region ON products (origin_region);
CREATE INDEX IF NOT EXISTS idx_products_roast_level ON products (roast_level);

-- 4. ORDER & TRACKING SYSTEM
CREATE TABLE IF NOT EXISTS orders (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled')),
    payment_status VARCHAR(50) DEFAULT 'Unpaid' CHECK (payment_status IN ('Unpaid', 'Pending Verification', 'Paid', 'Refunded')),
    payment_method VARCHAR(50),
    tracking_number VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);
CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders (user_id, created_at);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id CHAR(36),
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- 5. PAYMENT VERIFICATION SYSTEM
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id CHAR(36),
    transaction_id VARCHAR(100),
    method VARCHAR(50) NOT NULL,
    screenshot_url VARCHAR(255),
    amount DECIMAL(10,2),
    admin_notes TEXT,
    verified_by CHAR(36),
    verified_at TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments (order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments (status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments (created_at);

-- 6. SUBSCRIPTIONS & REVIEWS
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id CHAR(36),
    plan_name VARCHAR(50) NOT NULL,
    frequency_days INT NOT NULL DEFAULT 30,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Paused', 'Cancelled')),
    next_delivery_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions (status);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id CHAR(36),
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    sentiment_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE (user_id, product_id)
);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews (product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews (user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews (rating);

-- 7. NOTIFICATION SYSTEM
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'System' CHECK (type IN ('Order', 'System', 'Promotion', 'Security')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications (is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications (user_id, is_read);

-- 8. OTP SYSTEM
CREATE TABLE IF NOT EXISTS otps (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    code VARCHAR(6) NOT NULL,
    purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('verify', 'reset')),
    expires_at TIMESTAMP NOT NULL,
    attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_otps_email ON otps (email);
CREATE INDEX IF NOT EXISTS idx_otps_code ON otps (code);
CREATE INDEX IF NOT EXISTS idx_otps_created_at ON otps (created_at);
