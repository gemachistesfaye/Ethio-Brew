import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Instagram, Phone, MapPin, CheckCircle, Coffee } from 'lucide-react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  const contacts = [
    { icon: <Phone size={20} />, label: 'Phone', value: '+251 911 234 567', href: 'tel:+251911234567' },
    { icon: <Mail size={20} />, label: 'Email', value: 'hello@ethiobrew.com', href: 'mailto:hello@ethiobrew.com' },
    { icon: <Send size={20} />, label: 'Telegram', value: '@EthioBrew', href: 'https://t.me/EthioBrew' },
    { icon: <Instagram size={20} />, label: 'Instagram', value: '@EthioBrew', href: 'https://instagram.com/EthioBrew' },
    { icon: <MapPin size={20} />, label: 'Address', value: 'Bole Road, Addis Ababa', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <span className="inline-block bg-[#006341]/10 text-[#006341] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B2C20] mb-4 leading-tight">
          Contact Us
        </h1>
        <p className="text-gray-500 text-lg">
          Have a question about our coffee, a partnership idea, or just want to say hello? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-[48px] overflow-hidden min-h-[600px] shadow-2xl"
        >
          {/* Background image with overlay */}
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop"
            alt="Ethiopian coffee"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#4B2C20]/90 via-[#006341]/80 to-black/70" />

          <div className="relative z-10 p-10 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Coffee className="text-[#FFD700]" size={22} />
                </div>
                <div>
                  <p className="text-white font-extrabold text-xl">Ethio-Brew</p>
                  <p className="text-white/60 text-xs uppercase tracking-widest">Premium Ethiopian Coffee</p>
                </div>
              </div>

              <h3 className="text-white text-2xl font-bold mb-2">Let's Connect</h3>
              <p className="text-white/70 text-sm mb-10 leading-relaxed">
                Based in Addis Ababa, Ethiopia. We are always open to conversations about coffee, technology, and collaboration.
              </p>

              <div className="space-y-5">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.label === 'Telegram' || c.label === 'GitHub' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#FFD700] group-hover:bg-white/20 transition">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{c.label}</p>
                      <p className="text-white text-sm font-semibold group-hover:text-[#FFD700] transition">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 text-white/40 text-xs">
              <MapPin size={13} /> Addis Ababa, Ethiopia
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[48px] shadow-2xl p-10 flex flex-col justify-center border border-gray-50"
        >
          {!sent ? (
            <>
              <h3 className="text-2xl font-extrabold text-[#4B2C20] mb-2">Send a Message</h3>
              <p className="text-gray-400 text-sm mb-8">We typically respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Your Name</label>
                  <input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Abebe Kebede"
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] text-sm transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] text-sm transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your inquiry..."
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] text-sm resize-none transition"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#006341] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#004d32] transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-extrabold text-[#4B2C20] mb-3">Message Sent!</h3>
              <p className="text-gray-500 text-sm">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                className="mt-8 text-sm text-[#006341] font-bold hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
