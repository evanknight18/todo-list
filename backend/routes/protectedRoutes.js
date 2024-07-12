// backend/routes/protectedRoutes.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

module.exports = router;
