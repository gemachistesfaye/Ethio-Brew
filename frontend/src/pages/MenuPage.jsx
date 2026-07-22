import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Search, Filter, ShoppingCart, Star, Coffee, SlidersHorizontal, Info } from 'lucide-react';
import { getProducts } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const MenuPage = ({ addToCart, onProductClick }) => {
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const categories = [
    { id: 'All', key: 'all_cats' },
    { id: 'Light', key: 'light_roast' },
    { id: 'Medium', key: 'medium_roast' },
    { id: 'Dark', key: 'dark_roast' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const name = language === 'am' ? product.name_am : language === 'om' ? product.name_om : product.name_en;
    const matchesSearch = !searchTerm || 
      name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.origin_region?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.roast_level === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8]">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('shop.search_placeholder')}
              className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="p-3 bg-gray-50 rounded-xl text-gray-400 shrink-0">
               <Filter size={18} />
            </div>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition all ${
                  activeCategory === cat.id 
                    ? 'bg-[#006341] text-white shadow-lg' 
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
                }`}
              >
                {t(`shop.${cat.key}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Coffee size={20} className="text-[#006341]" /> 
              {activeCategory === 'All' ? t('shop.all_cats') : t(`shop.${categories.find(c => c.id === activeCategory)?.key}`)}
              <span className="text-sm font-normal text-gray-400 ml-2">({filteredProducts.length} {t('shop.results')})</span>
           </h2>
           <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <SlidersHorizontal size={14} /> {t('shop.roast_level')}
           </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1,2,3,4,5,6,7,8].map(n => (
              <div key={n} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] rounded-[32px] mb-4" />
                <div className="h-4 bg-gray-200 rounded-full w-2/3 mb-2" />
                <div className="h-4 bg-gray-200 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {filteredProducts.map((product) => {
                    const name = language === 'am' ? product.name_am : language === 'om' ? product.name_om : product.name_en;
                    return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={product.id}
                      className="bg-white rounded-[40px] border border-gray-100 p-5 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col"
                    >
                      <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6">
                        <img 
                          src={product.image_url} 
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                           <button 
                            onClick={() => onProductClick({ ...product, name: product.name_en, description: product.description_en, imageUrl: product.image_url, origin: product.origin_region, roast: product.roast_level })}
                            className="p-3 bg-white/90 backdrop-blur-md rounded-2xl text-gray-900 shadow-sm hover:bg-white transition"
                           >
                              <Info size={18} />
                           </button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                           <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#006341] shadow-sm">
                              {product.origin_region}
                           </span>
                        </div>
                      </div>

                      <div className="px-2 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{product.roast_level}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#4B2C20] mb-6 line-clamp-1 group-hover:text-[#006341] transition">{name}</h3>
                      </div>

                      <div className="px-2 mt-auto">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-3xl border border-gray-100 group-hover:bg-[#006341]/5 group-hover:border-[#006341]/10 transition">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">{t('shop.price')}</span>
                              <span className="text-lg font-black text-[#4B2C20] leading-none">{Number(product.price).toFixed(0)} <span className="text-[10px]">ETB</span></span>
                           </div>
                           <button 
                            onClick={() => addToCart({ ...product, name: product.name_en, imageUrl: product.image_url, price: Number(product.price) })}
                            className="p-3 bg-[#006341] text-white rounded-2xl shadow-lg shadow-[#006341]/20 hover:scale-110 active:scale-95 transition"
                           >
                             <ShoppingCart size={20} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <Coffee size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('shop.no_products')}</h3>
                  <p className="text-gray-400">{t('shop.try_different')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
