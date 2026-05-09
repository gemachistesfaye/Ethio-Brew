import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, XCircle, Eye, Clock, Smartphone, Landmark } from 'lucide-react';

const PaymentVerification = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Mocking for high-fidelity UI demonstration
    setPayments([
      { id: 1, orderId: '#EB-9921', customer: 'Almaz Belay', amount: 450.00, method: 'Telebirr', date: '2026-05-09 10:20', screenshot: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400' },
      { id: 2, orderId: '#EB-9919', customer: 'Selam Tesfaye', amount: 120.00, method: 'CBE Birr', date: '2026-05-09 11:45', screenshot: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=400' }
    ]);
  }, []);

  return (
    <div className="p-8 bg-[#FDFCF8] min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#4B2C20] tracking-tight">Payment Verification</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Audit manual bank and mobile transfers</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {payments.map((pay) => (
          <div key={pay.id} className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl flex flex-col md:flex-row gap-8 items-center">
            
            {/* Receipt Preview */}
            <div className="relative w-full md:w-48 aspect-[3/4] bg-gray-50 rounded-[32px] overflow-hidden group cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#006341] transition">
               <img src={pay.screenshot} alt="Receipt" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 backdrop-blur-[2px]">
                  <div className="bg-white p-3 rounded-full shadow-2xl"><Eye size={20} className="text-[#006341]"/></div>
               </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">{pay.orderId}</span>
                    <h3 className="font-black text-xl text-[#4B2C20] mt-2">{pay.customer}</h3>
                  </div>
                  <div className={`p-3 rounded-2xl ${pay.method === 'Telebirr' ? 'bg-[#0088cc]/10 text-[#0088cc]' : 'bg-purple-50 text-purple-600'}`}>
                     {pay.method === 'Telebirr' ? <Smartphone size={20}/> : <Landmark size={20}/>}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                     <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Amount</p>
                     <p className="font-black text-[#006341]">ETB {pay.amount.toFixed(2)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                     <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Date</p>
                     <p className="font-bold text-gray-600 text-xs">{pay.date}</p>
                  </div>
               </div>

               <div className="flex gap-3 pt-2">
                  <button className="flex-1 bg-[#006341] text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg hover:bg-[#004d32] transition">
                     <CheckCircle2 size={16} /> Approve Payment
                  </button>
                  <button className="flex-1 bg-white border border-gray-100 text-red-500 py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-2 hover:bg-red-50 transition">
                     <XCircle size={16} /> Reject
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentVerification;
