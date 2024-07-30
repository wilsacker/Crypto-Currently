const express = require('express');
const { requireLogin } = require('../helpers/auth');
const router = express.Router();

router.get('/', requireLogin, (req, res) => {
  // Fetch the user's watchlist from the database
  const userWatchlist = [
    // Dummy data; replace with actual database query
  ];

  res.render('watchlist', { watchlist: userWatchlist });
});

module.exports = router;
