import db from '../config/db.js';


const Product = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async create({ name, description, price, stock }) {
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock]
    );
    return result.insertId;
  },
};

export default Product;