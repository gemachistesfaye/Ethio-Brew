const pool = require('../config/db');
const Product = require('../models/Product');

const productController = {
  // Public: list active products
  getProducts: async (req, res) => {
    try {
      const products = await Product.findAll(true);
      res.json(products);
    } catch (error) {
      console.error('getProducts error:', error);
      res.status(500).json({ error: 'Could not load products.' });
    }
  },

  // Public: single product
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      console.error('getProductById error:', error);
      res.status(500).json({ error: 'Could not load product.' });
    }
  },

  // Admin: create product
  createProduct: async (req, res) => {
    try {
      const id = await Product.create(req.body);
      res.status(201).json({ id, message: 'Product created successfully' });
    } catch (error) {
      console.error('createProduct error:', error);
      res.status(500).json({ error: 'Could not create product.' });
    }
  },

  // Admin: update product — accepts any subset of fields
  updateProduct: async (req, res) => {
    try {
      const affected = await Product.update(req.params.id, req.body);
      if (affected === 0) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('updateProduct error:', error);
      res.status(500).json({ error: 'Could not update product.' });
    }
  },

  // Admin: delete product
  deleteProduct: async (req, res) => {
    try {
      const affected = await Product.delete(req.params.id);
      if (affected === 0) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted' });
    } catch (error) {
      console.error('deleteProduct error:', error);
      res.status(500).json({ error: 'Could not delete product.' });
    }
  }
};

module.exports = productController;
