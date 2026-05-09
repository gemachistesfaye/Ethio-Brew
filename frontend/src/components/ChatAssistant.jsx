import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Salam! I'm your EthioBrew assistant. How can I help you find the perfect coffee today?", isBot: true }]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#4B2C20] p-6 text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center text-[#4B2C20] font-bold">AI</div>
            <div>
              <p className="font-bold text-sm">Coffee Expert</p>
              <p className="text-[10px] text-[#FFD700] font-bold uppercase">Online now</p>
            </div>
          </div>
          <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.isBot ? 'bg-white text-gray-700 shadow-sm' : 'bg-[#006341] text-white'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t border-gray-50">
            <input 
              placeholder="Ask me anything..." 
              className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none text-sm focus:ring-1 focus:ring-[#006341]"
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && e.target.value) {
                   const message = e.target.value;
                   setMessages(prev => [...prev, { text: message, isBot: false }]);
                   e.target.value = '';
                   
                   try {
                     const res = await fetch("http://localhost:5000/api/ai", {
                       method: "POST",
                       headers: {
                         "Content-Type": "application/json",
                       },
                       body: JSON.stringify({ message }),
                     });
                     const data = await res.json();
                     setMessages(prev => [...prev, { text: data.response || "Sorry, I could not process that request.", isBot: true }]);
                   } catch (error) {
                     setMessages(prev => [...prev, { text: "Error connecting to AI server. Please try again later.", isBot: true }]);
                   }
                }
              }}
            />
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#4B2C20] text-[#FFD700] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <div className="flex flex-col items-center"><Zap size={24} fill="currentColor" /><span className="text-[8px] font-bold uppercase">Ask AI</span></div>}
      </button>
    </div>
  );
};

export default ChatAssistant;
