import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useAuth } from '../context/AuthContext';
import { 
  Coffee, ShoppingCart, Menu as MenuIcon, X, 
  Award, User, LogOut, Settings 
} from 'lucide-react';

const Navbar = ({ toggleCart, cartCount = 0 }) => {
  const { t, language, changeLanguage } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  // CHECK ROLES: Support for the new Enterprise role array
  const isAdmin = user?.roles?.includes('admin') || user?.role === 'admin';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-[#4B2C20] rounded-2xl flex items-center justify-center text-[#FFD700] group-hover:rotate-12 transition-transform">
            <Coffee size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#4B2C20]">Ethio-Brew</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-bold text-sm">
          {['home', 'shop', 'blog', 'about', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => navigate(page === 'home' ? '/' : `/${page}`)}
              className="capitalize text-gray-500 hover:text-[#006341] transition tracking-wide whitespace-nowrap"
            >
              {t(`nav.${page}`)}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-6">
          
          {/* Language Switcher */}
          <div className="hidden sm:flex bg-gray-100/50 p-1 rounded-2xl border border-gray-100">
            {['en', 'am', 'om'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition ${language === lang ? 'bg-white text-[#006341] shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Cart Button */}
          <button onClick={toggleCart} className="relative p-2 text-[#4B2C20] hover:text-[#006341] transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 bg-white border border-gray-100 p-1.5 pr-4 rounded-2xl hover:shadow-lg transition"
              >
                <div className="w-9 h-9 rounded-xl bg-[#006341] text-white flex items-center justify-center font-black text-xs">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <span className="text-xs font-bold text-[#4B2C20] hidden md:block">{user.name || 'User'}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-gray-50 py-3 animate-in fade-in slide-in-from-top-2 z-50">
                  <div className="px-5 py-3 border-b border-gray-50 mb-2">
                    <p className="text-xs font-black text-gray-900 truncate">{user.name || 'Account'}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                  </div>
                  
                  {isAdmin && (
                    <button onClick={() => { navigate('/admin'); setIsUserMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm text-[#006341] font-bold hover:bg-green-50 flex items-center gap-3">
                      <Award size={18} /> Business Center
                    </button>
                  )}

                  <button onClick={() => { navigate('/settings'); setIsUserMenuOpen(false); }} className="w-full text-left px-5 py-3 text-sm text-gray-600 font-medium hover:bg-gray-50 flex items-center gap-3">
                    <Settings size={18} /> {t('nav.settings')}
                  </button>
                  
                  <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm text-red-600 font-bold hover:bg-red-50 flex items-center gap-3">
                    <LogOut size={18} /> {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#4B2C20] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition shadow-xl"
            >
              {t('nav.login')}
            </button>
          )}

          <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-[#4B2C20]">
            <MenuIcon size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#4B2C20]/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300">
          <div className="absolute right-4 top-4 bottom-4 w-72 bg-white rounded-[40px] p-8 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-10">
               <span className="font-black text-xl text-[#4B2C20]">Menu</span>
               <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="flex flex-col gap-5">
              {['home', 'shop', 'blog', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => { navigate(page === 'home' ? '/' : `/${page}`); setIsMobileMenuOpen(false); }}
                  className="text-left text-xl font-black text-[#4B2C20] active:text-[#006341]"
                >
                  {t(`nav.${page}`)}
                </button>
              ))}
              
              {isAdmin && (
                <button onClick={() => { navigate('/admin'); setIsMobileMenuOpen(false); }} className="text-left text-2xl font-black text-[#006341] flex items-center gap-3 border-t border-gray-100 pt-6">
                  <Award /> Admin
                </button>
              )}
            </div>
            
            <div className="mt-auto">
               {!user ? (
                 <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="w-full bg-[#4B2C20] text-white py-5 rounded-2xl font-black">{t('nav.login')}</button>
               ) : (
                 <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full bg-red-50 text-red-600 py-5 rounded-2xl font-black">{t('nav.logout')}</button>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
