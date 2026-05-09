import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Coffee, History, Users } from 'lucide-react';

const BlogPage = () => {
  const { t } = useTranslation();

  const posts = [
    {
      id: 1,
      title: "The Birthplace of Coffee: A Journey to Kaffa",
      excerpt: "Explore the ancient forests where the first Arabica beans were discovered by Kaldi the goat herder.",
      date: "May 10, 2026",
      category: "History",
      icon: <History className="text-[#006341]" />
    },
    {
      id: 2,
      title: "Mastering the Jebena: Traditional Brewing Secrets",
      excerpt: "Learn how to brew the perfect cup of Ethiopian coffee using the traditional clay pot.",
      date: "May 08, 2026",
      category: "Technique",
      icon: <Coffee className="text-[#006341]" />
    },
    {
      id: 3,
      title: "Coffee Ceremony: More Than Just a Drink",
      excerpt: "Understanding the social and spiritual importance of the Ethiopian coffee ceremony.",
      date: "May 05, 2026",
      category: "Culture",
      icon: <Users className="text-[#006341]" />
    }
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Coffee Culture & Heritage</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Discover the rich history and soul of Ethiopian coffee through our curated articles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[40px] p-8 border border-gray-50 shadow-sm hover:shadow-xl transition group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#006341] group-hover:text-white transition-colors duration-300">
              {post.icon}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#006341] bg-green-50 px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">{post.date}</span>
            </div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-[#006341] transition-colors">{post.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{post.excerpt}</p>
            <button className="flex items-center gap-2 text-sm font-bold text-[#4B2C20] group-hover:gap-4 transition-all">
              Read Story <BookOpen size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
