const express = require('express');
const { requireLogin } = require('../helpers/auth');
const router = express.Router();

router.get('/', requireLogin, async (req, res) => {
  try {
    const userId = req.session.user_id; 

    // Fetch the user's watchlist from the database
    const watchlistEntries = await Watchlist.findAll({
      where: { user_id: userId },
      include: [CryptoCurrency]
    });

    // Extract the cryptocurrency data
    const userWatchlist = watchlistEntries.map(entry => entry.crypto_currency);

    res.render('watchList', { 
      watchlist: true,
      watchlist: userWatchlist,
      loggedIn: req.session.logged_in,
     });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).send('Server error');
  }
});

router.delete('/remove-from-watchlist', requireLogin, async (req, res) => {
  try {
    const { cryptoId } = req.body;
    const userId = req.session.user_id; // Ensure the key matches

    await Watchlist.destroy({
      where: {
        user_id: userId,
        crypto_id: cryptoId,
        loggedIn: req.session.logged_in,
      }
    });

    res.redirect('/watchlist'); // Redirect to watchlist page after removal
  } catch (error) {
    console.error('Error removing item from watchlist:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
