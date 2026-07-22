import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { MapPin, CreditCard, Smartphone, Landmark, Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { createOrder } from '../services/api';
import { PAYMENT_DETAILS } from '../constants';

const CheckoutPage = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Telebirr');
  const [screenshot, setScreenshot] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  const simulateUpload = () => {
    if (!screenshot) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setSubmitting(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity || 1,
          price_at_purchase: item.price
        })),
        shipping_address: address,
        phone_number: phone,
        payment_method: paymentMethod,
      };

      const result = await createOrder(orderData);
      setOrderId(result.orderId || result.id);
      clearCart();
      setStep(4);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="bg-white p-12 rounded-[40px] border border-gray-50 shadow-sm">
          <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">{t('cart.empty') || 'Your cart is empty'}</h2>
          <p className="text-gray-400 mb-6">{t('cart.empty_desc') || 'Add some coffee to get started!'}</p>
          <button onClick={() => navigate('/shop')} className="bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004d32] transition">
            {t('hero.orderNow') || 'Browse Coffee'}
          </button>
        </div>
      </div>
    );
  }

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
              <button onClick={() => setStep(2)} disabled={!address || !phone} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition disabled:opacity-50">{t('checkout.continue')}</button>
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
                <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest mb-1">{paymentMethod === 'Telebirr' ? t('checkout.merchant_phone') : t('checkout.cbe_account')}</p>
                <p className="text-2xl font-mono font-bold">{paymentMethod === 'Telebirr' ? PAYMENT_DETAILS.telebirr : PAYMENT_DETAILS.cbeAccount}</p>
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-lg hover:bg-[#004d32] transition">{t('checkout.next')}</button>
              <button onClick={() => setStep(1)} className="w-full text-gray-500 font-bold py-2">{t('checkout.back')}</button>
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
                      {uploading ? t('checkout.verifying') : t('checkout.submit_proof')}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-green-50 rounded-[32px] border border-green-100">
                  <CheckCircle size={48} className="text-[#006341] mx-auto mb-4" />
                  <h3 className="font-bold text-[#006341]">{t('checkout.verifyLocally')}</h3>
                   <button onClick={handleSubmit} disabled={submitting} className="mt-8 w-64 bg-[#006341] text-white py-5 rounded-2xl font-bold disabled:opacity-50">{submitting ? t('checkout.submitting') || 'Placing order...' : t('checkout.finish')}</button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 bg-green-50 rounded-[32px] border border-green-100 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-[#4B2C20] mb-2">Order Placed!</h2>
              <p className="text-gray-500 mb-4">Your order has been received and is being processed.</p>
              {orderId && (
                <p className="text-sm text-gray-400 mb-6">Order ID: <span className="font-mono font-bold text-[#4B2C20]">{orderId}</span></p>
              )}
              <p className="text-sm text-gray-400 mb-8">You will receive a confirmation email shortly.</p>
              <div className="flex gap-4 justify-center">
                <button onClick={() => navigate('/orders')} className="bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004d32] transition">
                  View My Orders
                </button>
                <button onClick={() => navigate('/shop')} className="bg-white border border-gray-200 text-[#4B2C20] px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm h-fit">
          <h3 className="font-bold text-xl mb-6">{t('cart.summary')}</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => {
              const name = language === 'am' ? item.name_am : language === 'om' ? item.name_om : item.name;
              return (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold">{name}</p>
                      <p className="text-xs text-gray-400">{item.quantity} {t('cart.units')}</p>
                    </div>
                  </div>
                  <span className="font-bold">{item.price * item.quantity} {t('common.etb')}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-dashed pt-6 space-y-2">
             <div className="flex justify-between text-gray-500 text-sm">
                <span>{t('cart.subtotal')}</span>
                <span>{cartTotal} {t('common.etb')}</span>
             </div>
             <div className="flex justify-between items-center pt-4 text-2xl font-bold">
                <span>{t('cart.total')}</span>
                <span className="text-[#006341]">{cartTotal} {t('common.etb')}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
