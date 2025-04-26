const express = require('express');
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { productId, quantity, giftWrapping, customizations } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity: quantity || 1,
      giftWrapping: giftWrapping || false,
      customizations,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, as: 'Product' }],
    });
    res.json(cartItems);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { quantity, giftWrapping } = req.body;
  try {
    const cartItem = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    cartItem.quantity = quantity || cartItem.quantity;
    cartItem.giftWrapping = giftWrapping !== undefined ? giftWrapping : cartItem.giftWrapping;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Delete cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;