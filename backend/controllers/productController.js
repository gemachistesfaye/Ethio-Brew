const pool = require('../config/db');

const productController = {
  // Get all products
  getProducts: async (req, res) => {
    try {
      const [products] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
      res.json(products);
    } catch (error) {
      console.error('getProducts error:', error);
      res.status(500).json({ error: 'Could not load products.' });
    }
  },

  // Get single product
  getProductById: async (req, res) => {
    try {
      const [products] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
      if (products.length === 0) return res.status(404).json({ message: 'Product not found' });
      res.json(products[0]);
    } catch (error) {
      console.error('getProductById error:', error);
      res.status(500).json({ error: 'Could not load product.' });
    }
  },

  // Admin: Create product
  createProduct: async (req, res) => {
    const { name_en, name_am, name_or, description_en, price, stock, region, image_url } = req.body;
    if (!name_en || price == null) {
      return res.status(400).json({ error: 'name_en and price are required' });
    }
    try {
      const [result] = await pool.execute(
        'INSERT INTO products (name_en, name_am, name_or, description_en, price, stock, region, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name_en, name_am || null, name_or || null, description_en || null, price, stock || 0, region || null, image_url || null]
      );
      res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
    } catch (error) {
      console.error('createProduct error:', error);
      res.status(500).json({ error: 'Could not create product.' });
    }
  },

  // Admin: Update product
  updateProduct: async (req, res) => {
    const { name_en, price, stock, region } = req.body;
    try {
      await pool.execute(
        'UPDATE products SET name_en = ?, price = ?, stock = ?, region = ? WHERE id = ?',
        [name_en, price, stock, region, req.params.id]
      );
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('updateProduct error:', error);
      res.status(500).json({ error: 'Could not update product.' });
    }
  },

  // Admin: Delete product
  deleteProduct: async (req, res) => {
    try {
      await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
      res.json({ message: 'Product deleted' });
    } catch (error) {
      console.error('deleteProduct error:', error);
      res.status(500).json({ error: 'Could not delete product.' });
    }
  }
};

module.exports = productController;
