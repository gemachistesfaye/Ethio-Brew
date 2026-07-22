import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, X } from 'lucide-react';
import { verify } from '../services/api';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (token && !verified && !loading && !error) {
      handleVerify();
    }
  }, [token]);

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
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired verification token.');
    } finally {
      setLoading(false);
    }
  };

  if (!token && !verified) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center border border-gray-50">
          <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-8">
            <X size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Invalid Link</h1>
          <p className="text-gray-500 mb-8">
            This verification link is invalid. Please check your email for the correct link.
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
            <h1 className="text-3xl font-bold mb-4">Verifying Your Account</h1>
            <p className="text-gray-500 mb-10">
              Please wait while we verify your email address...
            </p>
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                <X size={18} /> {error}
              </div>
            )}
            {error && (
              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Try Again'}
              </button>
            )}
          </>
        ) : (
          <div className="animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Account Verified!</h1>
            <p className="text-gray-500 mb-8">Your email has been confirmed. You can now log in to your account.</p>
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
