import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps a route to require an authenticated user. Optionally requires a
 * specific role (e.g. 'admin'). If the session is still being verified we
 * show a minimal loader; if not authenticated we redirect to /login.
 */
const ProtectedRoute = ({ children, requireRole }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCF8] flex items-center justify-center">
                <div className="text-[#006341] font-bold animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    if (requireRole && !(user.roles || []).includes(requireRole)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
