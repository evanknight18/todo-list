const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes')); // Correct path

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
