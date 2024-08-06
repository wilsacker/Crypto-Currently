// const router = require('express').Router();
// const { fetchCryptoData, fetchCurrencyData } = require('../controllers/api/coinApiRoutes');
// const express = require('express');


//    router.get('/search', async (req, res) => {
//     const { symbol } = req.query;
//     if (!symbol) {
//       return res.status(400).json({ error: 'Cryptocurrency symbol is required' });
//     }
  
//     try {
//       const data = await fetchCryptoData(symbol.toUpperCase());
//       res.json(data);
//     } catch (error) {
//       console.error('Error in /search route:', error);
//       res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
//     }
//   });

//   module.exports = router;