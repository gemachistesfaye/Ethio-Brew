import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ShieldCheck, Leaf, Zap, Award } from 'lucide-react';
import { Star } from 'lucide-react';
import { MOCK_COFFEE } from '../constants';

const RecommendationEngine = ({ onProductClick }) => {
  const { t } = useTranslation();
  const recommendations = MOCK_COFFEE.filter(p => p.rating >= 4.8).slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#FFD700] rounded-lg text-[#4B2C20]"><Zap size={20} fill="currentColor" /></div>
          <h2 className="text-2xl font-bold">Recommended for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map(p => (
            <div key={p.id} onClick={() => onProductClick(p)} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition cursor-pointer group">
              <img src={p.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition" />
              <p className="text-[10px] text-[#006341] font-bold uppercase mb-1">{p.origin}</p>
              <h4 className="font-bold text-lg mb-4">{p.name}</h4>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#4B2C20]">{p.price} ETB</span>
                <span className="flex items-center gap-1 text-xs font-bold text-[#DAA520]"><Star size={14} fill="currentColor"/> {p.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ setPage, onProductClick }) => {
  const { t } = useTranslation();
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
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage('menu')} className="bg-[#006341] text-white px-8 py-4 rounded-full font-bold hover:bg-[#004d32] transition shadow-lg flex items-center gap-2">
                {t('hero.orderNow')} <ChevronRight size={18} />
              </button>
              <button onClick={() => setPage('subscription')} className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                {t('hero.joinClub')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <RecommendationEngine onProductClick={onProductClick} />

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

export default Home;
