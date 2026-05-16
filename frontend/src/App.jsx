import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from './hooks/useTranslation';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import CoffeeAIExpert from './components/CoffeeAIExpert';
import OriginMap from './components/OriginMap';
import ChatAssistant from './components/ChatAssistant';
import OrderTracker from './components/OrderTracker';
import ProductModal from './components/ProductModal';

// Pages
import HomePage from './pages/Home';
import ShopPage from './pages/MenuPage';
import StoriesPage from './pages/StoriesPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import SettingsPage from './pages/SettingsPage';

// Admin
import AdminLayout from './admin/AdminLayout';

const App = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Added to cart!`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={`min-h-screen bg-white ${language === 'am' || language === 'om' ? 'font-noto' : 'font-inter'}`}>
      {!isAdminPath && <Navbar cartCount={cart.length} toggleCart={() => navigate('/checkout')} />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage addToCart={handleAddToCart} onProductClick={handleProductClick} />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} total={cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0)} onOrderComplete={() => { alert('Order Placed successfully!'); setCart([]); navigate('/'); }} />} />
          
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
      
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            addToCart={handleAddToCart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;