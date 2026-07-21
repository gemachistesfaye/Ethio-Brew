import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../hooks/useTranslation';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(formData);
      if (res?.user?.roles?.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError(t('auth.verify_email_required') || 'Please verify your email first. Check your inbox for the verification link.');
      } else {
        setError(err.response?.data?.message || t('auth.error_general'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.login_title')}</h1>
          <p className="text-gray-500">Sign in to your {t('nav.brand')} account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
            <X size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="email" type="email" required placeholder={t('auth.email')} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="password" type="password" required placeholder={t('auth.password')} 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-[#006341] font-bold hover:underline">{t('auth.forgot_password')}</Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? t('auth.loading') : t('auth.sign_in')} <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {t('auth.dont_have_account')} <Link to="/register" className="text-[#006341] font-bold">{t('auth.sign_up')}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
