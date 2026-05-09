import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Info, Plus, Star } from 'lucide-react';
import { getProducts } from '../services/api';
import { MOCK_COFFEE } from '../constants';

const CATEGORIES = [
  'All',
  'Single Origin',
  'Blend',
  'Specialty',
  'Dark Roast',
  'Organic',
  'Gift Box',
  'Traditional',
  'Light Roast',
  'Medium Roast',
];

const MenuPage = ({ addToCart, onProductClick }) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState(MOCK_COFFEE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data && data.length > 0) setProducts(data);
      } catch {
        // fall back to mock
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const currentLang = i18n.language;

  const filteredItems = products.filter((item) => {
    const name = currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : (item.name_en || item.name);
    const matchesSearch = (name || '').toLowerCase().includes(search.toLowerCase());

    let matchesCategory = true;
    if (activeCategory !== 'All') {
      if (activeCategory === 'Light Roast') {
        matchesCategory = item.roast === 'Light';
      } else if (activeCategory === 'Medium Roast') {
        matchesCategory = item.roast === 'Medium' || item.roast === 'Medium-Dark';
      } else {
        matchesCategory = item.category === activeCategory;
      }
    }
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <span className="text-[#006341] font-bold uppercase tracking-widest text-xs">Premium Ethiopian Coffee</span>
            <h1 className="text-4xl font-extrabold text-[#4B2C20] mt-1">Shop Our Collection</h1>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search coffees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#006341] outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#006341] text-white shadow-lg shadow-[#006341]/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#006341] hover:text-[#006341]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-400 font-medium mb-6">
          Showing <span className="font-bold text-gray-700">{filteredItems.length}</span> results
          {activeCategory !== 'All' && <> in <span className="font-bold text-[#006341]">{activeCategory}</span></>}
        </p>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-56 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-2/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-5xl mb-4">☕</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No coffees found</h3>
            <p className="text-gray-400 text-sm">Try a different category or search term.</p>
            <button onClick={() => { setActiveCategory('All'); setSearch(''); }} className="mt-6 px-6 py-3 bg-[#006341] text-white rounded-xl font-bold text-sm hover:bg-[#004d32] transition">
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => {
              const name = currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : item.name;
              return (
                <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative">
                  <button onClick={() => onProductClick(item)} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                    <Info size={18} />
                  </button>

                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 z-10 text-[10px] font-bold bg-white/80 backdrop-blur text-[#006341] px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onProductClick(item)}>
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-1 text-[#FFD700] mb-2">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-bold text-gray-900">{item.rating || 4.8}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 leading-tight">{name}</h3>
                    <p className="text-gray-400 text-[11px] mb-4 uppercase tracking-tighter">{item.roast} Roast • {item.origin}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(item.flavorNotes || []).map((note) => (
                        <span key={note} className="text-[10px] bg-[#006341]/10 text-[#006341] px-2 py-0.5 rounded-full font-bold">{note}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                      <span className="font-bold text-[#006341] text-lg">{item.price} ETB</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-[#006341] text-white p-3 rounded-xl hover:bg-[#004d32] transition flex items-center gap-1 shadow-md active:scale-95"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
