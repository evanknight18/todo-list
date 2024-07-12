const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

// Example of a protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
