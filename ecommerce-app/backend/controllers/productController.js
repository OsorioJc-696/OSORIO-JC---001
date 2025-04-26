import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const productId = await Product.create({ name, description, price, stock });
    res.status(201).json({ id: productId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};
