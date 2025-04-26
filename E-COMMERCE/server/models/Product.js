const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.JSON,
  },
});

module.exports = Product;