import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Heart } from 'lucide-react';

const StoriesPage = () => {
  const stories = [
    {
      id: 1,
      title: 'The Ritual of Buna',
      excerpt: 'Explore the deep cultural significance of the three rounds of Ethiopian coffee pouring.',
      category: 'Culture',
      date: 'May 9, 2026',
      image: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Yirgacheffe: The Highland Jewel',
      excerpt: 'Meet the farmers producing the world’s most floral coffee at 2000 meters above sea level.',
      category: 'Origin',
      date: 'May 7, 2026',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Organic Farming in Jimma',
      excerpt: 'How sustainable practices are protecting the ancient wild coffee forests of Kaffa.',
      category: 'Sustainability',
      date: 'May 5, 2026',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
           <h1 className="text-5xl font-black text-[#4B2C20] mb-4">Coffee Stories</h1>
           <p className="text-xl text-gray-500 font-medium max-w-2xl">Discover the people, the places, and the traditions behind every cup of Ethio-Brew.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {stories.map((story, i) => (
             <motion.div 
               key={story.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-50 group"
             >
                <div className="h-64 overflow-hidden relative">
                   <img src={story.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={story.title} />
                   <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#006341]">
                      {story.category}
                   </div>
                </div>
                <div className="p-8">
                   <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {story.date}</span>
                      <span className="flex items-center gap-1"><User size={12}/> Ethio-Brew Team</span>
                   </div>
                   <h2 className="text-2xl font-black text-[#4B2C20] mb-4 group-hover:text-[#006341] transition-colors line-clamp-2">
                     {story.title}
                   </h2>
                   <p className="text-gray-500 font-medium mb-8 line-clamp-3 leading-relaxed">
                     {story.excerpt}
                   </p>
                   <div className="flex justify-between items-center">
                      <button className="flex items-center gap-2 text-[#006341] font-black text-sm group-hover:translate-x-2 transition-transform">
                         Read Story <ArrowRight size={18} />
                      </button>
                      <button className="text-gray-200 hover:text-red-500 transition-colors">
                         <Heart size={20} />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
