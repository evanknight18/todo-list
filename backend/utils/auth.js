// backend/utils/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

// Function to generate a token for a user
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
};

module.exports = {
  generateToken
};
