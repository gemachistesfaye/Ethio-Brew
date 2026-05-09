import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Gift, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SUBSCRIPTIONS = [
  { 
    id: 'sub1', 
    nameKey: 'subscription.plans.weekly', 
    price: 2800, 
    interval: 'Monthly (4 bags)', 
    savings: '15%',
    featuresKey: 'subscription.plans.weekly.features'
  },
  { 
    id: 'sub2', 
    nameKey: 'subscription.plans.connoisseur', 
    price: 5200, 
    interval: 'Monthly (8 bags)', 
    savings: '25%',
    featuresKey: 'subscription.plans.connoisseur.features'
  }
];

const SubscriptionPage = () => {
  const { t } = useTranslation();
  const [isGift, setIsGift] = useState({});

  const toggleGift = (id) => {
    setIsGift(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Static features translated via benefit keys
  const getBenefits = () => [
    t('subscription.benefits.delivery'),
    t('subscription.benefits.access'),
    t('subscription.benefits.cancel')
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-2xl mx-auto"
        >
          <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('nav.brand')} Club</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4B2C20] mt-4 mb-6">{t('subscription.subtitle')}</h1>
          <p className="text-gray-500 text-lg">{t('subscription.description')}</p>
        </motion.div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTIONS.map((sub, i) => (
            <motion.div 
              key={sub.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-white border border-gray-100 p-8 md:p-12 rounded-[48px] shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden flex flex-col text-left"
            >
              {/* Savings Badge */}
              <div className="absolute top-0 right-0 bg-[#FFD700] text-[#4B2C20] px-8 py-3 rounded-bl-[32px] font-bold text-sm shadow-sm">
                {t('subscription.save', { percent: sub.savings })}
              </div>

              <div className="mb-8">
                <h3 className="text-3xl font-extrabold text-[#4B2C20] mb-2">{t(sub.nameKey)}</h3>
                <p className="text-[#006341] font-bold text-sm uppercase tracking-wide">{sub.interval}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#4B2C20]">{sub.price}</span>
                  <span className="text-gray-400 font-bold">ETB / {t('cart.total')}</span>
                </div>
              </div>

              <div className="flex-grow">
                <p className="font-bold text-gray-700 mb-6 flex items-center gap-2">
                   {t('subscription.whatsIncluded')}:
                </p>
                <ul className="space-y-4 mb-10">
                  {getBenefits().map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className="bg-[#006341]/10 p-1 rounded-full">
                        <CheckCircle size={16} className="text-[#006341]"/>
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gift Toggle Section */}
              <div 
                onClick={() => toggleGift(sub.id)}
                className={`mb-8 p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isGift[sub.id] 
                    ? 'border-[#006341] bg-[#006341]/5' 
                    : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isGift[sub.id] ? 'bg-[#006341] text-white' : 'bg-gray-200 text-gray-400'}`}>
                    <Gift size={20} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isGift[sub.id] ? 'text-[#006341]' : 'text-gray-600'}`}>{t('subscription.sendGift')}</p>
                    <p className="text-[10px] text-gray-400">{t('subscription.giftDesc')}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isGift[sub.id] ? 'bg-[#006341] border-[#006341]' : 'border-gray-300'
                }`}>
                  {isGift[sub.id] && <CheckCircle size={14} className="text-white" />}
                </div>
              </div>

              <button className="w-full bg-[#006341] text-white py-5 rounded-3xl font-bold hover:bg-[#004d32] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#006341]/20 group-hover:scale-[1.02]">
                {isGift[sub.id] ? t('subscription.sendGiftSub') : t('subscription.joinClub')} <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400 font-bold text-sm uppercase tracking-widest">
           <span>No Commitments</span>
           <span className="text-[#006341]">•</span>
           <span>Pause Anytime</span>
           <span className="text-[#006341]">•</span>
           <span>Exclusive Roasts</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
