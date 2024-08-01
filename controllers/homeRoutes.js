const express = require('express');
const { requireLogin, allowGuests } = require('../helpers/auth');
const router = express.Router();

// Render homepage
router.get('/', async (req, res) => {
  try {
    
    res.render('homepage',)
  } catch (error) {
    console.error("Error fetching popular items:", error);
    res.status(500).json({ error: "Failed to fetch popular items" });
  }
});

// Render login page, only for guests
router.get('/login', allowGuests, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error("Error rendering login page:", err);
    res.status(500).json(err);
  }
});

// Render signup page, only for guests
router.get('/signup', allowGuests, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    console.error("Error rendering signup page:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
