import React from 'react';
import { Coffee, Send, Phone as PhoneIcon, Mail, Instagram } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 py-20 px-6 mt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Brand Info */}
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-[#4B2C20] rounded-3xl flex items-center justify-center text-[#FFD700] shadow-xl">
              <Coffee size={28} />
           </div>
           <div>
              <p className="font-black text-2xl leading-tight text-[#4B2C20]">Ethio-Brew</p>
              <p className="text-xs text-gray-400 font-black uppercase tracking-[0.2em] mt-1">Premium Origin Coffee</p>
           </div>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
           <p className="text-sm font-bold text-gray-900 tracking-wide">Developed by Gemachis Tesfaye</p>
           <div className="flex flex-wrap justify-center md:justify-end gap-8 text-xs text-gray-400 font-black uppercase tracking-widest mt-2">
              <a href="tel:+251911234567" className="flex items-center gap-2 hover:text-[#006341] transition">
                <PhoneIcon size={16}/> Call Us
              </a>
              <a href="mailto:hello@ethiobrew.com" className="hover:text-[#006341] transition">Email</a>
              <a href="https://t.me/EthioBrew" target="_blank" rel="noreferrer" className="hover:text-[#006341] transition">Telegram</a>
              <a href="https://instagram.com/EthioBrew" target="_blank" rel="noreferrer" className="hover:text-[#006341] transition">Instagram</a>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-12 border-t border-gray-50 text-center text-[10px] text-gray-300 font-black uppercase tracking-[0.4em]">
        &copy; {new Date().getFullYear()} Ethio-Brew • All Cultural Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
