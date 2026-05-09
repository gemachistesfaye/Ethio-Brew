import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from './hooks/useTranslation';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CoffeeAIExpert from './components/CoffeeAIExpert';
import OriginMap from './components/OriginMap';
import ChatAssistant from './components/ChatAssistant';
import OrderTracker from './components/OrderTracker';

// Pages
import HomePage from './pages/Home';
import ShopPage from './pages/MenuPage';
import StoriesPage from './pages/StoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';

// Admin
import AdminLayout from './admin/AdminLayout';

const App = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen bg-white ${language === 'am' || language === 'om' ? 'font-noto' : 'font-inter'}`}>
      {!isAdminPath && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          {/* Advanced Tracking Route */}
          <Route path="/track/:id" element={<div className="py-20 px-4 bg-gray-50"><OrderTracker /></div>} />

          {/* Admin Dashboard Route */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global AI Sections (Only on Home/Shop) */}
        {(location.pathname === '/' || location.pathname === '/shop') && (
           <div className="space-y-0">
              <OriginMap />
              <CoffeeAIExpert />
           </div>
        )}
      </main>

      {!isAdminPath && <Footer />}
      <ChatAssistant />
    </div>
  );
};

export default App;