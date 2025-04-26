const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const Customization = sequelize.define('Customization', {
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: 'id' },
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false, // e.g., 'computer', 'camera'
  },
  options: {
    type: DataTypes.JSON, // e.g., { processor: 'Intel', os: 'Linux', ram: 8 }
  },
});

Product.hasMany(Customization);
Customization.belongsTo(Product);

module.exports = Customization;