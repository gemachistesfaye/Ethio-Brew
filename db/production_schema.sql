-- Ethio-Brew "THE FINAL NUKE" Schema (v2.0.2)
-- Description: Forces a clean wipe of ALL previous and current tables.

-- THE NUCLEAR OPTION: Turn off all safety checks
SET FOREIGN_KEY_CHECKS = 0;

-- List every possible table name used in any version of this project
DROP TABLE IF EXISTS 
    order_items, 
    order_details, 
    payments, 
    subscriptions, 
    reviews, 
    notifications, 
    refresh_tokens, 
    password_resets, 
    user_roles, 
    orders, 
    products, 
    categories, 
    users, 
    roles, 
    cart_items, 
    contacts;

-- Re-enable safety for the build process
SET FOREIGN_KEY_CHECKS = 1;

-- 1. ROLES SYSTEM
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description) VALUES 
('customer', 'Regular store customer'),
('admin', 'Super administrator with full access'),
('coffee_manager', 'Manages products, roasting and inventory'),
('delivery_staff', 'Handles order fulfillment and shipping');

-- 2. USERS SYSTEM
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_pic VARCHAR(255) DEFAULT 'default_avatar.png',
    is_verified BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    preferred_language ENUM('en', 'am', 'om') DEFAULT 'en',
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(500) NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. PRODUCT & INVENTORY SYSTEM
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(100),
    name_am VARCHAR(100),
    name_om VARCHAR(100),
    description_en TEXT
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name_en VARCHAR(255) NOT NULL,
    name_am VARCHAR(255),
    name_om VARCHAR(255),
    description_en TEXT,
    description_am TEXT,
    description_om TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    roast_level ENUM('Light', 'Medium', 'Dark') DEFAULT 'Medium',
    origin_region VARCHAR(100),
    altitude VARCHAR(50),
    process_method VARCHAR(100),
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. ORDER & TRACKING SYSTEM
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address TEXT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    status ENUM('Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    payment_status ENUM('Unpaid', 'Pending Verification', 'Paid', 'Refunded') DEFAULT 'Unpaid',
    payment_method VARCHAR(50),
    tracking_number VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- 5. PAYMENT VERIFICATION SYSTEM
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    transaction_id VARCHAR(100),
    screenshot_url VARCHAR(255),
    amount DECIMAL(10,2),
    verified_by INT,
    verified_at DATETIME,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. SUBSCRIPTION & REVIEWS
CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_name VARCHAR(50),
    frequency_days INT,
    status ENUM('Active', 'Paused', 'Cancelled') DEFAULT 'Active',
    next_delivery_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    sentiment_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. NOTIFICATION SYSTEM
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    message TEXT,
    type ENUM('Order', 'System', 'Promotion', 'Security'),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
