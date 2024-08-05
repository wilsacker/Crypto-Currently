const express = require('express');
const router = express.Router();
const { requireLogin } = require('../helpers/auth');
const { User, CryptoCurrency, WatchList } = require('../models');

const { v4: uuidv4 } = require('uuid');

// Get watchlist items
router.get('/', requireLogin, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.userId, {
      include: [{ 
        model: CryptoCurrency, 
        as: 'cryptocurrencies',
        through: { attributes: [] } // This will exclude the join table attributes
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.render('watchList', {
      cryptos: user.cryptocurrencies,
      loggedIn: true,
      watchlist: true,
      username: req.session.username
    });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

// Add item to watchlist
router.post('/watchlist/add', requireLogin, async (req, res) => {
  try {
    const { cryptoId } = req.body;
    console.log('Request body:', req.body);
    console.log('Session data:', req.session);

    const user = await User.findByPk(req.session.userId);
    if (!user) {
      console.log('User not found for ID:', req.session.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    const cryptoData = await fetchCryptoData(cryptoId);
    if (!cryptoData) {
      return res.status(404).json({ message: 'Crypto not found' });
    }

    const crypto = await Crypto.findOrCreate({
      where: { name: cryptoData.name },
      defaults: {
        id: uuidv4(),
        name: cryptoData.name,
      }
    });

    await user.addCrypto(crypto[0]);
    res.status(200).json({ message: 'Added to watchlist successfully' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
});

module.exports = router;
