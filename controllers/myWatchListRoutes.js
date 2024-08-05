const express = require('express');
const router = express.Router();
const { requireLogin } = require('../helpers/auth');
const { User, CryptoCurrency, WatchList } = require('../models');

const { v4: uuidv4 } = require('uuid');

// Get watchlist items
router.get('/', requireLogin, async (req, res) => {
  try {
    let user = await User.findByPk(req.session.user_id, {
      include: [{ 
        model: CryptoCurrency, 
        as: 'cryptocurrencies',
        through: { attributes: [] } // This will exclude the join table attributes
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user = user.get( {plain : true});

    res.render('watchList', {
      cryptos: user.cryptocurrencies,
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
    const { symbol } = req.body;
    console.log('Received Symbol:', symbol); // Debugging: Log the symbol received

    const user = await User.findByPk(req.session.user_id);
    if (!user) {
      console.log('User not found for ID:', req.session.user_id);
      return res.status(404).json({ message: 'User not found' });
    }

    const cryptoData = await CryptoCurrency.findOne({ where: { symbol } });
    if (!cryptoData) {
      console.log('Cryptocurrency not found for symbol:', symbol);
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }

    await WatchList.create({
      crypto_id: cryptoData.id,
      user_id: req.session.user_id
    });

    res.status(200).json({ message: 'Added to watchlist successfully' });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Error adding to watchlist' });
  }
});

module.exports = router;
