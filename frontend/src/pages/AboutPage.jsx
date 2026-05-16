import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#006341]" />
        <div className="relative z-10 text-center px-6 mt-12">
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#FFD700] mb-6"
           >
             {t('about.title')}
           </motion.h1>
           <p className="text-white/90 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             {t('about.subtitle')}
           </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
        {[1, 2, 3, 4].map((num) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={num} 
            className="bg-white p-10 md:p-14 rounded-[40px] shadow-xl border border-gray-100 hover:shadow-2xl transition duration-500"
          >
             <h2 className="text-3xl font-black text-[#4B2C20] mb-6">{t(`about.q${num}.title`)}</h2>
             <p className="text-lg text-gray-600 leading-relaxed font-medium">
               {t(`about.q${num}.content`)}
             </p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
