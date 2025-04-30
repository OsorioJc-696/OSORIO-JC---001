import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { username, email, password, phone_number } = req.body;
  try {
    const newUser = await User.create({ username, email, password, phone_number });
    res.status(201).json({ id: newUser.id || newUser._id, username: newUser.username, email: newUser.email });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);  // Asegúrate de que esta función esté implementada correctamente

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password, ...userData } = user;
    res.json(userData);  // Retorna solo los datos del usuario sin la contraseña
  } catch (err) {
    console.error('Error en la ruta /me:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

