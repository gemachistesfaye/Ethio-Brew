import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Save, CheckCircle, Lock, Eye, EyeOff, Camera, Award } from 'lucide-react';
import { getProfile, updateProfile, changePassword } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { useToast } from '../components/Toast';

const SettingsPage = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [passForm, setPassForm] = useState({ current: '', new: '', confirm: '' });
  const [passSaving, setPassSaving] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
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
      await updateProfile({ full_name: profile.full_name || profile.name, phone: profile.phone });
      setSuccess(true);
      addToast(t('settings.update_success') || 'Profile updated!', 'success');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) {
      return addToast(t('auth.passwords_not_match') || "Passwords don't match!", 'error');
    }
    if (passForm.new.length < 8) {
      return addToast('Password must be at least 8 characters', 'error');
    }
    setPassSaving(true);
    try {
      await changePassword({ currentPassword: passForm.current, newPassword: passForm.new });
      setPassSuccess(true);
      addToast(t('settings.password_success') || 'Password updated!', 'success');
      setPassForm({ current: '', new: '', confirm: '' });
      setTimeout(() => setPassSuccess(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update password', 'error');
    } finally {
      setPassSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  if (loading) return <div className="py-20 text-center font-bold text-[#006341]">{t('common.loading')}</div>;

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-50">
        <div className="flex items-center gap-6 mb-10">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 bg-[#006341] text-white rounded-3xl flex items-center justify-center text-3xl font-bold overflow-hidden shadow-lg border-4 border-white">
              {avatar ? <img src={avatar} className="w-full h-full object-cover" alt="Avatar" /> : profile?.name?.charAt(0)}
            </div>
            <label className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer">
              <Camera className="text-white" size={24} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.name}</h1>
            <p className="text-gray-400 text-sm italic">{t('settings.account_type', { type: profile?.role || 'Customer' })}</p>
            {profile?.points > 0 && (
              <p className="text-[#DAA520] text-xs font-bold flex items-center gap-1 mt-1">
                <Award size={12} /> {profile.points} EthioPoints
              </p>
            )}
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-[#006341] rounded-2xl text-sm font-bold flex items-center gap-2 animate-in zoom-in-95">
            <CheckCircle size={18} /> {t('settings.update_success')}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('auth.full_name')}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={profile?.name || ''} 
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('auth.email')}</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-50" size={18} />
              <input 
                disabled value={profile?.email || ''} 
                className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-2xl border-none cursor-not-allowed text-gray-400" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('checkout.phone')}</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                value={profile?.phone || ''} 
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full bg-[#4B2C20] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? t('settings.saving') : t('settings.update_btn')} <Save size={20} />
          </button>
        </form>

        <div className="mt-16 pt-12 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Lock className="text-gray-400" size={20} /> {t('settings.password_title')}
          </h2>
          {passSuccess && (
            <div className="mb-6 p-4 bg-green-50 text-[#006341] rounded-2xl text-sm font-bold flex items-center gap-2 animate-in zoom-in-95">
              <CheckCircle size={18} /> {t('settings.password_success')}
            </div>
          )}
          <form onSubmit={handlePasswordUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('settings.current_password') || 'Current Password'}</label>
              <div className="relative">
                <input 
                  type={showCurrentPass ? 'text' : 'password'} required
                  value={passForm.current} onChange={(e) => setPassForm({...passForm, current: e.target.value})}
                  className="w-full px-6 pr-12 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('settings.new_password')}</label>
              <div className="relative">
                <input 
                  type={showNewPass ? 'text' : 'password'} required
                  value={passForm.new} onChange={(e) => setPassForm({...passForm, new: e.target.value})}
                  className="w-full px-6 pr-12 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gray-400 font-bold uppercase ml-4">{t('settings.confirm_password')}</label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? 'text' : 'password'} required
                  value={passForm.confirm} onChange={(e) => setPassForm({...passForm, confirm: e.target.value})}
                  className="w-full px-6 pr-12 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341]" 
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button 
              type="submit" disabled={passSaving}
              className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {passSaving ? t('settings.updating') : t('settings.password_btn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
