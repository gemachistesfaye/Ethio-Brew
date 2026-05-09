import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { STORIES } from '../data/stories';
import { Clock, BookOpen, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const StoriesPage = () => {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('stories.title')}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4B2C20] mt-4 mb-6">{t('stories.subtitle')}</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {STORIES.map((story, i) => {
             const title = language === 'am' ? story.title_am : language === 'om' ? story.title_om : story.title;
             const tag = language === 'am' ? story.tag_am : language === 'om' ? story.tag_om : story.tag;
             const readTime = language === 'am' ? story.readTime_am : language === 'om' ? story.readTime_om : story.readTime;
             const shortDesc = language === 'am' ? story.shortDesc_am : language === 'om' ? story.shortDesc_om : story.shortDesc;

             return (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={story.image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-6 left-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg ${story.tagColor}`}>
                      {tag}
                    </span>
                  </div>
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Clock size={14} /> {readTime}
                  </div>
                  <h3 className="text-2xl font-bold text-[#4B2C20] mb-4 leading-tight group-hover:text-[#006341] transition">{title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-grow">{shortDesc}</p>
                  <button className="flex items-center gap-2 text-[#006341] font-bold group-hover:gap-4 transition-all">
                    {t('stories.read_more')} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
