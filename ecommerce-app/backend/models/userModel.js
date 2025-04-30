import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
  async create({ username, email, password, phone_number }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (username, email, password, phone_number) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, phone_number]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];  // Devuelve el primer usuario encontrado
  }
};

export default User;
