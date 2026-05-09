import React from 'react';
import { Target, Heart, Eye, Handshake } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="relative">
           <img 
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800" 
            className="rounded-[60px] shadow-2xl relative z-10"
           />
           <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#FFD700] rounded-full -z-0 opacity-20 blur-3xl"></div>
        </div>
        <div>
          <span className="text-[#006341] font-bold uppercase tracking-[0.3em] text-xs">Our Heritage</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 mb-8">More Than a Drink, It's a Tradition.</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8">
            Ethio-Brew was founded with a single mission: to connect the world directly to the ancestral home of coffee. We believe that every bean tells the story of the farmers, the soil, and the rich Ethiopian tradition that dates back over a thousand years.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-3xl font-extrabold text-[#4B2C20]">100%</p>
              <p className="text-sm text-gray-400 font-medium">Direct Trade</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-[#4B2C20]">50+</p>
              <p className="text-sm text-gray-400 font-medium">Local Farmers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <Target />, title: "Our Mission", desc: "To empower Ethiopian farmers while delivering the freshest specialty beans to your doorstep." },
          { icon: <Heart />, title: "Our Values", desc: "Fair pay, sustainable farming, and preserving the cultural sanctity of the coffee ceremony." },
          { icon: <Handshake />, title: "Direct Partnerships", desc: "We skip the middlemen to ensure that the value returns to the highland communities." },
          { icon: <Eye />, title: "Our Vision", desc: "To become the global bridge between Ethiopian heritage and the modern coffee connoisseur." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-50 text-center hover:shadow-xl transition-all duration-500">
            <div className="w-16 h-16 bg-gray-50 text-[#006341] rounded-3xl flex items-center justify-center mx-auto mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
