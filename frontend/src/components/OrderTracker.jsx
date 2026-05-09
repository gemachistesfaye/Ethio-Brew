import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Clock, Package, Truck, 
  MapPin, Flame, ShoppingBag 
} from 'lucide-react';

const statuses = [
  { id: 'Pending', label: 'Order Received', icon: <ShoppingBag />, color: 'bg-blue-500' },
  { id: 'Verified', label: 'Payment Verified', icon: <CheckCircle2 />, color: 'bg-green-500' },
  { id: 'Roasting', label: 'Roasting', icon: <Flame />, color: 'bg-orange-500' },
  { id: 'Packaging', label: 'Packaging', icon: <Package />, color: 'bg-amber-500' },
  { id: 'Shipping', label: 'Shipping', icon: <Truck />, color: 'bg-purple-500' },
  { id: 'Delivered', label: 'Delivered', icon: <MapPin />, color: 'bg-[#006341]' }
];

const OrderTracker = ({ currentStatus = 'Roasting', orderId = '#EB-12345' }) => {
  const currentIndex = statuses.findIndex(s => s.id === currentStatus) || 0;

  return (
    <div className="bg-white p-10 md:p-16 rounded-[64px] shadow-2xl border border-gray-100 max-w-5xl mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#006341]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
           <div>
              <h2 className="text-3xl font-black text-[#4B2C20]">Track Your Brew</h2>
              <p className="text-gray-400 mt-1 uppercase tracking-widest text-xs font-bold">Order ID: {orderId}</p>
           </div>
           <div className="bg-[#006341]/10 text-[#006341] px-6 py-3 rounded-2xl font-black flex items-center gap-2">
              <div className="w-2 h-2 bg-[#006341] rounded-full animate-pulse" />
              Est. Delivery: Tomorrow, 4 PM
           </div>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative">
           {/* Progress Line Background */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
           
           {/* Active Progress Line */}
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
             transition={{ duration: 1.5, ease: "circOut" }}
             className="absolute top-1/2 left-0 h-1 bg-[#006341] -translate-y-1/2 rounded-full z-10 shadow-[0_0_15px_rgba(0,99,65,0.4)]"
           />

           <div className="relative z-20 flex justify-between">
              {statuses.map((step, i) => (
                <div key={i} className="flex flex-col items-center group">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-xl ${i <= currentIndex ? 'bg-[#006341] text-white' : 'bg-white text-gray-300'}`}
                   >
                     {React.cloneElement(step.icon, { size: 24 })}
                   </motion.div>
                   <p className={`mt-6 text-xs font-black uppercase tracking-widest transition-all ${i <= currentIndex ? 'text-[#4B2C20]' : 'text-gray-300'}`}>
                      {step.label}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-8 relative">
           <div className="absolute left-7 top-0 w-0.5 h-full bg-gray-100" />
           {statuses.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 relative"
              >
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center z-10 shadow-lg border-2 border-white ${i <= currentIndex ? 'bg-[#006341] text-white' : 'bg-white text-gray-300'}`}>
                    {React.cloneElement(step.icon, { size: 20 })}
                 </div>
                 <div>
                    <p className={`text-sm font-black uppercase tracking-widest ${i <= currentIndex ? 'text-[#4B2C20]' : 'text-gray-300'}`}>{step.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{i < currentIndex ? 'Completed' : i === currentIndex ? 'In Progress' : 'Upcoming'}</p>
                 </div>
              </motion.div>
           ))}
        </div>

        {/* Live Status Description */}
        <div className="mt-20 p-8 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#4B2C20] shrink-0 shadow-lg">
              <Flame size={32} />
           </div>
           <div>
              <h4 className="text-xl font-bold text-[#4B2C20] mb-1">Your beans are in the roaster!</h4>
              <p className="text-gray-500 leading-relaxed text-sm">Our coffee masters are currently roasting your order in small batches to ensure maximum freshness and flavor profile development. Next step: Careful packaging.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
