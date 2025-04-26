const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  billingAddress: {
    type: DataTypes.JSON,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
  },
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;