import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const now = new Date();
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedId = localStorage.getItem('id');
    if (savedToken && savedId) {
      setIsLoggedIn(true);
      setToken(savedToken);
      setUserId(savedId);
    }
  }, []);

  const handleLogin = (token, id) => {
    const item = {
      value: token,
      expiry: now.getTime() + (60 * 60 * 60)
    }
    setIsLoggedIn(true);
    setToken(token);
    setUserId(id);
    localStorage.setItem('token', JSON.stringify(item));
    localStorage.setItem('id', id);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    setUserId('');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userId, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};