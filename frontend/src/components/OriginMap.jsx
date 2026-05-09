import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Coffee, MapPin, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const regions = [
  { 
    id: 'yirgacheffe', 
    name: 'Yirgacheffe', 
    pos: { top: '65%', left: '48%' }, 
    profile: 'Floral, Jasmine, Citric', 
    altitude: '1,700 - 2,200m',
    process: 'Washed / Natural',
    image: 'https://images.unsplash.com/photo-1524350303359-8663f557558b?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'sidamo', 
    name: 'Sidamo', 
    pos: { top: '70%', left: '55%' }, 
    profile: 'Fruity, Berry-like, Complex', 
    altitude: '1,500 - 2,200m',
    process: 'Washed / Natural',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'harar', 
    name: 'Harar', 
    pos: { top: '35%', left: '75%' }, 
    profile: 'Winey, Wild, Blueberries', 
    altitude: '1,400 - 2,000m',
    process: 'Natural (Sun-dried)',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600'
  },
  { 
    id: 'jimma', 
    name: 'Jimma', 
    pos: { top: '55%', left: '35%' }, 
    profile: 'Nutty, Cocoa, Low Acidity', 
    altitude: '1,300 - 1,800m',
    process: 'Natural / Washed',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
  }
];

const OriginMap = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  return (
    <div className="bg-[#121212] py-24 px-4 rounded-[64px] overflow-hidden relative border border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Interactive Map */}
        <div className="relative aspect-square max-w-[600px] mx-auto bg-white/5 rounded-[48px] p-10 border border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            
            {/* Ethiopia SVG Outline (Simplified/Abstract) */}
            <svg viewBox="0 0 500 400" className="w-full h-full text-white/10 fill-current drop-shadow-2xl">
              <path d="M150,50 L350,30 L450,150 L400,350 L100,380 L50,200 Z" />
            </svg>

            {/* Region Pins */}
            {regions.map((reg) => (
              <motion.button
                key={reg.id}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelected(reg)}
                style={{ top: reg.pos.top, left: reg.pos.left }}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all ${selected?.id === reg.id ? 'bg-[#FFD700] text-[#121212] z-30 shadow-[0_0_30px_rgba(255,215,0,0.5)]' : 'bg-white/20 text-white hover:bg-white/40 z-20'}`}
              >
                <MapPin size={16} fill="currentColor" />
                <span className="absolute top-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest opacity-50">{reg.name}</span>
              </motion.button>
            ))}

            <div className="absolute bottom-10 left-10">
               <h3 className="text-white font-bold text-xl mb-2 italic">Discovery Map</h3>
               <p className="text-white/40 text-xs uppercase tracking-tighter">Click a pin to explore origins</p>
            </div>
        </div>

        {/* Right Side: Region Details */}
        <div className="min-h-[500px] flex flex-col justify-center">
           <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#121212]"><Coffee size={24} /></div>
                     <h2 className="text-5xl font-black text-white">{selected.name}</h2>
                  </div>
                  
                  <img src={selected.image} className="w-full h-64 object-cover rounded-[32px] shadow-2xl border border-white/10" alt={selected.name} />
                  
                  <div className="grid grid-cols-2 gap-6">
                     <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[#FFD700] text-xs font-bold uppercase mb-1">Flavor Profile</p>
                        <p className="text-white font-medium">{selected.profile}</p>
                     </div>
                     <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[#FFD700] text-xs font-bold uppercase mb-1">Altitude</p>
                        <p className="text-white font-medium">{selected.altitude}</p>
                     </div>
                     <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                        <p className="text-[#FFD700] text-xs font-bold uppercase mb-1">Processing</p>
                        <p className="text-white font-medium">{selected.process}</p>
                     </div>
                  </div>

                  <button className="w-full py-5 bg-[#FFD700] text-[#121212] rounded-2xl font-black text-lg hover:scale-[1.02] transition shadow-xl">
                    Shop {selected.name} Beans
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 border-2 border-dashed border-white/10 rounded-[48px]"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
                     <Info size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 italic">Select a region to start your journey</h3>
                  <p className="text-white/40 max-w-sm mx-auto">Discover the unique flavor profiles that make Ethiopia the birthplace of coffee.</p>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default OriginMap;
