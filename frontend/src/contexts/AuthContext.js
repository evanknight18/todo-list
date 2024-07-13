import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false
  });

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      setAuthState({
        token: res.data.token,
        isAuthenticated: true
      });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      setAuthState({
        token: res.data.token,
        isAuthenticated: true
      });
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const logout = () => {
    setAuthState({
      token: null,
      isAuthenticated: false
    });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
