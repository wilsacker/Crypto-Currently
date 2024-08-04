const User = require('./user');
const CryptoCurrency = require('./crypto');
const WatchList = require('./watchList');

// Define associations
User.belongsToMany(CryptoCurrency, { 
  through: WatchList, 
  foreignKey: 'user_id',
  otherKey: 'crypto_id',
  as: 'cryptocurrencies'
});

CryptoCurrency.belongsToMany(User, { 
  through: WatchList, 
  foreignKey: 'crypto_id',
  otherKey: 'user_id',
  as: 'users'
});

module.exports = { User, CryptoCurrency, WatchList };
