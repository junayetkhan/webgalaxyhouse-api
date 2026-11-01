const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// সব প্রজেক্ট দেখা
router.get('/', async (req, res) => {
  try {
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// নতুন প্রজেক্ট তৈরি
router.post('/', async (req, res) => {
  try {
    const newProject = new Portfolio(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// প্রজেক্ট ডিলিট
router.delete('/:id', async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;