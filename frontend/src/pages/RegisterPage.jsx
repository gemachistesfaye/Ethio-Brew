import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, X, CheckCircle } from 'lucide-react';
import { register } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError(t('auth.passwords_not_match'));
    }

    setLoading(true);
    try {
      await register(formData);
      setRegistered(true);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors?.length) {
        setError(data.errors.map(e => e.message).join('. '));
      } else {
        setError(data?.message || t('auth.error_general'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.register_title')}</h1>
          <p className="text-gray-500">Join the {t('nav.brand')} community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in-95">
            <X size={18} /> {error}
          </div>
        )}

        {!registered ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="name" required placeholder={t('auth.full_name')} 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="email" type="email" required placeholder={t('auth.email')} 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="phone" required placeholder={t('checkout.phone')} 
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="password" type={showPassword ? 'text' : 'password'} required placeholder={t('auth.password')} 
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required placeholder={t('auth.confirm_password')} 
              onChange={handleChange}
              className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? t('auth.creating_account') : t('auth.sign_up')} <ArrowRight size={20} />
          </button>
        </form>
        ) : (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#4B2C20] mb-3">Check Your Email!</h2>
            <p className="text-gray-500 mb-2">We've sent a verification link to</p>
            <p className="font-bold text-[#4B2C20] mb-6">{formData.email}</p>
            <p className="text-sm text-gray-400 mb-8">Click the link in the email to verify your account, then come back to log in.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition"
            >
              Go to Login
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          {t('auth.already_have_account')} <Link to="/login" className="text-[#006341] font-bold">{t('auth.sign_in')}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
