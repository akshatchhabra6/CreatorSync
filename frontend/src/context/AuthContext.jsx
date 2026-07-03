import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cs_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cs_token') || null);

  useEffect(() => {
    if (token) localStorage.setItem('cs_token', token);
    else localStorage.removeItem('cs_token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('cs_user', JSON.stringify(user));
    else localStorage.removeItem('cs_user');
  }, [user]);

  const login = ({ token: newToken, user: newUser }) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
