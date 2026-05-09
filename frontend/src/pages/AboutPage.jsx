import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Leaf, Users, ShieldCheck, Heart, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { t } = useTranslation();

  const values = [
    { icon: <Leaf className="text-[#006341]" />, title: t('about.v1_title'), desc: t('about.v1_desc') },
    { icon: <ShieldCheck className="text-[#006341]" />, title: t('about.v2_title'), desc: t('about.v2_desc') },
    { icon: <Users className="text-[#006341]" />, title: t('about.v3_title'), desc: t('about.v3_desc') },
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden bg-[#4B2C20]">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Coffee Highlands"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#FFD700] font-bold uppercase tracking-widest text-sm"
          >
            {t('nav.about')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mt-6 mb-8"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-amber-50/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#006341]/5 rounded-full blur-3xl" />
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[40px] shadow-2xl relative z-10"
                  alt="Traditional Ceremony"
                />
                <div className="absolute -bottom-10 -right-10 bg-[#FFD700] p-8 rounded-[32px] shadow-xl z-20 hidden md:block">
                   <p className="text-[#4B2C20] font-black text-4xl mb-1">100%</p>
                   <p className="text-[#4B2C20]/60 font-bold text-xs uppercase tracking-widest">Ethically Sourced</p>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('about.our_story')}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#4B2C20] leading-tight">{t('about.q1.title')}</h2>
            <p className="text-gray-500 text-lg leading-loose">
               {t('about.q1.content')}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
               <div className="flex items-start gap-4">
                  <div className="bg-[#006341]/10 p-3 rounded-2xl text-[#006341]"><Heart size={24} /></div>
                  <div>
                     <p className="font-bold text-gray-900">Fair Wages</p>
                     <p className="text-sm text-gray-400">Direct trade model</p>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="bg-[#006341]/10 p-3 rounded-2xl text-[#006341]"><Globe size={24} /></div>
                  <div>
                     <p className="font-bold text-gray-900">Sustainable</p>
                     <p className="text-sm text-gray-400">Eco-friendly farming</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-4 bg-[#FDFCF8] border-y border-gray-100">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('about.values')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#4B2C20]">Our Foundational Values</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-12 rounded-[48px] shadow-sm border border-gray-50 hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-[#006341]/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                {v.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#4B2C20] mb-4">{v.title}</h3>
              <p className="text-gray-500 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Questions List (FAQ style) */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('about.mission')}</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#4B2C20]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-12">
            {[2, 3, 4].map(num => (
              <div key={num} className="bg-[#FDFCF8] p-10 rounded-[32px] border border-gray-50">
                <h3 className="text-2xl font-bold text-[#006341] mb-4 flex items-center gap-4">
                   <div className="w-8 h-8 bg-[#006341] text-white rounded-full flex items-center justify-center text-sm font-black">{num}</div>
                   {t(`about.q${num}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg pl-12">
                   {t(`about.q${num}.content`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
         <div className="max-w-7xl mx-auto bg-[#006341] rounded-[64px] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="relative z-10">
               <Award size={48} className="text-[#FFD700] mx-auto mb-8" />
               <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Experience the Origin</h2>
               <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12">Join us in celebrating the birthplace of coffee and the farmers who make it possible.</p>
               <button className="bg-[#FFD700] text-[#4B2C20] px-12 py-5 rounded-2xl font-black hover:scale-105 transition shadow-2xl">
                  Shop Our Collection
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
