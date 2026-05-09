import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { BookOpen, Coffee, History, Users } from 'lucide-react';

const BlogPage = () => {
  const { t } = useTranslation();

  const [activeStory, setActiveStory] = React.useState(null);

  const posts = [
    {
      id: 1,
      title: "The Birthplace of Coffee: A Journey to Kaffa",
      excerpt: "Explore the ancient forests where the first Arabica beans were discovered by Kaldi the goat herder.",
      content: "Deep in the southwestern highlands of Ethiopia lies the Kaffa region, a place shrouded in mist and myth. It was here, over a millennium ago, that a young goat herder named Kaldi noticed his flock becoming unusually energetic after eating the red berries of a certain bush. Curious, Kaldi tried the berries himself and experienced the same invigorating effect. He brought the berries to a local monastery, where the monks initially condemned them as the devil's work and threw them into the fire. However, the enticing aroma of the roasting beans captivated them. They quickly raked the beans from the fire, crushed them, and dissolved them in hot water, creating the world's first cup of coffee. Today, Kaffa remains a biodiversity hotspot and the genetic home of Coffea arabica.",
      date: "May 10, 2026",
      category: "History",
      img: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Mastering the Jebena: Traditional Brewing Secrets",
      excerpt: "Learn how to brew the perfect cup of Ethiopian coffee using the traditional clay pot.",
      content: "The Jebena is more than just a coffee pot; it is the centerpiece of Ethiopian social life. Made of black clay, it features a spherical base, a long neck, and a pouring spout. Brewing coffee in a Jebena is an art form passed down through generations. The process begins with raw, green coffee beans, which are washed and roasted over hot coals in a flat pan called a 'mankesha'. Once the beans reach a dark, oily sheen, they are ground in a wooden mortar ('mukecha') with a pestle ('zenezena'). The grounds are then added to the boiling water in the Jebena. The coffee is allowed to brew and settle before being poured elegantly into small, handleless cups called 'cini'. The resulting brew is strong, thick, and profoundly flavorful.",
      date: "May 08, 2026",
      category: "Technique",
      img: "https://images.unsplash.com/photo-1620331006509-f00e69ba3e91?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Coffee Ceremony: More Than Just a Drink",
      excerpt: "Understanding the social and spiritual importance of the Ethiopian coffee ceremony.",
      content: "The Ethiopian coffee ceremony ('buna tetu') is a core cultural ritual, symbolizing respect, friendship, and hospitality. It is not uncommon for individuals to participate in the ceremony two or three times a day. The process can take hours and is typically conducted by the woman of the household. It involves roasting, grinding, and brewing the coffee in front of the guests. The aroma of roasting beans is mingled with the scent of burning frankincense or myrrh. The coffee is served in three rounds: 'Abol' (the first, strongest cup), 'Tona' (the second cup), and 'Baraka' (the third, weakest cup, meaning 'blessing'). To refuse a cup of coffee is considered impolite, as the ceremony is a time for discussing community issues, sharing news, and strengthening social bonds.",
      date: "May 05, 2026",
      category: "Culture",
      img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800"
    }
  ];

  if (activeStory) {
    return (
      <div className="py-20 px-4 max-w-4xl mx-auto animate-in fade-in duration-500">
        <button 
          onClick={() => setActiveStory(null)}
          className="mb-8 flex items-center gap-2 text-gray-500 hover:text-[#006341] transition font-bold"
        >
          ← {t('stories.back')}
        </button>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006341] bg-green-50 px-3 py-1 rounded-full">{activeStory.category}</span>
          <span className="text-xs text-gray-400 font-bold uppercase">{activeStory.date}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">{activeStory.title}</h1>
        <img src={activeStory.img} className="w-full h-96 object-cover rounded-[40px] mb-12 shadow-xl" />
        <div className="prose prose-lg prose-green max-w-none text-gray-600 leading-loose text-lg">
          <p>{activeStory.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{t('stories.title')}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">{t('stories.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition group flex flex-col cursor-pointer" onClick={() => setActiveStory(post)}>
            <div className="relative h-64 overflow-hidden">
               <img src={post.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
               <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">{post.category}</span>
               </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-[10px] text-gray-400 font-bold uppercase mb-3">{post.date}</span>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#006341] transition-colors">{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
              <button className="flex items-center gap-2 text-sm font-bold text-[#4B2C20] group-hover:gap-4 transition-all uppercase tracking-wider">
                {t('stories.read_more')} <BookOpen size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
