// frontend/src/components/Login.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userData, setUserData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData);
  };

  return (
    <div className="flex justify-center items-center bg-gray-800 p-8 min-h-full">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
