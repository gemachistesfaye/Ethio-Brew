import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingCart, X, Coffee, Trash2, Minus, Plus, ChevronRight, CheckCircle
} from 'lucide-react';

// Auth
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import SubscriptionPage from './pages/SubscriptionPage';
import BlogPage from './pages/BlogPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerificationPage from './pages/VerificationPage';
import SettingsPage from './pages/SettingsPage';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import PaymentVerification from './pages/admin/PaymentVerification';

// Components
import Layout from './components/Layout';
import ProductModal from './components/ProductModal';
import ChatAssistant from './components/ChatAssistant';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

const Storefront = ({ 
  t, i18n, cart, cartCount, cartTotal, isCartOpen, setIsCartOpen, 
  currentPage, setCurrentPage, orderComplete, setOrderComplete,
  selectedProduct, setSelectedProduct, addToCart, 
  updateQuantity, removeFromCart, handleOrderComplete 
}) => {
  const currentLang = i18n.language;
  const navigate = useNavigate();

  const renderPage = () => {
    if (orderComplete) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-white p-12 rounded-[40px] shadow-2xl border border-gray-50 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">{currentLang === 'am' ? 'አመሰግናለሁ!' : currentLang === 'om' ? 'Galatoomaa!' : 'Thank You!'}</h1>
            <p className="text-gray-500 mb-8">Order <span className="font-mono font-bold text-gray-900">#{orderComplete.id}</span> is brewing.</p>
            <button 
              onClick={() => { setOrderComplete(null); setCurrentPage('home'); }}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold hover:bg-[#004d32] transition"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      );
    }

    return (
      <Routes>
        <Route index element={<Home setPage={setCurrentPage} onProductClick={setSelectedProduct} />} />
        <Route path="menu" element={<MenuPage addToCart={addToCart} onProductClick={setSelectedProduct} />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="stories" element={<div className="py-32 text-center text-gray-400 font-bold text-2xl">Stories Coming Soon...</div>} />
        <Route path="categories" element={<div className="py-32 text-center text-gray-400 font-bold text-2xl">Categories Coming Soon...</div>} />
        <Route path="contact" element={<div className="py-32 text-center text-gray-400 font-bold text-2xl">Contact Page Coming Soon...</div>} />
        <Route path="checkout" element={
          <ProtectedRoute>
            <CheckoutPage cart={cart} total={cartTotal} onOrderComplete={handleOrderComplete} />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    );
  };

  return (
    <Layout 
      cartCount={cartCount} 
      toggleCart={() => setIsCartOpen(!isCartOpen)} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      {renderPage()}
      <ProductModal item={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} addToCart={addToCart} />
      <ChatAssistant />

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 border-b flex justify-between items-center bg-[#FDFCF8]">
              <h2 className="text-2xl font-bold flex items-center gap-3"><ShoppingCart className="text-[#006341]"/> {t('cart.title')}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Coffee size={64} className="opacity-10 mb-6" />
                  <p className="text-lg font-medium">{t('cart.empty')}</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-6 border-gray-50 last:border-none">
                    <img src={item.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-grow">
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-gray-900">{currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : item.name}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-100"><Minus size={14}/></button>
                          <span className="px-4 text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-100"><Plus size={14}/></button>
                        </div>
                        <span className="font-bold text-[#006341]">{(item.price * item.quantity).toLocaleString()} ETB</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-8 bg-[#FDFCF8] border-t space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">{t('cart.total')}</span>
                  <span className="text-3xl font-extrabold text-[#006341]">{cartTotal.toLocaleString()} ETB</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); setCurrentPage('checkout'); navigate('/checkout'); }} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2">
                  {t('cart.checkout')} <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export function AppContent() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    const path = location.pathname.substring(1) || 'home';
    setCurrentPage(path);
  }, [location.pathname]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const handleOrderComplete = (order) => {
    setOrderComplete(order);
    setCart([]);
    setIsCartOpen(false);
  };

  const storefrontProps = {
    t, i18n, cart, cartCount, cartTotal, isCartOpen, setIsCartOpen,
    currentPage, setCurrentPage, orderComplete, setOrderComplete,
    selectedProduct, setSelectedProduct, addToCart,
    updateQuantity, removeFromCart, handleOrderComplete
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      
      <Route path="/admin/*" element={
        <ProtectedRoute adminOnly>
          <AdminLayout>
            <Routes>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="payments" element={<PaymentVerification />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

      <Route path="/*" element={<Storefront {...storefrontProps} />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}