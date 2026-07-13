import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="w-24 h-24 bg-[#006341]/10 text-[#006341] rounded-full flex items-center justify-center mx-auto mb-8">
                    <Coffee size={48} />
                </div>
                <h1 className="text-6xl font-black text-[#4B2C20] mb-2">404</h1>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[#006341] text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-[#004d32] transition"
                >
                    <ArrowLeft size={18} /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
