import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, email, password } = location.state || {};
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    if (!userId) return navigate('/register');
    setLoading(true);
    try {
      await authService.verify(userId);
      if (email && password) {
        await login({ email, password });
      }
      setVerified(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-50">
        {!verified ? (
          <>
            <div className="w-20 h-20 bg-[#FFD700]/10 text-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Verify Account</h1>
            <p className="text-gray-500 mb-10">We've sent a simulation of a verification link to <span className="font-bold text-gray-800">{email}</span>. Please click below to verify your account and automatically log in for production use.</p>
            <button 
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Complete Verification'}
            </button>
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Success!</h1>
            <p className="text-gray-500 mb-10">Your account has been verified and you are now logged in. Redirecting to home...</p>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-[#006341] animate-[progress_2s_ease-in-out_forwards]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
