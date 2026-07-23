import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, X, CheckCircle, Loader2 } from 'lucide-react';
import { verifyOTP, resendOTP } from '../services/api';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const purpose = searchParams.get('purpose') || 'verify';

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(d => d !== '') && newOtp.join('').length === OTP_LENGTH) {
      handleSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();

    if (pasted.length === OTP_LENGTH) {
      handleSubmit(pasted);
    }
  };

  const handleSubmit = async (code) => {
    if (!code) code = otp.join('');
    if (code.length !== OTP_LENGTH) return;

    setLoading(true);
    setError('');
    try {
      const result = await verifyOTP({ email, code, purpose });

      if (purpose === 'verify') {
        setSuccess(true);
      } else {
        navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${code}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Verification failed';
      setError(msg);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    setError('');
    try {
      await resendOTP({ email, purpose });
      setCountdown(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to resend code';
      setError(msg);
      if (err.response?.data?.waitSeconds) {
        setCountdown(err.response.data.waitSeconds);
      }
    } finally {
      setResending(false);
    }
  };

  const isVerify = purpose === 'verify';
  const title = isVerify ? 'Verify Your Email' : 'Reset Password';
  const subtitle = isVerify
    ? `Enter the 6-digit code sent to ${email}`
    : `Enter the 6-digit code sent to ${email}`;

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-gray-50">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in">
            <X size={18} /> {error}
          </div>
        )}

        {success ? (
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-green-100 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#4B2C20] mb-3">Email Verified!</h2>
            <p className="text-gray-500 mb-6">Your account has been verified. You can now log in.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={loading}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#006341] transition disabled:opacity-50"
                />
              ))}
            </div>

            <button
              onClick={() => handleSubmit()}
              disabled={loading || otp.join('').length !== OTP_LENGTH}
              className="w-full bg-[#006341] text-white py-5 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition flex items-center justify-center gap-2 disabled:opacity-50 mb-6"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : 'Verify Code'}
            </button>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-gray-400">
                  Resend code in <span className="font-bold text-gray-600">{countdown}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm text-[#006341] font-bold hover:underline disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  {resending ? <Loader2 size={14} className="animate-spin" /> : null}
                  {resending ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>
          </>
        )}

        <p className="mt-8 text-center text-sm text-gray-500">
          <Link to={isVerify ? '/register' : '/forgot-password'} className="text-[#006341] font-bold inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
