const { fetchCryptoData, fetchCurrencyData } = require('./coinApiRoutes') 
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const itemsData = await fetchCryptoData(req.query.symbol)
        res.json(itemsData)
    } catch (error) {
        console.error("Error fetching popular items:", error);
        res.status(500).json({ error: "Failed to fetch popular items" });
    }
});

module.exports = router;


