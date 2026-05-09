# Features Overview

Ethio-Brew is designed as a comprehensive, end-to-end e-commerce and storytelling platform.

## 🛍️ Coffee Marketplace
A dynamic catalog allowing users to browse premium, single-origin Ethiopian coffees. Users can view detailed flavor profiles (e.g., Floral Yirgacheffe, Bold Harrar), adjust quantities, and manage a real-time shopping cart.

## 📖 Storytelling & Blog System
More than just a store, the platform educates users. A rich, card-based blog system dives deep into Ethiopian heritage, covering the Legend of Kaldi, the traditional Buna ceremony, and the journey from bean to cup.

## 🔐 Advanced Authentication
A fully secure registration and login system utilizing:
- Email verification via `nodemailer`.
- Password reset flows.
- JWT-based sessions stored in HTTP-only cookies.

## 💳 Checkout & Payment System
A multi-step checkout process that collects shipping information and processes orders. It natively supports regional payment methods (simulated) including Telebirr and CBE Birr.

## 🤖 AI Coffee Assistant
An integrated AI chat widget that helps users choose the perfect coffee based on their taste preferences and answers questions regarding pricing and origin.

## 🌍 Multi-Language Support
Complete Internationalization (i18n) allows users to seamlessly switch the platform's language between:
- English
- Amharic (አማርኛ)
- Afaan Oromoo

## 🛡️ Admin Dashboard (Role-Based Access)
Users designated as 'admin' in the database have access to a secure backend portal for:
- Monitoring total sales and revenue.
- Managing product inventory.
- Verifying manual payments.

## 📱 Fully Responsive Design
The entire application is built mobile-first utilizing Tailwind CSS, ensuring perfect layouts across desktops, tablets, and smartphones.
