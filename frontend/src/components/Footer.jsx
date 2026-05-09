import React from 'react';
import { Coffee, Send, Phone as PhoneIcon, Mail, Instagram, Code, MapPin, Github } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        
        {/* 1. BRAND SECTION */}
        <div className="flex flex-col gap-3 min-w-[200px]">
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#4B2C20] rounded-2xl flex items-center justify-center text-[#FFD700] shadow-lg">
                 <Coffee size={24} />
              </div>
              <div>
                 <p className="font-black text-xl leading-tight text-[#4B2C20]">Ethio-Brew</p>
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Premium Origin Coffee</p>
              </div>
           </div>
           <p className="text-sm text-gray-500 max-w-xs leading-tight font-medium">
             Authentic Ethiopian coffee.
           </p>
        </div>

        {/* 2. BUSINESS CONTACT SECTION */}
        <div className="flex flex-col gap-3">
           <h4 className="text-[#4B2C20] font-black text-xs uppercase tracking-[0.2em]">Store Contact</h4>
           <div className="space-y-2">
              <a href="tel:+251911234567" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#006341] transition">
                <PhoneIcon size={14} className="text-[#4B2C20]/20"/> +251 911 234 567
              </a>
              <a href="mailto:hello@ethiobrew.com" className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#006341] transition">
                <Mail size={14} className="text-[#4B2C20]/20"/> hello@ethiobrew.com
              </a>
           </div>
           <div className="flex gap-4 pt-1">
              <a href="https://t.me/EthioBrew" className="text-gray-400 hover:text-[#006341] transition"><Send size={18} /></a>
              <a href="https://instagram.com/EthioBrew" className="text-gray-400 hover:text-[#006341] transition"><Instagram size={18} /></a>
           </div>
        </div>

        {/* 3. DEVELOPER SECTION (Minimizing the Card Container) */}
        <div className="flex flex-col gap-3">
           <h4 className="text-[#4B2C20] font-black text-xs uppercase tracking-[0.2em]">Software Developer</h4>
           <div className="bg-[#FDFCF8] px-5 py-4 rounded-[30px] border border-gray-100 shadow-sm flex items-center gap-6">
              <div className="flex items-center gap-3 border-r border-gray-100 pr-6">
                 <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                    <Code size={20} />
                 </div>
                 <div>
                    <p className="text-[9px] text-gray-400 font-black uppercase leading-none mb-1">Built by</p>
                    <p className="font-black text-sm text-gray-900 whitespace-nowrap">Gemachis Tesfaye</p>
                 </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <a href="tel:+251976601074" className="text-sm font-bold text-gray-600 hover:text-[#006341] transition">+251 976 601 074</a>
                <div className="flex gap-4">
                  <a href="mailto:gemachistesfaye36@gmail.com" title="Email" className="text-gray-400 hover:text-[#006341] transition"><Mail size={16}/></a>
                  <a href="https://github.com/gemachistesfaye" title="GitHub" className="text-gray-400 hover:text-black transition"><Github size={16}/></a>
                  <a href="https://t.me/urjiiko1" title="Telegram" className="text-[#0088cc] hover:opacity-70 transition"><Send size={16}/></a>
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-50 text-center text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">
        &copy; {new Date().getFullYear()} Ethio-Brew • All Cultural Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
