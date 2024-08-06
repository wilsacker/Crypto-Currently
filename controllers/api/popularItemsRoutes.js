const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const popularItems = [
            { name: 'Bitcoin', abbreviation: 'BTC' },
            { name: 'Ethereum', abbreviation: 'ETH' },
            { name: 'Ripple', abbreviation: 'XRP' },
            { name: 'Litecoin', abbreviation: 'LTC' },
            { name: 'Cardano', abbreviation: 'ADA' },
            { name: 'Polkadot', abbreviation: 'DOT' },
            { name: 'Chainlink', abbreviation: 'LINK' },
            { name: 'Stellar', abbreviation: 'XLM' },
            { name: 'Solana', abbreviation: 'SOL' },
            { name: 'Dogecoin', abbreviation: 'DOGE' }
        ];
        res.json( popularItems );
    } catch (error) {
        console.error("Error fetching popular items:", error);
        res.status(500).json({ error: "Failed to fetch popular items" });
    }
});
module.exports = router;