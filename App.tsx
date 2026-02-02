
import React, { useState, useEffect, useMemo } from 'react';
import { Coffee, ShoppingCart, Menu as MenuIcon, X, Globe, ChevronRight, MapPin, Phone, CreditCard, Facebook, Instagram, Twitter, Smartphone, Landmark, Upload, CheckCircle, Leaf, Zap, Award, Star, ArrowDown, Search, Filter, BookOpen, User, Calendar, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { CoffeeItem, CartItem, Language, Order, BlogPost } from './types';
import { TRANSLATIONS, COLORS, MOCK_COFFEE, TESTIMONIALS, PAYMENT_DETAILS, MOCK_BLOGS } from './constants';

// --- Sub-components ---

const Layout: React.FC<{
  children: React.ReactNode;
  language: Language;
  setLanguage: (l: Language) => void;
  cartCount: number;
  toggleCart: () => void;
  currentPage: string;
  setCurrentPage: (p: string) => void;
}> = ({ children, language, setLanguage, cartCount, toggleCart, currentPage, setCurrentPage }) => {
  const t = TRANSLATIONS[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 transition-colors duration-500">
      <nav className="sticky top-0 z-50 backdrop-blur-md shadow-sm border-b transition-colors duration-500 bg-white/70 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Coffee className="w-8 h-8 text-[#006341]" />
            <span className="font-heading text-2xl font-bold tracking-tight text-[#4B2C20]">
              {t.brand}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            {['home', 'menu', 'blog', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize hover:text-[#006341] transition ${currentPage === page ? 'text-[#006341] border-b-2 border-[#006341]' : 'text-gray-600'}`}
              >
                {t[page as keyof typeof t]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setLanguage(language === 'EN' ? 'AM' : 'EN')} className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 transition">
              <Globe size={20} />
              <span className="text-sm font-bold">{language}</span>
            </button>
            <button onClick={toggleCart} className="relative p-2 rounded-full bg-[#4B2C20] text-white hover:bg-[#3d241a] transition">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#4B2C20] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 md:hidden animate-in fade-in duration-300">
          <div className="absolute right-0 top-0 h-full w-64 bg-white text-gray-900 p-6 shadow-2xl transition-transform duration-300">
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6 font-medium">
              {['home', 'menu', 'blog', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setIsMobileMenuOpen(false); }}
                  className="text-left capitalize text-xl flex items-center justify-between"
                >
                  {t[page as keyof typeof t]}
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>{children}</main>

      <footer className="bg-[#4B2C20] text-white py-16 px-4 border-t border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="w-8 h-8 text-[#FFD700]" />
              <span className="font-heading text-2xl font-bold">{t.brand}</span>
            </div>
            <p className="text-gray-300 mb-6">Experience the soul of Ethiopia in every sip. Hand-picked, expertly roasted.</p>
            <div className="flex gap-4 text-gray-400">
              <Facebook className="hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Instagram className="hover:text-[#FFD700] cursor-pointer transition-colors" />
              <Twitter className="hover:text-[#FFD700] cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentPage('home')}>Home</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentPage('menu')}>Menu</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentPage('blog')}>Blog</li>
              <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentPage('about')}>About Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Payments</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <Smartphone className="text-[#FFD700]" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-gray-500">Telebirr</div>
                  <div className="text-white font-mono text-sm">{PAYMENT_DETAILS.telebirr}</div>
                </div>
              </li>
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                <Landmark className="text-[#FFD700]" />
                <div>
                  <div className="text-[10px] font-bold uppercase text-gray-500">CBE Account</div>
                  <div className="text-white font-mono text-sm">{PAYMENT_DETAILS.cbeAccount}</div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 border-b border-white/10 pb-2">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-[#FFD700]" />
                <span className="text-sm">Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 shrink-0 text-[#FFD700]" />
                <span className="text-sm">+251 911 123 456</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} EthioBrew. Authentic Ethiopian Brews.
        </div>
      </footer>
    </div>
  );
};

// --- Page Components ---

const Home: React.FC<{ language: Language, setPage: (p: string) => void }> = ({ language, setPage }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
            alt="Ethiopian Coffee Ceremony" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/20 backdrop-blur-md border border-[#FFD700]/30 px-4 py-2 rounded-full text-[#FFD700] font-bold text-sm tracking-widest uppercase">
              <Star size={16} /> Authentic Ethiopian Heritage
            </div>
            <h1 className="font-heading text-6xl md:text-8xl font-bold leading-tight">
              {language === 'EN' ? 'Savor the Soul of Ethiopia' : 'የኢትዮጵያን ነፍስ ይቅመሱ'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed">
              Experience a tradition that dates back centuries. From the highlands of Kaffa to your doorstep, we bring you the original coffee experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button 
                onClick={() => setPage('menu')}
                className="bg-[#006341] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#004d32] transition flex items-center justify-center gap-3 group shadow-2xl active:scale-95"
              >
                {t.orderNow} <ChevronRight className="group-hover:translate-x-1 transition" />
              </button>
              <button 
                onClick={() => setPage('about')}
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition active:scale-95"
              >
                {t.explore}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-32 px-4 bg-white transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#006341] font-black uppercase tracking-[0.3em] text-sm mb-4 block">Regional Gems</span>
              <h2 className="font-heading text-5xl font-bold leading-tight">A Journey Through Ethiopia's Finest Terroirs</h2>
            </div>
            <button onClick={() => setPage('menu')} className="text-lg font-bold border-b-2 border-[#FFD700] hover:text-[#006341] transition pb-1">Browse Catalog</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Yirgacheffe', profile: 'Floral & Citrus', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800' },
              { name: 'Sidamo', profile: 'Rich & Creamy', img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800' },
              { name: 'Harrar', profile: 'Bold & Exotic', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800' }
            ].map((region, i) => (
              <div key={i} className="group relative h-[500px] overflow-hidden rounded-[32px] cursor-pointer" onClick={() => setPage('menu')}>
                <img src={region.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                  <span className="text-[#FFD700] font-bold text-xs uppercase tracking-widest mb-2 block">{region.profile}</span>
                  <h3 className="font-heading text-3xl font-bold mb-4">{region.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#F5F5DC] transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-xl" />
              <div className="absolute -bottom-6 -right-6 bg-[#006341] p-10 rounded-full text-white w-40 h-40 flex flex-col items-center justify-center shadow-2xl">
                <Coffee size={24} className="mb-1" />
                <div className="font-black text-xl">100%</div>
                <div className="text-[8px] font-bold uppercase tracking-widest">Natural</div>
              </div>
            </div>
            <div className="space-y-10">
              <h2 className="font-heading text-5xl font-bold text-[#4B2C20]">Our Mastercraft Process</h2>
              <div className="space-y-8">
                {[
                  { icon: Leaf, title: 'Ethical Sourcing', desc: 'Direct trade with highland farmers ensures fair prices.' },
                  { icon: Zap, title: 'Small-Batch Roasting', desc: ' Treating every bean with individual care and precision.' },
                  { icon: Award, title: 'Fresh Delivery', desc: 'Sealed within minutes and delivered to your doorstep.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="bg-white p-4 rounded-2xl shadow-md h-fit text-[#006341]">
                      <step.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 font-heading">{step.title}</h4>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 20s infinite alternate ease-in-out; }
      `}</style>
    </div>
  );
};

const MenuPage: React.FC<{ language: Language, addToCart: (i: CoffeeItem) => void }> = ({ language, addToCart }) => {
  const t = TRANSLATIONS[language];
  const [search, setSearch] = useState('');

  const filteredItems = MOCK_COFFEE.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                       item.nameAm.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="w-full md:w-1/2">
          <h1 className="font-heading text-5xl font-bold mb-4">{t.menu}</h1>
          <p className="text-gray-500 text-lg">Taste the tradition from Yirgacheffe, Sidamo, and beyond.</p>
        </div>
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder={t.search} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#006341] transition-all border-none bg-white shadow-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-300 border shadow-lg hover:shadow-2xl bg-white border-gray-100">
            <div className="relative h-64 overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#FFD700] text-[#4B2C20] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {item.origin}
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-[#006341] transition">
                {language === 'EN' ? item.name : item.nameAm}
              </h3>
              <p className="text-gray-500 text-xs mb-6 flex-grow">
                {language === 'EN' ? item.description : item.descriptionAm}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-black text-[#006341]">
                  {item.price}<span className="text-xs ml-1">ETB</span>
                </span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-[#006341] text-white p-3 rounded-xl hover:bg-[#004d32] transition shadow-lg active:scale-95 flex items-center gap-2 font-bold px-4 text-sm"
                >
                  <ShoppingCart size={16} /> {t.addToCart}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto animate-in fade-in duration-500">
        <button onClick={() => setSelectedPost(null)} className="mb-8 flex items-center gap-2 font-bold text-[#006341]">
          <ChevronRight className="rotate-180" size={18} /> Back to Blog
        </button>
        <img src={selectedPost.imageUrl} className="w-full h-80 object-cover rounded-3xl shadow-xl mb-8" />
        <h1 className="font-heading text-4xl font-bold mb-4">{language === 'EN' ? selectedPost.title : selectedPost.titleAm}</h1>
        <div className="prose max-w-none text-gray-600">
          <p>{selectedPost.content}</p>
          <p className="mt-4">Explore the deep traditions and culture that make Ethiopian coffee a global phenomenon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-in fade-in duration-500">
      <h1 className="font-heading text-5xl font-bold mb-16 text-center">{t.latestBlogs}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {MOCK_BLOGS.map(post => (
          <div key={post.id} className="group cursor-pointer" onClick={() => setSelectedPost(post)}>
            <img src={post.imageUrl} className="w-full h-64 object-cover rounded-3xl mb-6 shadow-md transition-transform group-hover:scale-[1.02]" />
            <h3 className="font-heading text-2xl font-bold mb-3">{language === 'EN' ? post.title : post.titleAm}</h3>
            <p className="text-gray-500 mb-6">{language === 'EN' ? post.excerpt : post.excerptAm}</p>
            <button className="flex items-center gap-2 font-bold text-[#006341]">{t.readMore} <ChevronRight size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage: React.FC<{ language: Language }> = ({ language }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="py-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <span className="text-[#006341] font-black uppercase tracking-widest text-sm block">{t.story}</span>
          <h1 className="font-heading text-6xl font-bold leading-tight">Founded on Tradition, Roasted with Passion</h1>
          <p className="text-xl text-gray-500">EthioBrew started in the heart of Addis Ababa to bring authentic coffee rituals to the digital age. We work directly with smallholder farmers to ensure every cup tells a story of heritage and quality.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000" className="rounded-[40px] shadow-2xl" />
      </div>
    </div>
  );
};

const Contact: React.FC<{ language: Language }> = ({ language }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-in fade-in">
      <h1 className="font-heading text-5xl font-bold mb-16 text-center">{t.contact}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h3 className="text-2xl font-bold">Visit Our Roastery</h3>
          <p className="text-gray-500">Bole Road, Addis Ababa, Ethiopia. Experience the aroma firsthand.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4"><MapPin className="text-[#006341]" /> <span>Addis Ababa, Ethiopia</span></div>
            <div className="flex items-center gap-4"><Phone className="text-[#006341]" /> <span>+251 911 123 456</span></div>
          </div>
        </div>
        <form className="p-8 rounded-3xl shadow-xl space-y-4 bg-white border border-gray-50">
          <input type="text" placeholder="Name" className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#006341] transition-all" />
          <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-xl border outline-none focus:ring-2 focus:ring-[#006341] transition-all"></textarea>
          <button className="w-full bg-[#006341] text-white py-4 rounded-xl font-bold hover:bg-[#004d32] transition">Send Message</button>
        </form>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC<{ 
  language: Language, 
  cart: CartItem[], 
  total: number, 
  onOrderComplete: (order: Order) => void 
}> = ({ language, cart, total, onOrderComplete }) => {
  const t = TRANSLATIONS[language];
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Telebirr' | 'CBE' | 'Stripe'>('Telebirr');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setScreenshot(file);
      setUploaded(false);
    }
  };

  const simulateUpload = () => {
    if (!screenshot) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((paymentMethod === 'Telebirr' || paymentMethod === 'CBE') && !uploaded) {
      alert(language === 'EN' ? 'Please upload a payment screenshot first.' : 'እባክዎ የክፍያ ማረጋገጫውን መጀመሪያ ይጫኑ።');
      return;
    }
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: 'user-1',
      items: cart,
      totalPrice: total,
      deliveryAddress: `${address} (Phone: ${phone})`,
      paymentMethod,
      paymentScreenshotUrl: screenshot ? URL.createObjectURL(screenshot) : undefined,
      status: 'Awaiting Confirmation',
      paid: false,
      createdAt: new Date().toISOString()
    };
    onOrderComplete(newOrder);
  };

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto animate-in slide-in-from-bottom-4">
      <h1 className="font-heading text-4xl font-bold mb-12 text-center">{t.checkout}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2"><MapPin size={20} className="text-[#006341]" /> {t.delivery}</h3>
            <input required value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder={t.address} className="w-full p-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-[#006341]" />
            <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder={t.phone} className="w-full p-4 rounded-2xl border transition-all outline-none focus:ring-2 focus:ring-[#006341]" />
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><CreditCard size={20} className="text-[#006341]" /> {t.paymentMethod}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Telebirr', icon: Smartphone, label: 'Telebirr' },
                { id: 'CBE', icon: Landmark, label: 'CBE Bank' },
                { id: 'Stripe', icon: CreditCard, label: 'Card' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { setPaymentMethod(m.id as any); setUploaded(false); setScreenshot(null); }}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === m.id ? 'border-[#006341] bg-green-50' : 'border-gray-100'}`}
                >
                  <m.icon size={20} className={paymentMethod === m.id ? 'text-[#006341]' : 'text-gray-400'} />
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>
            
            {(paymentMethod === 'Telebirr' || paymentMethod === 'CBE') && (
              <div className="p-6 rounded-2xl border border-dashed space-y-4 animate-in fade-in transition-colors bg-gray-50 border-gray-200">
                <div className="text-sm text-gray-500 font-medium">
                  {t.paymentInstructions}
                </div>
                <div className="bg-white p-4 rounded-xl text-center border">
                  <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">{paymentMethod === 'Telebirr' ? 'Telebirr Phone' : 'CBE Account'}</div>
                  <div className="text-xl font-mono font-bold tracking-wider">{paymentMethod === 'Telebirr' ? PAYMENT_DETAILS.telebirr : PAYMENT_DETAILS.cbeAccount}</div>
                </div>
                
                <div className="space-y-3">
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="screenshot-upload" />
                    <label 
                      htmlFor="screenshot-upload"
                      className={`w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${screenshot ? 'border-[#006341] text-[#006341]' : 'border-gray-300 text-gray-400 hover:border-[#FFD700]'}`}
                    >
                      {screenshot ? <ImageIcon size={20} /> : <Upload size={20} />}
                      <span className="text-sm font-bold truncate max-w-[200px]">{screenshot ? screenshot.name : t.uploadProof}</span>
                    </label>
                  </div>
                  
                  {screenshot && !uploaded && (
                    <button 
                      type="button" 
                      onClick={simulateUpload}
                      disabled={uploading}
                      className="w-full bg-[#4B2C20] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-[#3d241a] transition flex items-center justify-center gap-2"
                    >
                      {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload size={16} />}
                      {uploading ? 'Uploading...' : 'Confirm Upload'}
                    </button>
                  )}

                  {uploaded && (
                    <div className="flex items-center justify-center gap-2 text-[#006341] bg-green-50 py-3 rounded-xl border border-[#006341]">
                      <CheckCircle size={18} />
                      <span className="text-sm font-bold">Screenshot Uploaded!</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-[#006341] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#004d32] transition shadow-xl active:scale-95 disabled:opacity-50">
            {t.confirmPayment}
          </button>
        </form>

        <div>
          <div className="p-8 rounded-[32px] shadow-xl border bg-white border-gray-100">
            <h3 className="text-xl font-bold mb-6">{t.summary}</h3>
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold">{item.quantity}x</span>
                    <span className="text-sm font-medium text-gray-600">{language === 'EN' ? item.name : item.nameAm}</span>
                  </div>
                  <span className="font-bold">{(item.price * item.quantity).toLocaleString()} ETB</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-6 flex justify-between items-center text-2xl font-black">
              <span>{t.total}</span>
              <span className="text-[#006341]">{total.toLocaleString()} ETB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<Language>('EN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState<Order | null>(null);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const addToCart = (item: CoffeeItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  if (orderComplete) {
    return (
      <Layout language={language} setLanguage={setLanguage} cartCount={cartCount} toggleCart={() => setIsCartOpen(!isCartOpen)} currentPage={currentPage} setCurrentPage={setCurrentPage}>
        <div className="min-h-[70vh] flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} /></div>
            <h2 className="font-heading text-3xl font-bold mb-4">Order Received!</h2>
            <p className="text-gray-500 mb-8">Thank you for choosing EthioBrew. Order <strong>#{orderComplete.id}</strong> is {orderComplete.paid ? 'being prepared' : 'awaiting confirmation'}. We will reach out to you shortly.</p>
            <button onClick={() => { setOrderComplete(null); setCart([]); setCurrentPage('home'); }} className="w-full bg-[#006341] text-white py-4 rounded-xl font-bold active:scale-95 shadow-lg">Back to Home</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout language={language} setLanguage={setLanguage} cartCount={cartCount} toggleCart={() => setIsCartOpen(!isCartOpen)} currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'home' && <Home language={language} setPage={setCurrentPage} />}
      {currentPage === 'menu' && <MenuPage language={language} addToCart={addToCart} />}
      {currentPage === 'blog' && <BlogPage language={language} />}
      {currentPage === 'about' && <AboutPage language={language} />}
      {currentPage === 'contact' && <Contact language={language} />}
      {currentPage === 'checkout' && <CheckoutPage language={language} cart={cart} total={cartTotal} onOrderComplete={setOrderComplete} />}
      
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white text-gray-900 shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2"><ShoppingCart size={24} className="text-[#006341]" /> {TRANSLATIONS[language].cart} ({cartCount})</h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? <div className="text-center py-20 opacity-30"><Coffee size={64} className="mx-auto mb-4" /><p>Cart is empty</p></div> : 
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                    <div className="flex-grow">
                      <div className="flex justify-between font-bold text-sm"><span>{language === 'EN' ? item.name : item.nameAm}</span><button onClick={() => removeFromCart(item.id)}><X size={14}/></button></div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-bold">-</button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-bold">+</button>
                        </div>
                        <span className="font-bold text-sm">{item.price * item.quantity} ETB</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-xl font-black"><span>Total</span><span className="text-[#006341]">{cartTotal} ETB</span></div>
                <button onClick={() => { setIsCartOpen(false); setCurrentPage('checkout'); }} className="w-full bg-[#4B2C20] text-white py-4 rounded-2xl font-black active:scale-95 shadow-lg">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
