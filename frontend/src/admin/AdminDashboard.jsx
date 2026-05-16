import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  Package, CheckCircle, Clock, AlertCircle, Download, Smile
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch analytics from API
    const fetchAnalytics = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/analytics`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    fetchAnalytics();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await fetch(`${API_URL}/admin/orders/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ orderId, status: newStatus })
      });
      alert(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
    }
  };

  const COLORS = ['#006341', '#FFD700', '#4B2C20', '#A52A2A'];

  if (loading) return <div className="p-20 text-center font-bold text-[#4B2C20] animate-pulse italic">Brewing your business insights...</div>;
  
  if (!data || !data.overview) return (
    <div className="p-20 text-center text-red-500 font-bold">
      Failed to load analytics. Please ensure your backend is running and you are logged in as admin.
    </div>
  );

  return (
    <div className="p-8 bg-[#FDFCF8] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-[#4B2C20]">Business Intelligence</h1>
            <p className="text-gray-400 mt-1 uppercase tracking-widest text-xs font-bold">Ethio-Brew Command Center</p>
          </div>
          <button className="flex items-center gap-2 bg-[#4B2C20] text-white px-6 py-3 rounded-2xl font-bold hover:scale-105 transition shadow-xl">
             <Download size={18} />
             Export PDF Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: `ETB ${data.overview.totalRevenue.toLocaleString()}`, icon: <DollarSign />, color: 'bg-green-500', growth: `+${data.overview.revenueGrowth}%` },
            { label: 'Total Orders', value: data.overview.totalOrders, icon: <ShoppingBag />, color: 'bg-amber-500', growth: `+${data.overview.orderGrowth}%` },
            { label: 'Active Users', value: data.overview.totalUsers, icon: <Users />, color: 'bg-blue-500', growth: `+${data.overview.userGrowth}%` },
            { label: 'Subscriptions', value: data.overview.activeSubscriptions, icon: <TrendingUp />, color: 'bg-purple-500', growth: 'Stable' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6"
            >
              <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-[#4B2C20]">{stat.value}</p>
                <p className="text-[10px] font-bold text-green-500 mt-1">{stat.growth} vs last month</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Revenue Area Chart */}
           <div className="lg:col-span-2 bg-white p-10 rounded-[48px] shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#4B2C20] mb-8">Revenue Performance</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.salesTrends}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#006341" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#006341" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} 
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#006341" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Regional Demand Pie Chart */}
           <div className="bg-[#4B2C20] p-10 rounded-[48px] shadow-2xl text-white">
              <h3 className="text-xl font-bold mb-8">Regional Demand</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.regionalDemand}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="percentage"
                    >
                      {data.regionalDemand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                 {data.regionalDemand.map((d, i) => (
                   <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}} />
                        <span className="text-white/60">{d.region}</span>
                      </div>
                      <span className="font-bold">{d.percentage}%</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* AI Sentiment Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-[#4B2C20] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                 <TrendingUp size={160} />
              </div>
              <div className="relative z-10">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-[#FFD700]">AI Sentiment Analysis</h3>
                 <div className="space-y-8">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                          <Smile size={32} className="text-green-400" />
                       </div>
                       <div>
                          <p className="text-3xl font-black">88% Positive</p>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Global Customer Satisfaction</p>
                       </div>
                    </div>
                    
                    <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 italic text-sm text-white/80 leading-relaxed shadow-inner">
                       "AI analysis of 240 recent reviews indicates a strong trend: Customers in **Addis Ababa** are increasingly preferring **Light Roasts** with floral notes. Recommended action: Boost stock of **Yirgacheffe** beans by 15%."
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[48px] p-10 border border-gray-100 shadow-sm flex flex-col justify-center">
              <h3 className="text-xl font-bold text-[#4B2C20] mb-6">Market Trends</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Yirgacheffe Demand', val: '92%', color: 'bg-green-500' },
                   { label: 'Sidama Retention', val: '78%', color: 'bg-amber-500' },
                   { label: 'Subscription Growth', val: '64%', color: 'bg-purple-500' }
                 ].map((trend, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                         <span>{trend.label}</span>
                         <span>{trend.val}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                         <div className={`h-full ${trend.color}`} style={{width: trend.val}} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Recent Orders Management */}
        <div className="bg-white p-10 rounded-[48px] shadow-sm border border-gray-100 overflow-hidden">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-[#4B2C20]">Live Order Management</h3>
              <div className="flex gap-2">
                 <span className="bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase">12 Pending</span>
                 <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase">5 Shipped</span>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                    <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                    <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Total</th>
                    <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data.recentOrders?.map((order, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition">
                        <td className="py-6 font-bold text-[#4B2C20]">{order.id}</td>
                        <td className="py-6 text-gray-500 font-medium">{order.customer_name}</td>
                        <td className="py-6 font-bold text-xs uppercase tracking-widest">{order.payment_method}</td>
                        <td className="py-6">
                           <select 
                            defaultValue={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className={`p-2 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-[#006341] ${
                              order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 
                              order.status === 'Pending' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                            }`}
                           >
                              <option>Pending</option>
                              <option>Payment Verified</option>
                              <option>Roasting</option>
                              <option>Packaging</option>
                              <option>Shipping</option>
                              <option>Delivered</option>
                           </select>
                        </td>
                        <td className="py-6">
                          <button className="text-[#006341] font-bold text-xs hover:underline">View Details</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
