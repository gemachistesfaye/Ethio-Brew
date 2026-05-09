import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Info, Plus, Star } from 'lucide-react';
import { getProducts } from '../services/api';
import { MOCK_COFFEE } from '../constants';

const MenuPage = ({ addToCart, onProductClick }) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(MOCK_COFFEE); // Default to mock if DB is empty
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products from API, falling back to local data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const currentLang = i18n.language;

  const filteredItems = products.filter(item => {
    const name = currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : (item.name_en || item.name);
    return name.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <div className="py-12 px-4 max-w-7xl mx-auto animate-in slide-in-from-bottom-2">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold">{t('nav.menu')}</h1>
          <p className="text-gray-500">Premium Ethiopian Single Origin Coffee</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder={t('shop.search')} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-2xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#006341] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => {
          const name = currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : item.name;
          return (
            <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col relative">
               <button onClick={() => onProductClick(item)} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur text-gray-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                  <Info size={18} />
               </button>
              <div className="relative h-56 overflow-hidden" onClick={() => onProductClick(item)}>
                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center gap-1 text-[#FFD700] mb-2">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-bold text-gray-900">{4.8}</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{name}</h3>
                <p className="text-gray-400 text-[11px] mb-4 uppercase tracking-tighter">{item.roast} Roast • {item.origin}</p>
                
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
    </div>
  );
};

export default MenuPage;
