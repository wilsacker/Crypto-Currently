const express = require('express');
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

module.exports = router;