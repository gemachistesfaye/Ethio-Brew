import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, MapPin, Users, History, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const AboutPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: 'The Kaldi Legend',
      icon: <History className="text-[#006341]" size={32} />,
      content: 'The journey of coffee began in the 9th century in the highlands of Ethiopia. Kaldi, a goat herder, noticed his flock dancing after eating bright red berries. This discovery sparked a global phenomenon that started right here in our soil.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'The Sacred Ceremony',
      icon: <Coffee className="text-[#4B2C20]" size={32} />,
      content: 'The Buna Ceremony is more than just drinking coffee; it is a spiritual and social gathering. From the roasting of green beans on a flat pan (Mitad) to the three rounds of pouring (Abol, Tona, Baraka), it is the heartbeat of Ethiopian hospitality.',
      image: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Empowering Farmers',
      icon: <Users className="text-[#FFD700]" size={32} />,
      content: 'Ethio-Brew works directly with smallholder farmers in Yirgacheffe, Sidama, and Harar. We ensure fair trade practices and support sustainable organic farming, preserving the heritage of the world’s finest Arabica beans.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Coffee farm"
        />
        <div className="absolute inset-0 bg-[#4B2C20]/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-6">
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
           >
             Our Heritage
           </motion.h1>
           <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             From the birthplace of coffee to your cup, we preserve the ancient traditions of Ethiopia.
           </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-32">
        {sections.map((section, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
            <div className="flex-1 space-y-8">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  {section.icon}
               </div>
               <h2 className="text-4xl font-black text-[#4B2C20]">{section.title}</h2>
               <p className="text-lg text-gray-600 leading-relaxed font-medium italic">
                 {section.content}
               </p>
               <button className="flex items-center gap-3 text-[#006341] font-black group">
                  Discover More <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </div>
            <div className="flex-1 w-full">
               <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-video md:aspect-square">
                  <img src={section.image} className="w-full h-full object-cover hover:scale-110 transition duration-700" alt={section.title} />
               </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
