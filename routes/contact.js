const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// কন্টাক্ট ফর্ম সাবমিট
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// সব মেসেজ দেখা (ড্যাশবোর্ডের জন্য)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;