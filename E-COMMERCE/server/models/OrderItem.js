const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  orderId: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: 'id' },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: 'id' },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  customizations: {
    type: DataTypes.JSON,
  },
});

Order.hasMany(OrderItem);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

module.exports = OrderItem;