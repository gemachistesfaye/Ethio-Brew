import React, { useState } from 'react';
import { 
  Package, Clock, CheckCircle2, Truck, 
  Search, Eye, MoreHorizontal, Calendar,
  User, Phone, MapPin, CreditCard
} from 'lucide-react';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const orderStatuses = ['All', 'Pending', 'Verified', 'Processing', 'Delivered'];

  const mockOrders = [
    { 
      id: '#EB-9021', 
      customer: 'Abebe Bikila', 
      date: 'May 08, 2026', 
      total: '2,400 ETB', 
      status: 'Verified',
      items: 3,
      phone: '+251 911 223 344',
      address: 'Bole, Addis Ababa'
    },
    { 
      id: '#EB-9022', 
      customer: 'Marta Kebede', 
      date: 'May 09, 2026', 
      total: '1,850 ETB', 
      status: 'Pending',
      items: 2,
      phone: '+251 922 556 677',
      address: 'Sarbet, Addis Ababa'
    },
    { 
      id: '#EB-9023', 
      customer: 'Dawit Solomon', 
      date: 'May 07, 2026', 
      total: '4,200 ETB', 
      status: 'Processing',
      items: 5,
      phone: '+251 933 889 900',
      address: 'Adama, Ethiopia'
    },
    { 
      id: '#EB-9020', 
      customer: 'Selam Gebre', 
      date: 'May 05, 2026', 
      total: '850 ETB', 
      status: 'Delivered',
      items: 1,
      phone: '+251 944 112 233',
      address: 'Bahar Dar, Ethiopia'
    }
  ];

  const filteredOrders = mockOrders.filter(o => activeTab === 'All' || o.status === activeTab);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Verified': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Delivered': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={14} />;
      case 'Verified': return <CheckCircle2 size={14} />;
      case 'Processing': return <Truck size={14} />;
      case 'Delivered': return <Package size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500">Track and update the lifecycle of customer orders.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          {orderStatuses.map(s => (
            <button
              key={s}
              onClick={() => setActiveTab(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === s ? 'bg-[#4B2C20] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <Package className="text-[#4B2C20]" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-gray-900">{order.id}</span>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {order.date}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {order.customer}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:border-l lg:pl-8 flex-grow">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Contact</p>
                  <p className="text-sm font-bold flex items-center gap-1"><Phone size={14} className="text-gray-300"/> {order.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Location</p>
                  <p className="text-sm font-bold flex items-center gap-1"><MapPin size={14} className="text-gray-300"/> {order.address}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Items</p>
                  <p className="text-sm font-bold">{order.items} items</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Price</p>
                  <p className="text-lg font-black text-[#006341]">{order.total}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-grow lg:flex-none bg-gray-50 text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                  <Eye size={18} /> Details
                </button>
                <div className="relative group/menu">
                  <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-black transition">
                    <MoreHorizontal size={20} />
                  </button>
                  {/* Dropdown Menu (Hidden by default, shown on hover/click) */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 hidden group-hover/menu:block z-20 overflow-hidden">
                    {['Pending', 'Verified', 'Processing', 'Delivered'].map(status => (
                      <button 
                        key={status}
                        className="w-full text-left px-4 py-3 text-xs font-bold hover:bg-gray-50 transition border-b border-gray-50 last:border-none flex items-center gap-2"
                        onClick={() => console.log(`Moving to ${status}`)}
                      >
                        {getStatusIcon(status)} Move to {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
