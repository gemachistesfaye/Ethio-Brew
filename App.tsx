import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coffee, ShoppingCart, Menu as MenuIcon, X, Globe, ChevronRight, 
  MapPin, Phone, CreditCard, Facebook, Instagram, Twitter, 
  Smartphone, Landmark, Upload, CheckCircle, Leaf, Zap, 
  Award, Star, Search, Image as ImageIcon, Plus, Minus, Trash2,
  Calendar, ShieldCheck, Heart, Share2, Info
} from 'lucide-react';

// --- Constants & Mock Data ---

const TRANSLATIONS = {
  EN: {
    brand: 'EthioBrew',
    home: 'Home',
    menu: 'Menu',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    orderNow: 'Order Now',
    explore: 'Explore More',
    addToCart: 'Add to Cart',
    search: 'Search coffee...',
    checkout: 'Checkout',
    delivery: 'Delivery Address',
    address: 'Street, City (e.g., Bole, Addis)',
    phone: 'Phone Number',
    paymentMethod: 'Payment Method',
    uploadProof: 'Upload Payment Screenshot',
    paymentInstructions: 'Please transfer the total amount to the account below and upload a screenshot of the transaction.',
    confirmPayment: 'Confirm Order',
    summary: 'Order Summary',
    total: 'Total',
    latestBlogs: 'From the Coffee Lands',
    readMore: 'Read Story',
    story: 'Our Heritage',
    cart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    subscription: 'Coffee Club',
    points: 'EthioPoints',
    reviews: 'Reviews',
    tastingNotes: 'Tasting Notes'
  },
  AM: {
    brand: 'ኢትዮ-ብሩ',
    home: 'ዋና ገጽ',
    menu: 'ዝርዝር',
    blog: 'ብሎግ',
    about: 'ስለ እኛ',
    contact: 'ያግኙን',
    orderNow: 'አሁን ይዘዙ',
    explore: 'ተጨማሪ ይመልከቱ',
    addToCart: 'ወደ ቅርጫት',
    search: 'ቡና ይፈልጉ...',
    checkout: 'ክፍያ',
    delivery: 'የማድረሻ አድራሻ',
    address: 'መንገድ፣ ከተማ (ለምሳሌ ቦሌ፣ አዲስ አበባ)',
    phone: 'ስልክ ቁጥር',
    paymentMethod: 'የክፍያ ዘዴ',
    uploadProof: 'የክፍያ ማረጋገጫ ይጫኑ',
    paymentInstructions: 'እባክዎ ጠቅላላ ክፍያውን ከታች ባለው አካውንት ይላኩ እና የደረሰኙን ፎቶ እዚህ ይጫኑ።',
    confirmPayment: 'ትዕዛዙን አረጋግጥ',
    summary: 'የትዕዛዝ ማጠቃለያ',
    total: 'ጠቅላላ',
    latestBlogs: 'የቅርብ ጊዜ መረጃዎች',
    readMore: 'ተጨማሪ ያንብቡ',
    story: 'ታሪካችን',
    cart: 'የእርስዎ ቅርጫት',
    emptyCart: 'ቅርጫትዎ ባዶ ነው',
    subscription: 'የቡና ክበብ',
    points: 'ኢትዮ-ፖይንትስ',
    reviews: 'አስተያየቶች',
    tastingNotes: 'የጣዕም መገለጫ'
  }
};

const PAYMENT_DETAILS = {
  telebirr: '0911234567',
  cbeAccount: '1000123456789'
};

const MOCK_COFFEE = [
  { 
    id: '1', name: 'Yirgacheffe Special', nameAm: 'ይርጋጨፌ ስፔሻል', origin: 'Yirgacheffe', price: 850, 
    description: 'Light-bodied with floral notes and a bright citrus acidity.', 
    descriptionAm: 'ቀለል ያለ የሰውነት ይዘት ያለው፣ የአበባ መዓዛ እና የሎሚ ጣዕም ያለው።', 
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    rating: 4.9, reviews: 124, roast: 'Light', notes: ['Jasmine', 'Lemon', 'Peach']
  },
  { 
    id: '2', name: 'Sidamo Honey Process', nameAm: 'ሲዳሞ ማር ፕሮሰስ', origin: 'Sidamo', price: 720, 
    description: 'Sweet, complex fruit flavors with a smooth finish.', 
    descriptionAm: 'ጣፋጭ፣ ውስብስብ የፍራፍሬ ጣዕም እና ለስላሳ አጨራረስ ያለው።', 
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    rating: 4.7, reviews: 89, roast: 'Medium', notes: ['Honey', 'Berry', 'Chocolate']
  },
  { 
    id: '3', name: 'Harrar Bold Roast', nameAm: 'ሐረር ቦልድ ሮስት', origin: 'Harrar', price: 680, 
    description: 'Known for its fruity, blueberry-like aroma and heavy body.', 
    descriptionAm: 'በፍራፍሬ እና በብሉቤሪ መዓዛው እንዲሁም በከባድ የሰውነት ይዘቱ የሚታወቅ።', 
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    rating: 4.8, reviews: 56, roast: 'Dark', notes: ['Blueberry', 'Winey', 'Spice']
  },
  { 
    id: '4', name: 'Jimma Highland', nameAm: 'ጅማ ሃይላንድ', origin: 'Jimma', price: 550, 
    description: 'Earthy and nutty profile, perfect for a traditional jebena brew.', 
    descriptionAm: 'ለመደበኛ የጀበና ቡና የሚሆን፣ የለውዝ ጣዕም ያለው።', 
    imageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800',
    rating: 4.5, reviews: 42, roast: 'Medium-Dark', notes: ['Nutty', 'Earthy', 'Caramel']
  },
];

const MOCK_BLOGS = [
  { id: '1', title: 'The Origins of Kaldi', titleAm: 'የካልዲ ታሪክ', excerpt: 'Discover how a goat herder found the magic of coffee beans.', excerptAm: 'አንድ ፍየል እረኛ የቡና ፍሬን አስማት እንዴት እንዳገኘ ይወቁ።', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200' },
  { id: '2', title: 'The Art of the Ceremony', titleAm: 'የቡና ሥነ-ሥርዓት ጥበብ', excerpt: 'Understanding the three rounds of an Ethiopian coffee ceremony.', excerptAm: 'የኢትዮጵያ የቡና ሥነ-ሥርዓት ሦስቱን ዙሮች መረዳት።', imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1200' },
];

const SUBSCRIPTIONS = [
  { id: 'sub1', name: 'Weekly Ritual', price: 2800, interval: 'Monthly (4 bags)', savings: '15%' },
  { id: 'sub2', name: 'The Connoisseur', price: 5200, interval: 'Monthly (8 bags)', savings: '25%' }
];

// --- Sub-components ---

const ProductModal = ({ item, isOpen, onClose, addToCart, language }) => {
  if (!item || !isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
          <button onClick={onClose} className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full md:hidden">
            <X size={20} />
          </button>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="hidden md:flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-400 hover:text-black transition"><X /></button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#006341]/10 text-[#006341] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{item.origin}</span>
            <div className="flex items-center text-[#FFD700] ml-auto">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold ml-1 text-gray-900">{item.rating}</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">{language === 'EN' ? item.name : item.nameAm}</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {language === 'EN' ? item.description : item.descriptionAm}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-100 p-4 rounded-2xl bg-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Roast Level</p>
              <p className="font-bold">{item.roast}</p>
            </div>
            <div className="border border-gray-100 p-4 rounded-2xl bg-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t.tastingNotes}</p>
              <div className="flex flex-wrap gap-1">
                {item.notes.map(n => <span key={n} className="text-xs bg-white px-2 py-0.5 rounded-md shadow-sm">{n}</span>)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">Price</p>
              <p className="text-2xl font-extrabold text-[#006341]">{item.price} ETB</p>
            </div>
            <button 
              onClick={() => { addToCart(item); onClose(); }}
              className="bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004d32] transition shadow-lg flex items-center gap-2"
            >
              <Plus size={20} /> {t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Components ---

const Layout = ({ children, language, setLanguage, cartCount, toggleCart, currentPage, setCurrentPage, points }) => {
  const t = TRANSLATIONS[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-100 h-16">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Coffee className="w-8 h-8 text-[#006341]" />
            <span className="text-2xl font-bold tracking-tight text-[#4B2C20]">{t.brand}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {['home', 'menu', 'subscription', 'blog', 'about'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize hover:text-[#006341] transition ${currentPage === page ? 'text-[#006341] border-b-2 border-[#006341]' : 'text-gray-600'}`}
              >
                {t[page]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 bg-[#FFD700]/10 text-[#4B2C20] px-3 py-1.5 rounded-full border border-[#FFD700]/30">
              <Award size={14} className="text-[#DAA520]" />
              <span className="text-xs font-bold">{points} <span className="opacity-60">{t.points}</span></span>
            </div>
            <button onClick={() => setLanguage(language === 'EN' ? 'AM' : 'EN')} className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition">
              <Globe size={18} />
              <span className="text-sm font-bold">{language}</span>
            </button>
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
                  {t[page]}
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
              <span className="text-xl font-bold">{t.brand}</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">Hand-picked beans from the Ethiopian highlands, roasted for the world.</p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-[#FFD700] cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('menu')}>Menu</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('subscription')}>Subscription</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentPage('blog')}>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Loyalty</h4>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-[10px] text-[#FFD700] font-bold uppercase mb-1">Your Balance</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">{points}</span>
                <span className="text-xs text-gray-400">Points</span>
              </div>
              <p className="text-[9px] text-gray-500 mt-2">Earn 10 points for every 100 ETB spent.</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p className="flex items-start gap-2"><MapPin size={16}/> Bole Road, Addis Ababa</p>
              <p className="flex items-center gap-2"><Phone size={16}/> +251 911 123 456</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} EthioBrew. Authentic Ethiopian Heritage.
        </div>
      </footer>
    </div>
  );
};

const SubscriptionPage = ({ language }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <div className="mb-16 max-w-2xl mx-auto">
        <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t.subscription}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">Never Run Out of Magic</h1>
        <p className="text-gray-500">Subscribe to your favorite beans and save up to 25% on every order. Delivered fresh from our roastery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {SUBSCRIPTIONS.map(sub => (
          <div key={sub.id} className="relative bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition group overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-[#4B2C20] px-6 py-2 rounded-bl-3xl font-bold text-sm">Save {sub.savings}</div>
            <h3 className="text-2xl font-bold mb-2">{sub.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{sub.interval}</p>
            <div className="text-4xl font-extrabold text-[#006341] mb-8">{sub.price} <span className="text-lg text-gray-400 font-normal">ETB / mo</span></div>
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> Free delivery included</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> Exclusive early access to new harvests</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> Pause or cancel anytime</li>
            </ul>
            <button className="w-full bg-[#4B2C20] text-white py-4 rounded-2xl font-bold hover:bg-[#006341] transition group-hover:scale-105 duration-300">
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Home = ({ language, setPage }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-8xl font-extrabold leading-tight mb-6">
              {language === 'EN' ? 'Savor the Soul of Ethiopia' : 'የኢትዮጵያን ነፍስ ይቅመሱ'}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              From the highlands of Kaffa to your doorstep, experience the original coffee tradition.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage('menu')} className="bg-[#006341] text-white px-8 py-4 rounded-full font-bold hover:bg-[#004d32] transition shadow-lg flex items-center gap-2">
                {t.orderNow} <ChevronRight size={18} />
              </button>
              <button onClick={() => setPage('subscription')} className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                Join the Club
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#FDFCF8] border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck className="text-[#006341]"/>, text: "Secure Payments" },
            { icon: <Leaf className="text-[#006341]"/>, text: "Direct Trade" },
            { icon: <Zap className="text-[#006341]"/>, text: "Fast Delivery" },
            { icon: <Award className="text-[#006341]"/>, text: "Premium Grades" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">{item.icon}</div>
              <span className="font-bold text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">Regional Favorites</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Finest Beans from the Highlands</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Yirgacheffe', note: 'Floral & Sweet', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800' },
            { name: 'Sidamo', note: 'Berry & Rich', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800' },
            { name: 'Harrar', note: 'Bold & Fruity', img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800' }
          ].map((region, i) => (
            <div key={i} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer" onClick={() => setPage('menu')}>
              <img src={region.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">{region.note}</p>
                <h3 className="text-2xl font-bold">{region.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MenuPage = ({ language, addToCart, onProductClick }) => {
  const t = TRANSLATIONS[language];
  const [search, setSearch] = useState('');

  const filteredItems = MOCK_COFFEE.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.nameAm.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-in slide-in-from-bottom-2">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold">{t.menu}</h1>
          <p className="text-gray-500">Premium Ethiopian Single Origin Coffee</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder={t.search} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#006341] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative">
             <button onClick={() => onProductClick(item)} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                <Info size={18} />
             </button>
            <div className="relative h-56 overflow-hidden" onClick={() => onProductClick(item)}>
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer" />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-1 text-[#FFD700] mb-2">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-bold text-gray-900">{item.rating}</span>
                <span className="text-[10px] text-gray-400">({item.reviews})</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{language === 'EN' ? item.name : item.nameAm}</h3>
              <p className="text-gray-400 text-[11px] mb-4 uppercase tracking-tighter">{item.roast} Roast • {item.origin}</p>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                <span className="font-bold text-[#006341] text-lg">{item.price} ETB</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-[#006341] text-white p-3 rounded-xl hover:bg-[#004d32] transition flex items-center gap-1 shadow-md active:scale-95"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckoutPage = ({ language, cart, total, onOrderComplete }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Telebirr');
  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const simulateUpload = () => {
    if (!screenshot) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cart,
      total,
      address,
      phone,
      paymentMethod,
      date: new Date().toISOString()
    };
    onOrderComplete(order);
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12 gap-4">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-[#006341] text-white' : 'bg-gray-200 text-gray-500'}`}>{i}</div>
            {i < 3 && <div className={`h-1 w-12 rounded-full ${step > i ? 'bg-[#006341]' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 animate-in slide-in-from-left duration-500">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><MapPin className="text-[#006341]"/> Delivery Info</h2>
              <input required placeholder={t.address} value={address} onChange={e => setAddress(e.target.value)} className="w-full p-5 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#006341] bg-white" />
              <input required placeholder={t.phone} value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-5 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#006341] bg-white" />
              <button onClick={() => setStep(2)} disabled={!address || !phone} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition disabled:opacity-50">Continue to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="text-[#006341]"/> Payment</h2>
              <div className="grid grid-cols-2 gap-4">
                 {['Telebirr', 'CBE'].map(m => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition ${paymentMethod === m ? 'border-[#006341] bg-green-50' : 'border-white bg-white shadow-sm'}`}
                    >
                      {m === 'Telebirr' ? <Smartphone className="text-[#006341]"/> : <Landmark className="text-[#006341]"/>}
                      <span className="font-bold text-sm">{m}</span>
                    </button>
                  ))}
              </div>
              <div className="bg-[#4B2C20] p-6 rounded-[32px] text-white text-center">
                <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest mb-1">{paymentMethod === 'Telebirr' ? 'Merchant Phone' : 'CBE Account'}</p>
                <p className="text-2xl font-mono font-bold">{paymentMethod === 'Telebirr' ? PAYMENT_DETAILS.telebirr : PAYMENT_DETAILS.cbeAccount}</p>
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition">Next: Confirmation</button>
              <button onClick={() => setStep(1)} className="w-full text-gray-500 font-bold py-2">Back to Delivery</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Upload className="text-[#006341]"/> Confirm & Upload</h2>
              {!uploaded ? (
                <div className="space-y-4">
                  <input type="file" id="up" className="hidden" onChange={e => setScreenshot(e.target.files[0])} />
                  <label htmlFor="up" className="flex flex-col items-center justify-center gap-3 p-12 rounded-[32px] border-2 border-dashed border-gray-200 bg-white cursor-pointer hover:border-[#006341] transition">
                    <ImageIcon size={32} className="text-gray-300"/>
                    <span className="text-sm font-medium text-gray-500">{screenshot ? screenshot.name : 'Upload Screenshot'}</span>
                  </label>
                  {screenshot && (
                    <button onClick={simulateUpload} disabled={uploading} className="w-full bg-[#4B2C20] text-white py-5 rounded-2xl font-bold">
                      {uploading ? 'Verifying...' : 'Submit Proof'}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-green-50 rounded-[32px] border border-green-100">
                  <CheckCircle size={48} className="text-[#006341] mx-auto mb-4" />
                  <h3 className="font-bold text-[#006341]">Payment Verified Locally</h3>
                  <button onClick={handleSubmit} className="mt-8 w-64 bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg">Finish Order</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm h-fit">
          <h3 className="font-bold text-xl mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold">{language === 'EN' ? item.name : item.nameAm}</p>
                    <p className="text-xs text-gray-400">{item.quantity} units</p>
                  </div>
                </div>
                <span className="font-bold">{item.price * item.quantity} ETB</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed pt-6 space-y-2">
             <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>{total} ETB</span>
             </div>
             <div className="flex justify-between text-gray-500 text-sm">
                <span>Points to Earn</span>
                <span className="text-[#DAA520] font-bold">+{Math.floor(total / 10)}</span>
             </div>
             <div className="flex justify-between items-center pt-4 text-2xl font-bold">
                <span>{t.total}</span>
                <span className="text-[#006341]">{total} ETB</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('EN');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [points, setPoints] = useState(150);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
    const earnedPoints = Math.floor(order.total / 10);
    setPoints(prev => prev + earnedPoints);
    setOrderComplete(order);
    setCart([]);
    setIsCartOpen(false);
  };

  const t = TRANSLATIONS[language];

  const renderPage = () => {
    if (orderComplete) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-white p-12 rounded-[40px] shadow-2xl border border-gray-50 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Ameseginalehu!</h1>
            <p className="text-gray-500 mb-8">Order <span className="font-mono font-bold text-gray-900">#{orderComplete.id}</span> is brewing.</p>
            <div className="bg-yellow-50 p-4 rounded-2xl mb-8 flex items-center gap-3 justify-center">
              <Star className="text-[#DAA520]" size={20} />
              <p className="text-sm font-bold text-[#4B2C20]">You earned {Math.floor(orderComplete.total / 10)} Points!</p>
            </div>
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

    switch (currentPage) {
      case 'home': return <Home language={language} setPage={setCurrentPage} />;
      case 'menu': return <MenuPage language={language} addToCart={addToCart} onProductClick={setSelectedProduct} />;
      case 'subscription': return <SubscriptionPage language={language} />;
      case 'blog': return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16">{t.latestBlogs}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {MOCK_BLOGS.map(post => (
              <div key={post.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-[32px] mb-6 shadow-sm">
                  <img src={post.imageUrl} className="w-full h-80 object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{language === 'EN' ? post.title : post.titleAm}</h3>
                <p className="text-gray-500 mb-6">{language === 'EN' ? post.excerpt : post.excerptAm}</p>
                <button className="text-[#006341] font-bold flex items-center gap-1 hover:underline">{t.readMore} <ChevronRight size={16}/></button>
              </div>
            ))}
          </div>
        </div>
      );
      case 'about': return (
        <div className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[#006341] font-bold uppercase tracking-widest">{t.story}</span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">Tradition Roasted with Modern Passion</h1>
            <p className="text-gray-500 leading-relaxed text-lg">EthioBrew was founded to bridge the gap between small-scale Ethiopian farmers and coffee enthusiasts worldwide. We prioritize fair trade and the preservation of the traditional coffee ceremony.</p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm">
                <Award className="text-[#DAA520] mb-3" size={32} />
                <h4 className="font-bold">Premium Grade</h4>
                <p className="text-xs text-gray-400 mt-1">Sourced from top 5% of Ethiopian beans.</p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm">
                <Leaf className="text-[#006341] mb-3" size={32} />
                <h4 className="font-bold">Ethical Sourcing</h4>
                <p className="text-xs text-gray-400 mt-1">100% direct trade with farmers.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#FFD700] rounded-[40px] rotate-3 -z-10 opacity-20" />
            <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000" className="rounded-[40px] shadow-2xl" />
          </div>
        </div>
      );
      case 'checkout': return <CheckoutPage language={language} cart={cart} total={cartTotal} onOrderComplete={handleOrderComplete} />;
      default: return null;
    }
  };

  return (
    <Layout 
      language={language} 
      setLanguage={setLanguage} 
      cartCount={cartCount} 
      toggleCart={() => setIsCartOpen(!isCartOpen)} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      points={points}
    >
      {renderPage()}

      {/* Product Detail Modal */}
      <ProductModal 
        item={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        addToCart={addToCart}
        language={language}
      />

      {/* Slide-out Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-8 border-b flex justify-between items-center bg-[#FDFCF8]">
              <h2 className="text-2xl font-bold flex items-center gap-3"><ShoppingCart className="text-[#006341]"/> {t.cart}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <div className="bg-gray-50 p-10 rounded-full mb-6">
                    <Coffee size={64} className="opacity-10" />
                  </div>
                  <p className="text-lg font-medium">{t.emptyCart}</p>
                  <button onClick={() => { setIsCartOpen(false); setCurrentPage('menu'); }} className="mt-4 text-[#006341] font-bold">Start Shopping</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-6 border-gray-50 last:border-none">
                    <img src={item.imageUrl} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                    <div className="flex-grow">
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-gray-900">{language === 'EN' ? item.name : item.nameAm}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">{item.price} ETB / Unit</p>
                      <div className="flex items-center justify-between">
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
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>{t.total}</span>
                  <span className="text-[#006341]">{cartTotal.toLocaleString()} ETB</span>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 mb-2">
                  <Award className="text-[#006341]" size={20} />
                  <p className="text-xs font-bold text-[#006341]">You will earn {Math.floor(cartTotal / 10)} points</p>
                </div>
                <button 
                  onClick={() => { setIsCartOpen(false); setCurrentPage('checkout'); }}
                  className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#004d32] transition shadow-lg active:scale-95"
                >
                  Go to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 20s infinite ease-in-out;
        }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </Layout>
  );
}