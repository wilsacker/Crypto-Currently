const express = require('express');
const { requireLogin, allowGuests } = require('../helpers/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const popularItems = []; // Implement this function
    res.render('homepage', { popularItems });
  } catch (error) {
    console.error("Error fetching popular items:", error);
    res.status(500).json({ error: "Failed to fetch popular items" });
  }
});

router.get('/login', allowGuests, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', allowGuests, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
