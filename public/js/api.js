const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // For node-fetch v2.x. For v3.x, use dynamic import.

const apiKeyCrypto = "3E0B077E-BFB7-4E8B-AA9F-CC737B90C419";
const baseUrlCrypto = "https://rest.coinapi.io/v1/";

const apiKeyCurrency = "fca_live_lcB5KgViVtG6E9M7fglQ5KVkLn71CudXQWCZ1Bdq";
const baseUrlCurrency = "https://api.freecurrencyapi.com/v1/latest?";

// Example function to fetch popular items
async function getPopularItems() {
  // For demonstration purposes, returning a static list
  // Replace with your logic to fetch real popular items
  return ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin', 'Cardano', 'Polkadot', 'Chainlink', 'Stellar', 'Solana', 'Dogecoin'];
}

router.get('/popular-items', async (req, res) => {
  try {
    const popularItems = await getPopularItems(); // Fetch or generate your popular items here
    res.json({ popularItems });
  } catch (error) {
    console.error("Error fetching popular items:", error);
    res.status(500).json({ error: "Failed to fetch popular items" });
  }
});

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
