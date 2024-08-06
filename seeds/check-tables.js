const sequelize = require('../config/connection'); // Adjust the path as needed
const { QueryInterface } = sequelize.getQueryInterface();

async function createWatchListTable() {
  try {
    await QueryInterface.createTable('watch_list', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      crypto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'crypto_currency',
          key: 'id',
        },
      },
    });
    console.log('WatchList table created!');
  } catch (error) {
    console.error('Error creating WatchList table:', error);
  }
}

createWatchListTable();
sequelize.getQueryInterface().showAllTables()
  .then(tables => {
    console.log('Tables in the database:', tables);
    sequelize.close(); // Close the connection after checking
  })
  .catch(error => {
    console.error('Error fetching table names:', error);
    sequelize.close(); // Ensure connection is closed in case of an error
  });

  const checkTable = async () => {
    try {
      // Get the table descriptions
      const tableDesc = await sequelize.getQueryInterface().describeTable('watch_list');
      console.log('Table Description for watch_list:', tableDesc);
    } catch (error) {
      console.error('Error fetching table description:', error);
    } finally {
      await sequelize.close(); // Close the connection after checking
    }
  };
  
  checkTable();

  