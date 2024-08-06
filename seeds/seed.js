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
           
          
  { name: 'Polkadot', symbol: 'DOT' },
  { name: 'Chainlink', symbol: 'LINK' },
  { name: 'Stellar', symbol: 'XLM' },
  { name: 'Solana', symbol: 'SOL' },
  { name: 'Dogecoin', symbol: 'DOGE' },
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

 
  

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
