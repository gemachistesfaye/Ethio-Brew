import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { X, Star, Plus } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose, addToCart }) => {
  const { t, language } = useTranslation();
  if (!product || !isOpen) return null;

  const name = language === 'am' ? product.name_am : language === 'om' ? product.name_om : product.name_en;
  const description = language === 'am' ? product.description_am : language === 'om' ? product.description_om : product.description_en;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img src={product.imageUrl} className="w-full h-full object-cover" alt={name} />
          <button onClick={onClose} className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full md:hidden">
            <X size={20} />
          </button>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="hidden md:flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-400 hover:text-black transition"><X /></button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#006341]/10 text-[#006341] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{product.origin}</span>
            <div className="flex items-center text-[#FFD700] ml-auto">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold ml-1 text-gray-900">{product.rating}</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">{name}</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-100 p-4 rounded-2xl bg-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t('shop.roast_level')}</p>
              <p className="font-bold">{product.roast}</p>
            </div>
            <div className="border border-gray-100 p-4 rounded-2xl bg-gray-50">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{t('shop.origin')}</p>
              <div className="flex flex-wrap gap-1">
                <span className="text-xs bg-white px-2 py-0.5 rounded-md shadow-sm">{product.origin}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">{t('shop.price')}</p>
              <p className="text-2xl font-extrabold text-[#006341]">{product.price} ETB</p>
            </div>
            <button 
              onClick={() => { addToCart(product); onClose(); }}
              className="bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004d32] transition shadow-lg flex items-center gap-2"
            >
              <Plus size={20} /> {t('shop.add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
