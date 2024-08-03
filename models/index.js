const User = require('./user');
const CryptoCurrency = require('./crypto');
const WatchList = require('./watchList');

// Define associations
User.belongsToMany(CryptoCurrency, { 
  through: WatchList, 
  foreignKey: 'user_id',
  as: 'cryptocurrencies' // Optional alias
});

CryptoCurrency.belongsToMany(User, { 
  through: WatchList, 
  foreignKey: 'crypto_id',
  as: 'users' // Optional alias
});

module.exports = { User, CryptoCurrency, WatchList };
