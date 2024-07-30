const User = require('./user');
const CryptoCurrency = require('./crypto');

// Define associations here if any
// For example, if a user can have multiple cryptos in their watchlist, you might define an association like this:

User.hasMany(CryptoCurrency, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Crypto.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = {
  User,
  CryptoCurrency,
};
