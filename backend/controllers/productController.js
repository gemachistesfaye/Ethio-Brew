const Product = require('../models/Product');

const productController = {
  getProducts: async (req, res) => {
    try {
      const { page = 1, limit = 20, search, category, roast, sort, order } = req.query;
      const result = await Product.findAll({
        onlyActive: true,
        page: parseInt(page),
        limit: Math.min(parseInt(limit) || 20, 100),
        search,
        category: category ? parseInt(category) : undefined,
        roast,
        sort,
        order,
      });
      res.json(result);
    } catch (error) {
      console.error('getProducts error:', error);
      res.status(500).json({ error: 'Could not load products.' });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit = 20, search, category, roast, sort, order } = req.query;
      const result = await Product.findAll({
        onlyActive: false,
        page: parseInt(page),
        limit: Math.min(parseInt(limit) || 20, 100),
        search,
        category: category ? parseInt(category) : undefined,
        roast,
        sort,
        order,
      });
      res.json(result);
    } catch (error) {
      console.error('getAllProducts error:', error);
      res.status(500).json({ error: 'Could not load products.' });
    }
  },

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

  createProduct: async (req, res) => {
    try {
      const id = await Product.create(req.body);
      res.status(201).json({ id, message: 'Product created successfully' });
    } catch (error) {
      console.error('createProduct error:', error);
      res.status(500).json({ error: 'Could not create product.' });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const affected = await Product.update(req.params.id, req.body);
      if (affected === 0) return res.status(404).json({ message: 'Product not found or no changes' });
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('updateProduct error:', error);
      res.status(500).json({ error: 'Could not update product.' });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const affected = await Product.delete(req.params.id);
      if (affected === 0) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted' });
    } catch (error) {
      console.error('deleteProduct error:', error);
      res.status(500).json({ error: 'Could not delete product.' });
    }
  },
};

module.exports = productController;
