import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Coffee, ShoppingCart, Menu as MenuIcon, X, ChevronRight, 
  Award, User, LogOut, Settings, Github, Send, Phone as PhoneIcon, Mail
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, cartCount, toggleCart, currentPage, setCurrentPage, points }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans flex flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentPage('home'); navigate('/'); }}>
            <Coffee className="w-8 h-8 text-[#006341]" />
            <span className="text-2xl font-bold tracking-tight text-[#4B2C20]">{t('nav.brand', 'EthioBrew')}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {['home', 'shop', 'subscription', 'stories', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => { setCurrentPage(page); navigate(page === 'home' ? '/' : page === 'shop' ? '/menu' : `/${page}`); }}
                className={`capitalize hover:text-[#006341] transition ${currentPage === page ? 'text-[#006341] border-b-2 border-[#006341]' : 'text-gray-600'}`}
              >
                {t(`nav.${page}`, page)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {['en', 'am', 'om'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition ${i18n.language === lang ? 'bg-white text-[#006341] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button onClick={toggleCart} className="relative p-2 rounded-full bg-[#4B2C20] text-white hover:bg-[#3d241a] transition">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#4B2C20] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Button/Menu */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-full bg-[#006341] text-white flex items-center justify-center font-bold text-sm shadow-lg active:scale-95 transition"
                >
                  {user.name.charAt(0)}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { navigate('/settings'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                      <Settings size={16} /> Settings
                    </button>
                    {user.role === 'admin' && (
                       <button onClick={() => { navigate('/admin'); setIsUserMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                        <Award size={16} /> Admin Panel
                      </button>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-2 px-6 py-2 bg-[#4B2C20] text-white rounded-xl font-bold text-sm hover:bg-black transition"
              >
                <User size={16} /> Login
              </button>
            )}

            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-gray-600">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden animate-in fade-in duration-300">
          <div className="absolute right-0 top-0 h-full w-64 bg-white p-6 shadow-2xl">
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6 font-medium">
              {['home', 'shop', 'subscription', 'stories', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => { 
                    setCurrentPage(page); 
                    navigate(page === 'home' ? '/' : page === 'shop' ? '/menu' : `/${page}`);
                    setIsMobileMenuOpen(false); 
                  }}
                  className="text-left capitalize text-xl flex items-center justify-between"
                >
                  {t(`nav.${page}`, page)}
                  <ChevronRight size={18} />
                </button>
              ))}
              {user ? (
                <>
                  <button onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }} className="text-left capitalize text-xl flex items-center justify-between">
                    Settings <Settings size={18} />
                  </button>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-left capitalize text-xl flex items-center justify-between text-red-600">
                    Logout <LogOut size={18} />
                  </button>
                </>
              ) : (
                 <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="mt-4 bg-[#006341] text-white py-4 rounded-xl font-bold">Login</button>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-100 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#4B2C20] rounded-2xl flex items-center justify-center text-[#FFD700]">
                <Coffee size={20} />
             </div>
             <div>
                <p className="font-bold text-lg leading-tight">Ethio-Brew</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Premium Coffee SaaS</p>
             </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1">
             <p className="text-sm font-bold text-gray-900">Developed by Gemachis Tesfaye</p>
             <p className="text-xs text-gray-400 font-medium">Software Developer</p>
             <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs text-gray-500 font-medium mt-2">
                <a href="tel:+251976601074" className="flex items-center gap-1.5 hover:text-[#006341] transition"><PhoneIcon size={14}/> +251976601074</a>
                <a href="mailto:gemachistesfaye36@gmail.com" title="Email" className="flex items-center gap-1.5 hover:text-[#006341] transition"><Mail size={16}/></a>
                <a href="https://t.me/urjiiko1" target="_blank" rel="noreferrer" title="Telegram" className="flex items-center gap-1.5 hover:text-[#006341] transition"><Send size={16}/></a>
                <a href="https://github.com/gemachistesfaye" target="_blank" rel="noreferrer" title="GitHub" className="flex items-center gap-1.5 hover:text-[#006341] transition"><Github size={16}/></a>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-50 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Ethio-Brew Platform • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Layout;
