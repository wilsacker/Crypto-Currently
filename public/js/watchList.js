const express = require('express');
const { Watchlist } = require('../models');
const router = express.Router();



router.delete('/', async (req, res) => {
  try {
    const { cryptoId } = req.body; // Get the cryptocurrency ID from the request body
    const userId = req.session.userId; // Assuming user ID is stored in session

    // Remove the crypto from the watchlist
    await Watchlist.destroy({
      where: {
        user_id: userId,
        crypto_id: cryptoId
      }
    });

    res.redirect('/watchList'); // Redirect back to the watchlist page
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).send('Server error');
  }
});



module.exports = router;
