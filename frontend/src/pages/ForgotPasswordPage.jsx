import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, X } from 'lucide-react';
import { forgotPassword } from '../services/api';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await forgotPassword(email);
      navigate(`/verify-otp?email=${encodeURIComponent(email)}&purpose=reset`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-50">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-500">Enter your email to receive a reset code</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
            <X size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="email" required placeholder="Email Address" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !email}
            className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Sending Code...' : 'Send Reset Code'} <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Remembered your password? <Link to="/login" className="text-[#006341] font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
