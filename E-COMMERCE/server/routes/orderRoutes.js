const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { items, billingAddress } = req.body;
  try {
    const orderNumber = `ORD-${Date.now()}`;
    const total = items.reduce((sum, item) => sum + item.price * item.quantity + (item.giftWrapping ? 10 : 0), 0);
    const order = await Order.create({
      userId: req.user.id,
      orderNumber,
      status: 'Pending',
      total,
      billingAddress,
    });

    const orderItems = items.map(item => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      customizations: item.customizations,
    }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ order, orderItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id }, include: ['OrderItems'] });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;