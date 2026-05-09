import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Award, Coffee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FDFCF8]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#4B2C20]/5 rounded-l-[120px] -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#006341]/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Directly from Ethiopian Farmers</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-[#4B2C20] leading-[0.9]">
            {t('hero.title') || 'Pure Essence of Ethiopia'}
          </h1>
          
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            {t('hero.subtitle') || 'Experience the birthplace of coffee through our expertly curated, single-origin beans roasted to perfection.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <button 
              onClick={() => navigate('/shop')}
              className="bg-[#006341] text-white px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl hover:bg-[#004d32] hover:scale-105 transition active:scale-95"
             >
               {t('hero.cta_shop') || 'Shop Now'} <ShoppingBag size={20} />
             </button>
             <button 
              onClick={() => navigate('/about')}
              className="bg-white text-[#4B2C20] border-2 border-[#4B2C20]/10 px-10 py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
             >
               {t('hero.cta_learn') || 'Our Story'} <ArrowRight size={20} />
             </button>
          </div>

          <div className="flex items-center gap-8 pt-10">
             <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
             </div>
             <div>
                <div className="flex text-[#FFD700] gap-0.5">
                   <Star size={16} fill="currentColor" />
                   <Star size={16} fill="currentColor" />
                   <Star size={16} fill="currentColor" />
                   <Star size={16} fill="currentColor" />
                   <Star size={16} fill="currentColor" />
                </div>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">Trusted by 2,000+ Coffee Lovers</p>
             </div>
          </div>
        </motion.div>

        {/* Right Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Main Image Container */}
          <div className="relative z-10 rounded-[64px] overflow-hidden shadow-2xl border-[12px] border-white rotate-3">
             <img 
               src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000" 
               className="w-full aspect-[4/5] object-cover"
               alt="Ethiopian Coffee" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#4B2C20]/40 to-transparent" />
          </div>

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 z-20 bg-white p-6 rounded-[32px] shadow-2xl border border-gray-100 flex items-center gap-4"
          >
             <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#4B2C20]">
                <Award size={24} />
             </div>
             <div>
                <p className="font-black text-sm">Award Winning</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Roast of the Year</p>
             </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 z-20 bg-[#4B2C20] p-6 rounded-[32px] shadow-2xl text-white flex items-center gap-4"
          >
             <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#4B2C20]">
                <Coffee size={24} />
             </div>
             <div>
                <p className="font-black text-sm">100% Organic</p>
                <p className="text-[10px] text-white/50 font-bold uppercase">Grown in Highlands</p>
             </div>
          </motion.div>

          {/* Abstract Shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4B2C20]/5 rounded-full -z-10 animate-pulse" />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
