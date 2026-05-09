import React from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, Box, Users, CreditCard, 
  Settings, LogOut, ChevronLeft, LayoutDashboard,
  Coffee
} from 'lucide-react';
import DashboardOverview from './AdminDashboard'; // We'll rename the current one to this

const AdminLayout = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Overview', icon: <LayoutDashboard size={20} />, path: '' },
    { label: 'Products', icon: <Box size={20} />, path: 'products' },
    { label: 'Customers', icon: <Users size={20} />, path: 'users' },
    { label: 'Payments', icon: <CreditCard size={20} />, path: 'payments' },
    { label: 'Settings', icon: <Settings size={20} />, path: 'settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#FDFCF8]">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-[#4B2C20] text-white p-8 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#4B2C20]">
            <Coffee size={24} />
          </div>
          <div>
            <p className="font-black text-xl leading-tight text-white">Ethio-Brew</p>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Admin Command</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              to={`/admin/${item.path}`}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-white/10 transition-all font-bold text-sm tracking-wide group"
            >
              <span className="text-white/40 group-hover:text-[#FFD700] transition-colors">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
           <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl hover:bg-white/10 transition text-sm font-bold text-white/60"
           >
             <ChevronLeft size={20} /> Back to Store
           </button>
           <button 
            className="flex items-center gap-4 px-5 py-4 w-full rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm font-bold"
           >
             <LogOut size={20} /> Exit Admin
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/products" element={<div className="p-20 text-3xl font-black text-[#4B2C20]">Product Management (Building...)</div>} />
          <Route path="/users" element={<div className="p-20 text-3xl font-black text-[#4B2C20]">User Management (Building...)</div>} />
          <Route path="/payments" element={<div className="p-20 text-3xl font-black text-[#4B2C20]">Payment Verification (Building...)</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminLayout;
