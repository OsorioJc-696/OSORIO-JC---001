const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: 'id' },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  giftWrapping: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Cart);
Product.hasMany(Cart);
Cart.belongsTo(User);
Cart.belongsTo(Product);

module.exports = Cart;