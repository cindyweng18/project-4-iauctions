import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};