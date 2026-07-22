import React, { useState, useEffect } from 'react';
import { User, Shield, ShieldCheck, Ban, Trash2, Search, Mail, Phone } from 'lucide-react';
import api from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data.users || res.data);
    } catch (err) {
      console.error('Failed to load users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (userId) => {
    if (!window.confirm('Block this user?')) return;
    try {
      await api.put(`/admin/users/${userId}/block`);
      fetchUsers();
    } catch (err) {
      alert('Failed to block user');
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/unblock`);
      fetchUsers();
    } catch (err) {
      alert('Failed to unblock user');
    }
  };

  const handlePromote = async (userId) => {
    const roleId = window.prompt('Enter role ID (2=admin, 3=coffee_manager, 4=delivery_staff):');
    if (!roleId) return;
    try {
      await api.put('/admin/users/role', { userId, roleId: parseInt(roleId) });
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const filtered = users.filter(u =>
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#FDFCF8] min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-[#4B2C20] tracking-tight">Customer Relations</h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Manage user roles and permissions</p>
        </div>
        <div className="relative w-72">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 outline-none focus:ring-2 focus:ring-[#006341] transition shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-50 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">User</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-bold">Loading users...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="4" className="px-8 py-12 text-center text-gray-400 font-bold">No users found</td></tr>
            ) : filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[#006341] text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-md">
                        {(user.full_name || '?').charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <p className="font-black text-[#4B2C20]">{user.full_name}</p>
                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                     </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${user.is_blocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                     {user.is_blocked ? <Ban size={12}/> : <User size={12}/>}
                     {user.is_blocked ? 'blocked' : 'active'}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col gap-1">
                     <p className="text-xs font-bold text-gray-600 flex items-center gap-2"><Phone size={12}/> {user.phone || 'N/A'}</p>
                     <p className="text-xs font-bold text-gray-600 flex items-center gap-2"><Mail size={12}/> {user.email}</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handlePromote(user.id)} className="p-3 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-purple-600 hover:border-purple-200 transition shadow-sm" title="Change Role">
                         <Shield size={16} />
                      </button>
                      {user.is_blocked ? (
                        <button onClick={() => handleUnblock(user.id)} className="p-3 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-green-600 hover:border-green-200 transition shadow-sm" title="Unblock User">
                           <ShieldCheck size={16} />
                        </button>
                      ) : (
                        <button onClick={() => handleBlock(user.id)} className="p-3 bg-white rounded-xl border border-gray-100 text-gray-400 hover:text-orange-500 hover:border-orange-200 transition shadow-sm" title="Block User">
                           <Ban size={16} />
                        </button>
                      )}
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
