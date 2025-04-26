const express = require('express');
const auth = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const existingItem = await Wishlist.findOne({
      where: { userId: req.user.id, productId },
    });
    if (existingItem) return res.status(400).json({ message: 'Product already in wishlist' });

    const wishlistItem = await Wishlist.create({
      userId: req.user.id,
      productId,
    });
    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, as: 'Product' }],
    });
    res.json(wishlistItems);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!wishlistItem) return res.status(404).json({ message: 'Wishlist item not found' });

    await wishlistItem.destroy();
    res.json({ message: 'Wishlist item removed' });
  } catch (error) {
    console.error('Delete wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;