const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WatchList extends Model {}

WatchList.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // The model name for User
        key: 'id',
      },
      allowNull: false,
    },
    crypto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'crypto_currency', // The model name for CryptoCurrency
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'watch_list', // Ensure this matches the table name
  }
);

module.exports = WatchList;
