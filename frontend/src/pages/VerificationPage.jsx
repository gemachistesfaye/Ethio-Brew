import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { verify } from '../services/api';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // The signed verification token now arrives from the email link.
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      setError('Missing verification token. Please use the link from your email.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await verify(token);
      setVerified(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification token.');
    } finally {
      setLoading(false);
    }
  };

  // No token in the URL means the user navigated here manually.
  if (!token && !verified) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-50">
          <h1 className="text-3xl font-bold mb-4">Verify Account</h1>
          <p className="text-gray-500 mb-8">
            We sent a verification link to your email. Please open it to verify your account.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-50">
        {!verified ? (
          <>
            <div className="w-20 h-20 bg-[#FFD700]/10 text-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Verify Account</h1>
            <p className="text-gray-500 mb-10">
              Click below to confirm your email address and activate your Ethio-Brew account.
            </p>
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold">
                {error}
              </div>
            )}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Complete Verification'} <ArrowRight size={20} className="inline" />
            </button>
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Success!</h1>
            <p className="text-gray-500 mb-10">Your account has been verified. Redirecting to login...</p>
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
