import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle, Lock } from 'lucide-react';
import authService from '../services/authService';

const SettingsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await authService.updateProfile(profile);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-[#006341]">Loading Profile...</div>;

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-50">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-[#006341] text-white rounded-3xl flex items-center justify-center text-2xl font-bold">
            {profile?.name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.name}</h1>
            <p className="text-gray-400 text-sm italic">{profile?.role} Account</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-[#006341] rounded-2xl text-sm font-bold flex items-center gap-2 animate-in zoom-in-95">
            <CheckCircle size={18} /> Profile updated successfully!
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={profile?.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-50" size={18} />
              <input 
                disabled value={profile?.email} 
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border-none cursor-not-allowed text-gray-400" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={profile?.phone} 
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">Delivery Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={profile?.address} 
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-[#4B2C20] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Profile'} <Save size={20} />
          </button>
        </form>

        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Lock className="text-gray-400" size={20} /> Change Password
          </h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">New Password</label>
              <input 
                type="password" 
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
                placeholder="••••••••"
              />
            </div>
            <button 
              type="button"
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-200 transition"
              onClick={() => alert('Password change simulation initiated.')}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
