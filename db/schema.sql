
-- Database schema for EthioBrew

CREATE DATABASE IF NOT EXISTS ethiobrew;
USE ethiobrew;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coffee_items (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_am VARCHAR(255),
    description TEXT,
    description_am TEXT,
    origin VARCHAR(100),
    roast ENUM('Light', 'Medium', 'Dark') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    category ENUM('Single Origin', 'Blend', 'Specialty') DEFAULT 'Single Origin',
    flavor_notes JSON
);

CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    items JSON NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    payment_method ENUM('M-Birr', 'CBE-Birr', 'Stripe') NOT NULL,
    status ENUM('Pending', 'Preparing', 'Delivered') DEFAULT 'Pending',
    paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    order_id VARCHAR(36),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);
