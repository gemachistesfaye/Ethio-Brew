const pool = require('../config/db');

const Product = {
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },
  create: async (data) => {
    const { name_en, name_am, name_om, price, origin, roast_level, description_en } = data;
    const [result] = await pool.query(
      'INSERT INTO products (name_en, name_am, name_om, price, origin, roast_level, description_en) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name_en, name_am, name_om, price, origin, roast_level, description_en]
    );
    return result.insertId;
  }
};

module.exports = Product;
