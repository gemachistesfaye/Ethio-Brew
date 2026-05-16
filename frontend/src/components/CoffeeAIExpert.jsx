import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, Sparkles, ArrowRight, RotateCcw, 
  Flame, Leaf, Droplets, Zap 
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const steps = [
  {
    id: 'roast',
    question: 'How do you like your beans roasted?',
    options: [
      { id: 'Light', label: 'Light', desc: 'Fruity & Floral', icon: <Leaf /> },
      { id: 'Medium', label: 'Medium', desc: 'Balanced & Sweet', icon: <Coffee /> },
      { id: 'Dark', label: 'Dark', desc: 'Bold & Smoky', icon: <Flame /> }
    ]
  },
  {
    id: 'flavor',
    question: 'Which flavor profile excites you most?',
    options: [
      { id: 'Fruity', label: 'Fruity', desc: 'Berries & Citrus', icon: <Droplets /> },
      { id: 'Floral', label: 'Floral', desc: 'Jasmine & Tea-like', icon: <Sparkles /> },
      { id: 'Chocolatey', label: 'Chocolatey', desc: 'Cocoa & Nutty', icon: <Zap /> }
    ]
  },
  {
    id: 'method',
    question: 'Your preferred brewing method?',
    options: [
      { id: 'Ceremony', label: 'Ceremony', desc: 'Traditional Jebena', icon: <Coffee /> },
      { id: 'Filter', label: 'Filter', desc: 'Pour-over / V60', icon: <Droplets /> },
      { id: 'Espresso', label: 'Espresso', desc: 'Machine / Moka', icon: <Zap /> }
    ]
  }
];

const CoffeeAIExpert = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { language } = useTranslation();

  const handleSelect = (stepId, optionId) => {
    const updated = { ...selections, [stepId]: optionId };
    setSelections(updated);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendation(updated);
    }
  };

  const generateRecommendation = async (finalSelections) => {
    setLoading(true);
    try {
      const prompt = `Based on these preferences: Roast: ${finalSelections.roast}, Flavor: ${finalSelections.flavor}, Method: ${finalSelections.method}. 
      Suggest the best Ethiopian coffee bean (Yirgacheffe, Sidamo, Harar, Guji, or Jimma) and explain why in a premium professional way.`;
      
      const res = await fetch(`${API_URL}/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt, language })
      });
      const data = await res.json();
      setRecommendation(data.response);
    } catch (err) {
      setRecommendation("I recommend our Guji Highland Special. Its complex peach and black tea notes match your preference for quality and tradition.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setRecommendation(null);
  };

  return (
    <div className="bg-[#4B2C20] py-24 px-4 rounded-[64px] text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/coffee-beans.png')]" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {!recommendation && !loading && (
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[#FFD700] font-bold uppercase tracking-[0.3em] text-xs">AI Sommelier</span>
              <h2 className="text-4xl md:text-6xl font-black">{steps[currentStep].question}</h2>
              <div className="flex justify-center gap-2">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'w-12 bg-[#FFD700]' : 'w-4 bg-white/20'}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps[currentStep].options.map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ y: -10, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(steps[currentStep].id, opt.id)}
                  className="bg-white/5 border border-white/10 p-10 rounded-[40px] text-center space-y-4 transition-colors"
                >
                  <div className="w-16 h-16 bg-[#FFD700] text-[#4B2C20] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    {React.cloneElement(opt.icon, { size: 32 })}
                  </div>
                  <div>
                    <p className="text-xl font-bold">{opt.label}</p>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-widest">{opt.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="py-20 space-y-8 animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 bg-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto relative">
                <Coffee size={48} className="text-[#FFD700] animate-bounce" />
                <div className="absolute inset-0 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
             </div>
             <h3 className="text-2xl font-bold italic tracking-wide">AI is analyzing your palate...</h3>
          </div>
        )}

        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <Sparkles size={48} className="text-[#FFD700] mx-auto" />
              <h2 className="text-4xl md:text-6xl font-black">Your Perfect Match</h2>
            </div>
            
            <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[48px] text-left relative">
               <div className="absolute top-10 right-10 opacity-10"><Coffee size={120} /></div>
               <p className="text-xl md:text-2xl leading-relaxed font-medium text-amber-50">
                  {recommendation}
               </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <button className="bg-[#FFD700] text-[#4B2C20] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition shadow-2xl flex items-center justify-center gap-3">
                  Shop Recommendation <ArrowRight />
               </button>
               <button 
                onClick={reset}
                className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition flex items-center justify-center gap-3"
               >
                  Start Over <RotateCcw size={20} />
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoffeeAIExpert;
