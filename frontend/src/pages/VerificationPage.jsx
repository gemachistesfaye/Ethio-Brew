import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import authService from '../services/authService';

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId;
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    if (!userId) return navigate('/register');
    setLoading(true);
    try {
      await authService.verify(userId);
      setVerified(true);
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
            <p className="text-gray-500 mb-10">We've sent a simulation of a verification link. Please click below to verify your account for production use.</p>
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
            <p className="text-gray-500 mb-10">Your account has been verified. You can now login to your Ethio-Brew account.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2"
            >
              Go to Login <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
