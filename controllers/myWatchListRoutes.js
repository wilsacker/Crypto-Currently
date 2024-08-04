const express = require('express');
const router = express.Router();
const { requireLogin } = require('../helpers/auth');
const User = require('../models/User');
const Crypto = require('../models/Crypto');

// Get watchlist items
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId, {
      include: [{ model: Crypto, through: 'UserCrypto' }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.render('watchList', {
      cryptos: user.Cryptos,
      loggedIn: true,
      username: req.session.username
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

// Add item to watchlist
router.post('/add', requireLogin, async (req, res) => {
  try {
    const { cryptoId } = req.body;
    const user = await User.findByPk(req.session.userId);
    const crypto = await Crypto.findByPk(cryptoId);

    if (!user || !crypto) {
      return res.status(404).json({ message: 'User or Crypto not found' });
    }

    await user.addCrypto(crypto);
    res.status(200).json({ message: 'Added to watchlist successfully' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
});

module.exports = router;
