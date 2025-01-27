const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CryptoCurrency extends Model {}

CryptoCurrency.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },   
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'crypto_currency',
  }
);

module.exports = CryptoCurrency;
