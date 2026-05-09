import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, CreditCard, Smartphone, Landmark, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { PAYMENT_DETAILS } from '../constants';

const CheckoutPage = ({ cart, total, onOrderComplete }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Telebirr');
  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const simulateUpload = () => {
    if (!screenshot) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cart,
      total,
      address,
      phone,
      paymentMethod,
      date: new Date().toISOString()
    };
    onOrderComplete(order);
  };

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12 gap-4">
        {[1, 2, 3].map(i => (
          <React.Fragment key={i}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-[#006341] text-white' : 'bg-gray-200 text-gray-500'}`}>{i}</div>
            {i < 3 && <div className={`h-1 w-12 rounded-full ${step > i ? 'bg-[#006341]' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 animate-in slide-in-from-left duration-500">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><MapPin className="text-[#006341]"/> {t('checkout.deliveryInfo')}</h2>
              <input required placeholder={t('checkout.address')} value={address} onChange={e => setAddress(e.target.value)} className="w-full p-5 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#006341] bg-white" />
              <input required placeholder={t('checkout.phone')} value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-5 rounded-2xl border-none shadow-sm outline-none focus:ring-2 focus:ring-[#006341] bg-white" />
              <button onClick={() => setStep(2)} disabled={!address || !phone} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition disabled:opacity-50">Continue to Payment</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><CreditCard className="text-[#006341]"/> {t('checkout.payment')}</h2>
              <div className="grid grid-cols-2 gap-4">
                 {['Telebirr', 'CBE'].map(m => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-3 transition ${paymentMethod === m ? 'border-[#006341] bg-green-50' : 'border-white bg-white shadow-sm'}`}
                    >
                      {m === 'Telebirr' ? <Smartphone className="text-[#006341]"/> : <Landmark className="text-[#006341]"/>}
                      <span className="font-bold text-sm">{m}</span>
                    </button>
                  ))}
              </div>
              <div className="bg-[#4B2C20] p-6 rounded-[32px] text-white text-center">
                <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest mb-1">{paymentMethod === 'Telebirr' ? 'Merchant Phone' : 'CBE Account'}</p>
                <p className="text-2xl font-mono font-bold">{paymentMethod === 'Telebirr' ? PAYMENT_DETAILS.telebirr : PAYMENT_DETAILS.cbeAccount}</p>
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition">Next: Confirmation</button>
              <button onClick={() => setStep(1)} className="w-full text-gray-500 font-bold py-2">Back to Delivery</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Upload className="text-[#006341]"/> {t('checkout.confirm')}</h2>
              {!uploaded ? (
                <div className="space-y-4">
                  <input type="file" id="up" className="hidden" onChange={e => setScreenshot(e.target.files[0])} />
                  <label htmlFor="up" className="flex flex-col items-center justify-center gap-3 p-12 rounded-[32px] border-2 border-dashed border-gray-200 bg-white cursor-pointer hover:border-[#006341] transition">
                    <ImageIcon size={32} className="text-gray-300"/>
                    <span className="text-sm font-medium text-gray-500">{screenshot ? screenshot.name : t('checkout.uploadProof')}</span>
                  </label>
                  {screenshot && (
                    <button onClick={simulateUpload} disabled={uploading} className="w-full bg-[#4B2C20] text-white py-5 rounded-2xl font-bold">
                      {uploading ? 'Verifying...' : 'Submit Proof'}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-green-50 rounded-[32px] border border-green-100">
                  <CheckCircle size={48} className="text-[#006341] mx-auto mb-4" />
                  <h3 className="font-bold text-[#006341]">{t('checkout.verifyLocally')}</h3>
                  <button onClick={handleSubmit} className="mt-8 w-64 bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg">{t('checkout.finish')}</button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm h-fit">
          <h3 className="font-bold text-xl mb-6">{t('cart.summary')}</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => {
              const currentLang = i18n.language;
              const name = currentLang === 'am' ? item.name_am : currentLang === 'om' ? item.name_om : item.name;
              return (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold">{name}</p>
                      <p className="text-xs text-gray-400">{item.quantity} units</p>
                    </div>
                  </div>
                  <span className="font-bold">{item.price * item.quantity} ETB</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-dashed pt-6 space-y-2">
             <div className="flex justify-between text-gray-500 text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>{total} ETB</span>
             </div>
             <div className="flex justify-between text-gray-500 text-sm">
                <span>{t('cart.pointsEarned')}</span>
                <span className="text-[#DAA520] font-bold">+{Math.floor(total / 10)}</span>
             </div>
             <div className="flex justify-between items-center pt-4 text-2xl font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-[#006341]">{total} ETB</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
