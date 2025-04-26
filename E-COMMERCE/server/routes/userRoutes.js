const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be 6+ characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token, user: { id: user.id, username, email, phone } });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, username: user.username, email, phone: user.phone } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;