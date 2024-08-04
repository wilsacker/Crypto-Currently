const sequelize = require('../config/connection'); 
const { User, CryptoCurrency, WatchList } = require('../models'); 
const userData = [
  {
    username: 'goksel',
    password: 'password123',
  },
  {
    username: 'ashley',
    password: 'password123',
  },
  {
    username: 'william',
    password: 'password123',
  },
];

const cryptoData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    name: 'Ripple',
    symbol: 'XRP',
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
  },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Reset the database

    // Seed Users
    const users = await User.bulkCreate(userData, {
      individualHooks: true, // Ensure password hashing
      returning: true,
    });

    // Seed Cryptocurrencies
    const cryptos = await CryptoCurrency.bulkCreate(cryptoData);

    // Example: Add all cryptocurrencies to all users
    const userCryptoAssociations = [];
    for (const user of users) {
      for (const crypto of cryptos) {
        userCryptoAssociations.push({
          user_id: user.id,
          crypto_id: crypto.id,
        });
      }
    }

    // Seed the WatchList associations
    await WatchList.bulkCreate(userCryptoAssociations);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
