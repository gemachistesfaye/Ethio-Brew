import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from './hooks/useTranslation';
import { AnimatePresence } from 'framer-motion';

// Context
import { useCart } from './context/CartContext';
import { useToast } from './components/Toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CoffeeAIExpert from './components/CoffeeAIExpert';
import OriginMap from './components/OriginMap';
import ChatAssistant from './components/ChatAssistant';
import OrderTracker from './components/OrderTracker';
import ProductModal from './components/ProductModal';
import ProtectedRoute from './components/ProtectedRoute';

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
import SubscriptionPage from './pages/SubscriptionPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerificationPage from './pages/VerificationPage';

// Admin
import AdminLayout from './admin/AdminLayout';

const App = () => {
  const { t, language } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { cart, addToCart, clearCart, cartCount } = useCart();
  const { addToast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    addToast(`${product.name || 'Item'} added to cart!`, 'success');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className={`min-h-screen bg-white ${language === 'am' || language === 'om' ? 'font-noto' : 'font-inter'}`}>
      {!isAdminPath && <Navbar cartCount={cartCount} toggleCart={() => navigate('/checkout')} />}
      
      <main>
        <Routes>
          <Route path="/" element={<HomePage setPage={(page) => navigate(page === 'menu' ? '/shop' : '/' + page)} onProductClick={handleProductClick} />} />
          <Route path="/shop" element={<ShopPage addToCart={handleAddToCart} onProductClick={handleProductClick} />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={
            <ProtectedRoute><SettingsPage /></ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify" element={<VerificationPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/subscription" element={<SubscriptionPage addToCart={handleAddToCart} />} />
          
          {/* Advanced Tracking Route */}
          <Route path="/track/:id" element={<div className="py-20 px-4 bg-gray-50"><OrderTracker /></div>} />

          {/* Admin Dashboard Route */}
          <Route path="/admin/*" element={
            <ProtectedRoute requireRole="admin"><AdminLayout /></ProtectedRoute>
          } />

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
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)} 
            addToCart={handleAddToCart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;