import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Package, Clock, Truck, CheckCircle, XCircle, ChevronRight, Loader2 } from 'lucide-react';
import { getOrders } from '../services/api';

const statusConfig = {
  'Pending': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending' },
  'Payment Verified': { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Verified' },
  'Roasting': { icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Roasting' },
  'Packaging': { icon: Package, color: 'text-orange-600', bg: 'bg-orange-50', label: 'Packaging' },
  'Shipping': { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Shipping' },
  'Delivered': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Delivered' },
  'Cancelled': { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
};

const OrdersPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 size={32} className="animate-spin text-[#006341] mx-auto mb-4" />
        <p className="text-gray-400 font-bold">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#4B2C20]">My Orders</h1>
        <p className="text-gray-400 text-sm mt-1">Track and manage your coffee orders</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-[40px] border border-gray-50 shadow-sm text-center">
          <Package size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h2>
          <p className="text-gray-400 mb-6">Start exploring our premium Ethiopian coffees!</p>
          <button onClick={() => navigate('/shop')} className="bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#004d32] transition">
            Browse Coffee
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const cfg = statusConfig[order.status] || statusConfig['Pending'];
            const StatusIcon = cfg.icon;
            const created = new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric'
            });

            return (
              <div key={order.id} className="bg-white rounded-[32px] border border-gray-50 shadow-sm p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${cfg.bg} ${cfg.color} rounded-2xl flex items-center justify-center`}>
                      <StatusIcon size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-[#4B2C20]">#{order.id?.slice(0, 8) || order.id}</span>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${cfg.bg} ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{created}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#4B2C20]">ETB {Number(order.total_amount).toFixed(2)}</p>
                    {order.tracking_number && (
                      <p className="text-[10px] text-gray-400 font-mono mt-1">Track: {order.tracking_number}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
