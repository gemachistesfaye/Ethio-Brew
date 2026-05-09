import React from 'react';
import { 
  TrendingUp, ShoppingBag, Users, Clock, 
  ArrowUpRight, ArrowDownRight, Coffee
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Revenue', value: '450,200 ETB', change: '+12.5%', icon: <TrendingUp className="text-green-500" />, trend: 'up' },
    { label: 'Total Orders', value: '1,284', change: '+8.2%', icon: <ShoppingBag className="text-blue-500" />, trend: 'up' },
    { label: 'Active Users', value: '852', change: '-2.4%', icon: <Users className="text-purple-500" />, trend: 'down' },
    { label: 'Pending Payments', value: '42', change: 'Action Required', icon: <Clock className="text-orange-500" />, trend: 'neutral' },
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (ETB)',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        fill: true,
        backgroundColor: 'rgba(0, 99, 65, 0.1)',
        borderColor: '#006341',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Super Admin. Here's what's happening today.</p>
        </div>
        <button className="bg-[#4B2C20] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition flex items-center gap-2">
          <ArrowUpRight size={18} /> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl">{stat.icon}</div>
              <div className={`flex items-center gap-1 text-xs font-bold ${
                stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-orange-500'
              }`}>
                {stat.trend === 'up' && <ArrowUpRight size={14} />}
                {stat.trend === 'down' && <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-8">Revenue Performance</h3>
          {/* <div className="h-64">
            <Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }} />
          </div> */}
          <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 italic">
            Chart temporarily disabled for debugging...
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-6">Best Selling Coffee</h3>
          <div className="space-y-6">
            {[
              { name: 'Yirgacheffe Special', sales: '452 units', price: '384,200 ETB' },
              { name: 'Sidamo Sun-Dried', sales: '324 units', price: '233,280 ETB' },
              { name: 'Harrar Bold', sales: '212 units', price: '89,040 ETB' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FDFCF8] rounded-2xl flex items-center justify-center border border-gray-50">
                  <Coffee className="text-[#4B2C20]" size={20} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">{item.sales}</p>
                </div>
                <p className="text-sm font-bold text-[#006341]">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <button className="text-[#006341] font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-50">
                <th className="pb-4 font-bold">Order ID</th>
                <th className="pb-4 font-bold">Customer</th>
                <th className="pb-4 font-bold">Amount</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { id: '#EB-9021', customer: 'Abebe Bikila', amount: '2,400 ETB', status: 'verified', color: 'bg-green-100 text-green-700' },
                { id: '#EB-9022', customer: 'Marta Kebede', amount: '1,850 ETB', status: 'pending', color: 'bg-orange-100 text-orange-700' },
                { id: '#EB-9023', customer: 'Dawit Solomon', amount: '4,200 ETB', status: 'processing', color: 'bg-blue-100 text-blue-700' },
              ].map((order, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition">
                  <td className="py-4 text-sm font-mono font-bold">{order.id}</td>
                  <td className="py-4 text-sm font-bold">{order.customer}</td>
                  <td className="py-4 text-sm font-bold">{order.amount}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gray-400 hover:text-black transition"><ArrowUpRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
