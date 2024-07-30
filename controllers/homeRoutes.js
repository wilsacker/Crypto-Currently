const express = require('express');
const { CryptoCurrency, User } = require('../models');
const { requireLogin, allowGuests } = require('../helpers/auth');
const router = express.Router();
const { fetchCryptoData, fetchCurrencyData } = require('../path/to/fetchData');

router.get('/crypto', async (req, res) => {
  try {
    const cryptoData = await fetchCryptoData();
    res.json({ cryptoData });
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
});

router.get('/currency', async (req, res) => {
  try {
    const currencyData = await fetchCurrencyData();
    res.json({ currencyData });
  } catch (error) {
    console.error("Error fetching currency data:", error);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

router.get('/login', allowGuests, (req, res) => {
  try {
    // Render the login view
    res.render('login');
  } catch (err) {
    // Respond with a 500 status code and error message if rendering fails
    res.status(500).json(err);
  }
});

// Route to render the signup page, allowing guests (unauthenticated users)
router.get('/signup', allowGuests, (req, res) => {
  try {
    // Render the signup view
    res.render('signup');
  } catch (err) {
    // Respond with a 500 status code and error message if rendering fails
    res.status(500).json(err);
  }
});

module.exports = router;