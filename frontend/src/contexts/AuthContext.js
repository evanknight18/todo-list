import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    return user && user !== 'undefined' ? JSON.parse(user) : null;
  };

  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: getUserFromLocalStorage()
  });

  useEffect(() => {
    if (authState.token) {
      localStorage.setItem('token', authState.token);
      localStorage.setItem('user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [authState.token, authState.user]);

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      setAuthState({
        token: res.data.token,
        isAuthenticated: true,
        user: userData
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Registered successfully!');
    } catch (err) {
      console.error(err.response.data);
      toast.error('Registration failed.');
    }
  };
  
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      setAuthState({
        token: res.data.token,
        isAuthenticated: true,
        user: userData
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully!');
    } catch (err) {
      console.error(err.response.data);
      toast.error('Login failed.');
    }
  };
  
  

  const logout = () => {
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ authState, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
