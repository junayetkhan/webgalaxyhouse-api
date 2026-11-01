const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// লগইন রাউট (সরাসরি পাসওয়ার্ড ম্যাচ, bcrypt ছাড়া)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // ১. ইমেইল দিয়ে ইউজার খোঁজা
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // ২. পাসওয়ার্ড সরাসরি ম্যাচ করা
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // ৩. টোকেন তৈরি
    const token = jwt.sign({ id: user._id }, 'secret_key_123', { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;