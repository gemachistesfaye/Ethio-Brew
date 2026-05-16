import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, Tag, ChevronRight, X, Calendar, User, Heart } from 'lucide-react';
import { STORIES } from '../data/stories';
import { useTranslation } from '../hooks/useTranslation';

const BlogPage = () => {
  const { t, language } = useTranslation();
  const [activeStory, setActiveStory] = useState(null);
  const [filter, setFilter] = useState('All');

  const posts = [
    {
      id: 'b1',
      title: 'How to Brew the Perfect Jebena Buna',
      excerpt: 'Master the traditional Ethiopian clay pot brewing method at home with these simple steps.',
      fullStory: 'The **Jebena** is the heart of Ethiopian coffee culture. To brew the perfect cup, start by roasting fresh green beans until they are dark and oily. Grind them finely and add to the Jebena with water. Let it boil three times—this is the secret to the rich, intense flavor that makes Jebena Buna unique.',
      author: 'Abebe Bikila',
      date: 'May 9, 2026',
      readTime: '8 min read',
      category: 'Brewing',
      image: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800',
      type: 'Blog'
    },
    {
      id: 'b2',
      title: 'Light vs Dark Roast: Which is Best for You?',
      excerpt: 'Understanding the flavor profiles of different roast levels and how they impact your caffeine intake.',
      fullStory: 'Light roasts preserve the unique **terroir** of the bean, offering floral and acidic notes. Dark roasts, on the other hand, bring out bold, smoky, and chocolatey flavors. In Ethiopia, we often prefer a medium-dark roast that balances the bean\'s natural fruitiness with the richness of the roast.',
      author: 'Selam Tesfaye',
      date: 'May 8, 2026',
      readTime: '5 min read',
      category: 'Coffee 101',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
      type: 'Blog'
    },
    {
      id: 'b3',
      title: 'Sustainable Sourcing in the Oromia Region',
      excerpt: 'How Ethio-Brew is partnering with local cooperatives to ensure the future of organic coffee.',
      fullStory: 'Sustainability is not just a buzzword; it is a way of life for Ethiopian farmers. By working directly with **Oromia** cooperatives, we ensure that farmers receive premium prices while maintaining organic farming practices that protect Abyssinia\'s rich biodiversity.',
      author: 'Gemachis Tesfaye',
      date: 'May 6, 2026',
      readTime: '10 min read',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
      type: 'Blog'
    }
  ];

  const allItems = [
    ...posts,
    ...STORIES.map(s => ({ ...s, type: 'Story', category: s.tag }))
  ];

  const filteredItems = allItems.filter(item => filter === 'All' || item.type === filter);

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-[#4B2C20] mb-6 tracking-tight"
           >
             Blog
           </motion.h1>
           <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
             The soul of Ethiopia through heritage legends, brewing guides, and community stories.
           </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-16">
          {['All', 'Story', 'Blog'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-2xl font-black text-sm transition ${filter === f ? 'bg-[#006341] text-white shadow-xl' : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'}`}
            >
              {f === 'All' ? 'Everything' : f + 's'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => {
                const title = language === 'am' ? item.title_am || item.title : language === 'om' ? item.title_om || item.title : item.title;
                const excerpt = language === 'am' ? item.shortDesc_am || item.excerpt : language === 'om' ? item.shortDesc_om || item.excerpt : item.shortDesc || item.excerpt;
                const readTime = language === 'am' ? item.readTime_am || item.readTime : language === 'om' ? item.readTime_om || item.readTime : item.readTime;

                return (
                  <motion.article 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col group cursor-pointer bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-2xl transition-all p-4"
                    onClick={() => setActiveStory(item)}
                  >
                      <div className="relative h-64 rounded-[32px] overflow-hidden mb-8">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={title} />
                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#006341]">
                            {item.category}
                        </div>
                        <div className="absolute bottom-6 right-6 px-3 py-1 bg-[#4B2C20]/80 backdrop-blur-sm rounded-xl text-[8px] font-bold text-white uppercase">
                            {item.type}
                        </div>
                      </div>
                      
                      <div className="space-y-4 px-4 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Clock size={12}/> {readTime}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span>{item.date || 'May 2026'}</span>
                        </div>
                        <h2 className="text-2xl font-black text-[#4B2C20] leading-tight group-hover:text-[#006341] transition-colors">
                          {title}
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                        <div className="mt-auto pt-6 flex justify-between items-center">
                          <button className="flex items-center gap-2 text-[#006341] font-black text-sm group-hover:gap-4 transition-all">
                              {item.type === 'Story' ? 'Read Legend' : 'Read Article'} <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[40px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="relative h-64 flex-shrink-0">
                <img src={activeStory.image} alt="Story" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button onClick={() => setActiveStory(null)} className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/40 transition">
                  <X size={24} />
                </button>
                <div className="absolute bottom-8 left-8">
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${activeStory.tagColor || 'bg-white text-black'}`}>
                    {language === 'am' ? activeStory.tag_am : language === 'om' ? activeStory.tag_om : activeStory.tag}
                  </span>
                  <h2 className="text-3xl font-black text-white mt-4">{language === 'am' ? activeStory.title_am : language === 'om' ? activeStory.title_om : activeStory.title}</h2>
                </div>
              </div>
              <div className="p-10 overflow-y-auto">
                {(language === 'am' ? activeStory.fullStory_am || activeStory.fullStory : language === 'om' ? activeStory.fullStory_om || activeStory.fullStory : activeStory.fullStory).split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-6 text-lg font-medium"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;
