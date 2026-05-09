import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRight, ShieldCheck, Leaf, Zap, Award, X, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Star } from 'lucide-react';
import { MOCK_COFFEE } from '../constants';
import { STORIES } from '../data/stories';
import { AnimatePresence, motion } from 'framer-motion';

const RecommendationEngine = ({ onProductClick }) => {
  const { t, language } = useTranslation();
  const recommendations = MOCK_COFFEE.filter(p => p.rating >= 4.8).slice(0, 3);
  
  return (
    <section className="py-20 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#FFD700] rounded-lg text-[#4B2C20]"><Zap size={20} fill="currentColor" /></div>
          <h2 className="text-2xl font-bold">{t('home.recommended')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendations.map(p => {
            const name = language === 'am' ? p.name_am : language === 'om' ? p.name_om : p.name;
            return (
              <div key={p.id} onClick={() => onProductClick(p)} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition cursor-pointer group">
                <img src={p.imageUrl} className="w-full h-48 object-cover rounded-2xl mb-4 group-hover:scale-105 transition" />
                <p className="text-[10px] text-[#006341] font-bold uppercase mb-1">{p.origin}</p>
                <h4 className="font-bold text-lg mb-4">{name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#4B2C20]">{p.price} ETB</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#DAA520]"><Star size={14} fill="currentColor"/> {p.rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StoryModal = ({ story, onClose }) => {
  const { language } = useTranslation();
  
  useEffect(() => {
    if (story) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [story]);

  if (!story) return null;

  const title = language === 'am' ? story.title_am : language === 'om' ? story.title_om : story.title;
  const tag = language === 'am' ? story.tag_am : language === 'om' ? story.tag_om : story.tag;
  const readTime = language === 'am' ? story.readTime_am : language === 'om' ? story.readTime_om : story.readTime;
  const content = language === 'am' ? (story.fullStory_am || story.fullStory) : language === 'om' ? (story.fullStory_om || story.fullStory) : story.fullStory;

  return (
  <AnimatePresence>
    {story && (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="relative h-56 flex-shrink-0">
            <img src={story.image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition">
              <X size={20} />
            </button>
            <div className="absolute bottom-6 left-6">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${story.tagColor}`}>{tag}</span>
              <h2 className="text-2xl font-extrabold text-white mt-2">{title}</h2>
              <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                <Clock size={12} /> {readTime}
              </div>
            </div>
          </div>
          <div className="p-8 overflow-y-auto">
            {content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base"
                dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
};


const Home = ({ setPage, onProductClick }) => {
  const { t, language } = useTranslation();
  const [activeStory, setActiveStory] = useState(null);
  const featuredStories = STORIES.slice(0, 3);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover scale-105"
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

      {/* Trust Badges */}
      <section className="py-12 bg-[#FDFCF8] border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck className="text-[#006341]"/>, key: "secure" },
            { icon: <Leaf className="text-[#006341]"/>, key: "trade" },
            { icon: <Zap className="text-[#006341]"/>, key: "delivery" },
            { icon: <Award className="text-[#006341]"/>, key: "grades" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl shadow-sm">{item.icon}</div>
              <span className="font-bold text-sm text-gray-700">{t(`home.badges.${item.key}`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Coffees */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('home.regions.title')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">{t('home.regions.subtitle')}</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Yirgacheffe', key: 'yirgacheffe_note', img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800' },
            { name: 'Sidamo', key: 'sidamo_note', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800' },
            { name: 'Harrar', key: 'harrar_note', img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800' }
          ].map((region, i) => (
            <div key={i} className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer" onClick={() => setPage('menu')}>
              <img src={region.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">{t(`home.regions.${region.key}`)}</p>
                <h3 className="text-2xl font-bold">{region.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
               <div className="inline-block px-4 py-1.5 bg-[#FFD700] rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
                  The Legend
               </div>
               <h2 className="text-4xl md:text-6xl font-black text-[#4B2C20] mb-8 leading-tight">
                  The Soul of <br/> <span className="text-[#006341]">Ethiopia</span> in Every Sip
               </h2>
               <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10 italic">
                  "From the highlands of Guji to the ancient ceremonies of Addis Ababa, coffee is more than a drink—it is our history, our hospitality, and our heartbeat."
               </p>
               <button onClick={() => setPage('stories')} className="px-10 py-5 bg-[#4B2C20] text-white rounded-[24px] font-black text-sm shadow-2xl hover:scale-105 transition-all flex items-center gap-3 group">
                  Read the Legend <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex-1 relative"
            >
               <div className="absolute -inset-4 bg-[#006341]/5 rounded-[60px] -rotate-3" />
               <img 
                 src="https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800" 
                 className="relative w-full rounded-[48px] shadow-2xl rotate-3 hover:rotate-0 transition duration-700" 
                 alt="Traditional Ceremony" 
               />
            </motion.div>
         </div>
      </section>

      {/* Featured Coffee Stories */}
      <section className="py-20 px-4 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('stories.title')}</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">{t('home.featured_stories')}</h2>
            </div>
            <button onClick={() => setPage('stories')} className="hidden md:flex items-center gap-2 text-[#4B2C20] font-bold hover:text-[#006341] transition">
              {t('home.view_all')} <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStories.map((story) => {
              const title = language === 'am' ? story.title_am : language === 'om' ? story.title_om : story.title;
              const tag = language === 'am' ? story.tag_am : language === 'om' ? story.tag_om : story.tag;
              const readTime = language === 'am' ? story.readTime_am : language === 'om' ? story.readTime_om : story.readTime;
              const shortDesc = language === 'am' ? story.shortDesc_am : language === 'om' ? story.shortDesc_om : story.shortDesc;
              
              return (
                <div key={story.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col border border-gray-100">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={story.image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${story.tagColor}`}>
                      {tag}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-3">
                      <Clock size={13} /> {readTime}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{shortDesc}</p>
                    <button
                      onClick={() => setActiveStory(story)}
                      className="self-start flex items-center gap-2 px-6 py-3 bg-[#006341] text-white rounded-xl font-bold text-sm hover:bg-[#004d32] transition"
                    >
                      <BookOpen size={14} /> {t('stories.read_more')} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setPage('stories')} className="w-full mt-8 py-4 bg-gray-100 rounded-xl font-bold text-[#4B2C20] md:hidden">
            {t('home.view_all')}
          </button>
        </div>
      </section>

      <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
    </div>
  );
};

export default Home;
