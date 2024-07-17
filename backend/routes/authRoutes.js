const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/auth'); // Correct import
const e = require('express');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log('Received registration request:', { username, password, email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });

        await newUser.save();
        const token = generateToken(newUser);

        console.log('User registered successfully:', newUser);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Error creating user', message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Error logging in', message: error.message });
    }
});

module.exports = router;
