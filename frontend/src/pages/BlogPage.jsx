import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';

const BlogPage = () => {
  const posts = [
    {
      id: 1,
      title: 'How to Brew the Perfect Jebena Buna',
      excerpt: 'Master the traditional Ethiopian clay pot brewing method at home with these simple steps.',
      author: 'Abebe Bikila',
      date: 'May 9, 2026',
      readTime: '8 min read',
      category: 'Brewing',
      image: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Light vs Dark Roast: Which is Best for You?',
      excerpt: 'Understanding the flavor profiles of different roast levels and how they impact your caffeine intake.',
      author: 'Selam Tesfaye',
      date: 'May 8, 2026',
      readTime: '5 min read',
      category: 'Coffee 101',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      title: 'Sustainable Sourcing in the Oromia Region',
      excerpt: 'How Ethio-Brew is partnering with local cooperatives to ensure the future of organic coffee.',
      author: 'Gemachis Tesfaye',
      date: 'May 6, 2026',
      readTime: '10 min read',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-[#FDFCF8] min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <h1 className="text-5xl font-black text-[#4B2C20] mb-6 tracking-tight">The Ethio-Brew Blog</h1>
           <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
             Expert brewing tips, origin stories, and the latest news from the world of Ethiopian coffee.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {posts.map((post, i) => (
             <motion.article 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="flex flex-col group cursor-pointer"
             >
                <div className="relative h-72 rounded-[40px] overflow-hidden shadow-lg mb-8">
                   <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={post.title} />
                   <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#006341]">
                      {post.category}
                   </div>
                </div>
                
                <div className="space-y-4 px-4">
                   <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Clock size={14}/> {post.readTime}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{post.date}</span>
                   </div>
                   <h2 className="text-2xl font-black text-[#4B2C20] leading-tight group-hover:text-[#006341] transition-colors">
                     {post.title}
                   </h2>
                   <p className="text-gray-500 font-medium leading-relaxed">
                     {post.excerpt}
                   </p>
                   <button className="flex items-center gap-2 text-[#006341] font-black text-sm pt-4 group-hover:gap-4 transition-all">
                      Read Full Guide <ChevronRight size={18} />
                   </button>
                </div>
             </motion.article>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
