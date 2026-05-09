import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Coffee, Package, CreditCard, 
  Users, BarChart3, Settings, LogOut, Bell, Search
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const AdminLayout = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Coffee size={20} />, label: 'Products' },
    { path: '/admin/orders', icon: <Package size={20} />, label: 'Orders' },
    { path: '/admin/payments', icon: <CreditCard size={20} />, label: 'Payments' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B2C20] text-white flex-shrink-0 flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <Coffee className="text-[#FFD700]" />
          <span className="text-xl font-bold tracking-tight">{t('nav.brand')} <span className="text-[#FFD700] text-[10px] uppercase">Admin</span></span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'bg-[#FFD700] text-[#4B2C20] font-bold shadow-lg shadow-[#FFD700]/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="text-sm">{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-96">
            <Search size={18} className="text-gray-400" />
            <input type="text" placeholder="Search orders, products..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-black transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right">
                <p className="text-xs font-bold">Admin</p>
                <p className="text-[10px] text-gray-400">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#006341] text-white flex items-center justify-center font-bold">A</div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
