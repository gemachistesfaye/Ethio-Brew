import React, { useState } from 'react';
import { 
  CreditCard, CheckCircle, XCircle, Eye, 
  ExternalLink, Clock, AlertCircle, Image as ImageIcon,
  Landmark, Smartphone
} from 'lucide-react';

const PaymentVerification = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const mockPayments = [
    {
      id: 'PAY-7721',
      orderId: '#EB-9022',
      customer: 'Marta Kebede',
      amount: '1,850 ETB',
      method: 'Telebirr',
      date: 'May 09, 2026 14:22',
      proofImage: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&q=80&w=800',
      status: 'Pending'
    },
    {
      id: 'PAY-7720',
      orderId: '#EB-9021',
      customer: 'Abebe Bikila',
      amount: '2,400 ETB',
      method: 'CBE',
      date: 'May 08, 2026 10:45',
      proofImage: 'https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Verification</h1>
        <p className="text-gray-500">Verify manual transfers and approve/reject based on screenshots.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Clock size={16} /> Pending Verifications
          </h3>
          {mockPayments.filter(p => p.status === 'Pending').map(payment => (
            <div 
              key={payment.id} 
              onClick={() => setSelectedPayment(payment)}
              className={`p-6 rounded-[32px] border cursor-pointer transition-all ${
                selectedPayment?.id === payment.id ? 'bg-[#4B2C20] text-white border-[#4B2C20] shadow-xl' : 'bg-white border-gray-100 hover:border-[#4B2C20]/30 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${selectedPayment?.id === payment.id ? 'bg-white/10' : 'bg-gray-50'}`}>
                  {payment.method === 'Telebirr' ? <Smartphone size={24} /> : <Landmark size={24} />}
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${selectedPayment?.id === payment.id ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'}`}>
                  {payment.status}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[10px] font-bold uppercase mb-1 ${selectedPayment?.id === payment.id ? 'text-white/50' : 'text-gray-400'}`}>Transaction ID</p>
                  <p className="text-lg font-black">{payment.id}</p>
                  <p className={`text-xs mt-1 ${selectedPayment?.id === payment.id ? 'text-white/70' : 'text-gray-500'}`}>For Order {payment.orderId}</p>
                </div>
                <p className="text-xl font-black text-[#FFD700]">{payment.amount}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification View */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[700px]">
          {selectedPayment ? (
            <>
              <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl">Verification Details</h3>
                  <button onClick={() => setSelectedPayment(null)} className="text-gray-400 hover:text-black">
                    <XCircle size={24} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Customer</p>
                    <p className="text-sm font-bold">{selectedPayment.customer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Method</p>
                    <p className="text-sm font-bold">{selectedPayment.method}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Date Submitted</p>
                    <p className="text-sm font-bold">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Amount</p>
                    <p className="text-lg font-black text-[#006341]">{selectedPayment.amount}</p>
                  </div>
                </div>
              </div>

              <div className="flex-grow p-8 bg-gray-100/50 flex flex-col gap-4 overflow-hidden">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Payment Screenshot</p>
                <div className="flex-grow rounded-3xl overflow-hidden border-4 border-white shadow-lg relative group">
                   <img src={selectedPayment.proofImage} className="w-full h-full object-contain bg-black" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                     <button className="bg-white text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                       <ImageIcon size={18} /> View Full Size
                     </button>
                   </div>
                </div>
              </div>

              <div className="p-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                <button className="bg-red-50 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
                  <XCircle size={20} /> Reject Payment
                </button>
                <button className="bg-[#006341] text-white py-4 rounded-2xl font-bold hover:bg-[#004d32] transition shadow-lg flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> Approve & Verify
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400 p-12 text-center">
              <div className="bg-gray-50 p-10 rounded-full mb-6">
                <CreditCard size={64} className="opacity-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Payment Selected</h3>
              <p className="text-sm max-w-xs">Select a payment from the left list to verify the screenshot and update order status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;
