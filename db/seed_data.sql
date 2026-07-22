-- Ethio-Brew Enterprise Seed Data
-- Populate the new production schema with premium content

-- 1. CATEGORIES (Localized)
INSERT INTO categories (name_en, name_am, name_om, description_en) VALUES 
('Single Origin', 'ነጠላ መነሻ', 'Bakka Tokko', 'Pure beans from specific Ethiopian regions'),
('Specialty Blends', 'ልዩ ድብልቆች', 'Makaa Addaa', 'Expertly crafted multi-region blends'),
('Traditional Roast', 'ባህላዊ ቁላ', 'Aadaa Waadii', 'Perfect for the classic coffee ceremony');

-- 2. PREMIUM PRODUCTS
INSERT INTO products (category_id, name_en, name_am, name_om, price, stock_quantity, roast_level, origin_region, altitude, process_method, image_url) VALUES 
(1, 'Yirgacheffe Floral', 'ይርጋጨፌ አበባ', 'Yirgaacafee Daraaraa', 450.00, 100, 'Light', 'Yirgacheffe', '1,900m', 'Washed', 'https://images.unsplash.com/photo-1524350303359-8663f557558b?auto=format&fit=crop&q=80&w=800'),
(1, 'Sidamo Sun-Dried', 'ሲዳሞ ፀሐይ የደረቀ', 'Sidaamoo Aduun Goge', 380.00, 150, 'Medium', 'Sidama', '2,100m', 'Natural', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'),
(2, 'Midnight Espresso', 'የእኩለ ሌሊት ኤስፕሬሶ', 'Espiresoo Halkan', 520.00, 80, 'Dark', 'Jimma', '1,700m', 'Natural', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'),
(3, 'Ceremony Gold', 'የስነ-ስርዓት ወርቅ', 'Warqee Sirnaa', 320.00, 200, 'Medium', 'Mixed', '1,800m', 'Washed', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800');

-- 3. INITIAL ADMIN USER
-- Password: admin123 (bcrypt hash with 10 rounds)
-- To regenerate: node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
INSERT INTO users (id, full_name, email, password, phone, is_verified) VALUES 
('a0000000-0000-0000-0000-000000000001', 'System Admin', 'admin@ethiobrew.com', '$2a$10$8K1p/a0dL1LXMc.0SZ0W3.Vl4MySJNHzmM7r1AVQP1lEJhnK3k5Ee', '0911223344', TRUE);

-- Link Admin to Role (role_id 2 = admin)
INSERT INTO user_roles (user_id, role_id) VALUES ('a0000000-0000-0000-0000-000000000001', 2);
