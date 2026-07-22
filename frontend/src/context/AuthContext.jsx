import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout, getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * SECURITY: do not blindly trust whatever is in localStorage. On app load we
   * call /auth/profile with the stored token; if the server rejects it the
   * session is cleared. This prevents a forged localStorage `user` object from
   * granting admin UI access on the client.
   */
  const verifySession = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      setLoading(false);
      return;
    }

    try {
      const profile = await getProfile();
      // Use the server-authoritative user object, not the local copy.
      if (profile?.user) {
        setUser(profile.user);
        localStorage.setItem('user', JSON.stringify(profile.user));
      }
    } catch (err) {
      // 401/403 or network — treat as logged out.
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
