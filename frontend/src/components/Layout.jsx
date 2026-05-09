import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Coffee, ShoppingCart, Menu as MenuIcon, X, ChevronRight, 
  MapPin, Phone, Facebook, Instagram, Twitter, Award
} from 'lucide-react';

const Layout = ({ children, cartCount, toggleCart, currentPage, setCurrentPage, points }) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Coffee className="w-8 h-8 text-[#006341]" />
            <span className="text-2xl font-bold tracking-tight text-[#4B2C20]">{t('nav.brand')}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {['home', 'menu', 'subscription', 'blog', 'about'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize hover:text-[#006341] transition ${currentPage === page ? 'text-[#006341] border-b-2 border-[#006341]' : 'text-gray-600'}`}
              >
                {t(`nav.${page}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 bg-[#FFD700]/10 text-[#4B2C20] px-3 py-1.5 rounded-full border border-[#FFD700]/30">
              <Award size={14} className="text-[#DAA520]" />
              <span className="text-xs font-bold">{points} <span className="opacity-60">{t('loyalty.points')}</span></span>
            </div>
            
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
              {['home', 'menu', 'subscription', 'blog', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setIsMobileMenuOpen(false); }}
                  className="text-left capitalize text-xl flex items-center justify-between"
                >
                  {t(`nav.${page}`)}
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="min-h-[calc(100vh-64px)]">{children}</main>

      <footer className="bg-[#4B2C20] text-white py-12 px-4 border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="w-6 h-6 text-[#FFD700]" />
              <span className="text-xl font-bold">{t('nav.brand')}</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">{t('footer.tagline')}</p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.explore')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('menu')}>{t('nav.menu')}</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('subscription')}>{t('nav.subscription')}</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('blog')}>{t('nav.blog')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('loyalty.points')}</h4>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] text-[#FFD700] font-bold uppercase mb-1">{t('loyalty.balance')}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{points}</span>
                <span className="text-xs text-gray-400">{t('loyalty.points')}</span>
              </div>
              <p className="text-[9px] text-gray-500 mt-2">{t('loyalty.earnRate')}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-start gap-2"><MapPin size={16}/> Bole Road, Addis Ababa</p>
              <p className="flex items-center gap-2"><Phone size={16}/> +251 911 123 456</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
