import React, { useState, useRef, useEffect } from 'react';
import { X, Zap, Maximize2, Minimize2, Send, Coffee } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { renderSafeMarkdown } from '../utils/safeMarkdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useTranslation();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    { text: t('nav.brand') + " AI Coffee Expert", isBot: true, isHeader: true },
    { text: "Salam! I'm your EthioBrew assistant. How can I help you find the perfect coffee today?", isBot: true }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, language }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.response || "Sorry, I'm resting my beans. Try again?", isBot: true }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Error connecting to the coffee cloud. Please check your connection.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-100'}`}>
      {isOpen && (
        <div className={`absolute bottom-20 right-0 bg-white rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 transition-all duration-300 ${isMaximized ? 'w-[90vw] md:w-[600px] h-[80vh]' : 'w-80 h-96'}`}>
          {/* Header */}
          <div className="bg-[#4B2C20] p-6 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-[#4B2C20] font-black shadow-lg">
                <Coffee size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">{t('nav.expert')}</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{t('common.online')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 hover:bg-white/10 rounded-full transition"
               >
                {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
               </button>
               <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
               >
                <X size={18} />
               </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                {m.isHeader ? (
                  <div className="w-full text-center py-4 opacity-50 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
                    {m.text}
                  </div>
                ) : (
                  <div
                    className={`max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed shadow-sm transition-all ${m.isBot ? 'bg-white text-gray-700 rounded-tl-none border border-gray-100' : 'bg-[#006341] text-white rounded-tr-none'}`}
                    dangerouslySetInnerHTML={{ __html: renderSafeMarkdown(m.text) }}
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-[24px] rounded-tl-none border border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="relative flex items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('shop.search_placeholder')}
                className="w-full pl-6 pr-14 py-4 bg-gray-50 rounded-2xl border-none outline-none text-sm focus:ring-2 focus:ring-[#006341]/20 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 p-3 rounded-xl transition-all ${isLoading || !input.trim() ? 'bg-gray-200 text-gray-400' : 'bg-[#006341] text-white hover:scale-105 active:scale-95 shadow-lg'}`}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-center text-gray-400 mt-2 font-medium uppercase tracking-tight">{t('nav.ai_powered')}</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-[#4B2C20] rotate-90' : 'bg-[#4B2C20] text-[#FFD700]'}`}
      >
        {isOpen ? <X size={24} /> : (
          <div className="relative flex items-center justify-center">
             <Zap size={24} fill="currentColor" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#4B2C20]" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatAssistant;
