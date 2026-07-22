import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, XCircle, Eye, Clock, Smartphone, Landmark, Loader2 } from 'lucide-react';
import api from '../services/api';

const PaymentVerification = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchPayments = async () => {
    try {
      const res = await api.get('/admin/payments');
      setPayments(res.data.payments || res.data);
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId, status) => {
    const note = status === 'Rejected' ? window.prompt('Rejection reason (optional):') || '' : '';
    setProcessingId(paymentId);
    try {
      await api.post('/admin/payments/verify', { paymentId, status, adminNotes: note });
      fetchPayments();
    } catch (err) {
      alert(`Failed to ${status.toLowerCase()} payment`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="p-8 bg-[#FDFCF8] min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#4B2C20] tracking-tight">Payment Verification</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Audit manual bank and mobile transfers</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-2 flex items-center justify-center py-12 text-gray-400">
            <Loader2 size={24} className="animate-spin mr-2" /> Loading payments...
          </div>
        ) : payments.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-400 font-bold">No pending payments</div>
        ) : payments.map((pay) => (
          <div key={pay.id} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl flex flex-col md:flex-row gap-8 items-center">
            
            {/* Receipt Preview */}
            {pay.screenshot_url && (
              <div className="relative w-full md:w-48 aspect-[3/4] bg-gray-50 rounded-[32px] overflow-hidden group cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#006341] transition">
                 <img src={pay.screenshot_url} alt="Receipt" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-white p-3 rounded-full shadow-2xl"><Eye size={20} className="text-[#006341]"/></div>
                 </div>
              </div>
            )}

            {/* Details */}
            <div className="flex-1 space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">Order #{pay.order_id}</span>
                    <h3 className="font-black text-xl text-[#4B2C20] mt-2">{pay.method}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl ${pay.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : pay.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                     {pay.status === 'Pending' ? <Clock size={20}/> : pay.status === 'Approved' ? <CheckCircle2 size={20}/> : <XCircle size={20}/>}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                     <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Amount</p>
                     <p className="font-black text-[#006341]">ETB {Number(pay.amount).toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                     <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Status</p>
                     <p className="font-bold text-gray-600 text-xs">{pay.status}</p>
                  </div>
               </div>

               {pay.status === 'Pending' && (
                 <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => handleVerify(pay.id, 'Approved')}
                      disabled={processingId === pay.id}
                      className="flex-1 bg-[#006341] text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-[#004d32] transition disabled:opacity-50"
                    >
                       {processingId === pay.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />} Approve Payment
                    </button>
                    <button
                      onClick={() => handleVerify(pay.id, 'Rejected')}
                      disabled={processingId === pay.id}
                      className="flex-1 bg-white border border-gray-100 text-red-500 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-red-50 transition disabled:opacity-50"
                    >
                       {processingId === pay.id ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />} Reject
                    </button>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentVerification;
