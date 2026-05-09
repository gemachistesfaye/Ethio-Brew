import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const SUBSCRIPTIONS = [
  { id: 'sub1', nameKey: 'subscription.plans.weekly', price: 2800, interval: 'Monthly (4 bags)', savings: '15%' },
  { id: 'sub2', nameKey: 'subscription.plans.connoisseur', price: 5200, interval: 'Monthly (8 bags)', savings: '25%' }
];

const SubscriptionPage = () => {
  const { t } = useTranslation();
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto text-center">
      <div className="mb-16 max-w-2xl mx-auto">
        <span className="text-[#006341] font-bold uppercase tracking-widest text-sm">{t('subscription.title')}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6">{t('subscription.subtitle')}</h1>
        <p className="text-gray-500">{t('subscription.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {SUBSCRIPTIONS.map(sub => (
          <div key={sub.id} className="relative bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition group overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FFD700] text-[#4B2C20] px-6 py-2 rounded-bl-3xl font-bold text-sm">{t('subscription.save', { percent: sub.savings })}</div>
            <h3 className="text-2xl font-bold mb-2">{t(sub.nameKey)}</h3>
            <p className="text-gray-400 text-sm mb-6">{sub.interval}</p>
            <div className="text-4xl font-extrabold text-[#006341] mb-8">{sub.price} <span className="text-lg text-gray-400 font-normal">ETB / mo</span></div>
            <ul className="text-left space-y-4 mb-10">
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> {t('subscription.benefits.delivery')}</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> {t('subscription.benefits.access')}</li>
              <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle size={18} className="text-[#006341]"/> {t('subscription.benefits.cancel')}</li>
            </ul>
            <button className="w-full bg-[#4B2C20] text-white py-4 rounded-2xl font-bold hover:bg-[#006341] transition group-hover:scale-105 duration-300">
              {t('subscription.subscribeNow')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
