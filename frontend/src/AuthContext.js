// frontend/src/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const register = async (username, password) => {
    try {
      await axios.post('/api/auth/register', { username, password });
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      setAuth(response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
