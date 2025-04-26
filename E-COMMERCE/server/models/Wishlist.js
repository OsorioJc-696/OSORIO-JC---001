const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Wishlist = sequelize.define('Wishlist', {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: 'id' },
  },
});

User.hasMany(Wishlist);
Product.hasMany(Wishlist);
Wishlist.belongsTo(User);
Wishlist.belongsTo(Product);

module.exports = Wishlist;