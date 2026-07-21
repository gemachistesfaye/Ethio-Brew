const pool = require('../config/db');
const { ALLOWED_PRODUCT_FIELDS } = require('../utils/constants');

const Product = {
  findAll: async ({ onlyActive = true, page = 1, limit = 20, search, category, roast, sort = 'created_at', order = 'DESC' } = {}) => {
    const conditions = [];
    const params = [];

    if (onlyActive) {
      conditions.push('p.is_active = TRUE');
    }
    if (search) {
      conditions.push('(p.name_en LIKE ? OR p.name_am LIKE ? OR p.name_om LIKE ? OR p.origin_region LIKE ?)');
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }
    if (category) {
      conditions.push('p.category_id = ?');
      params.push(category);
    }
    if (roast) {
      conditions.push('p.roast_level = ?');
      params.push(roast);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const allowedSorts = ['created_at', 'price', 'name_en', 'stock_quantity'];
    const sortField = allowedSorts.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    const [rows] = await pool.execute(
      `SELECT p.*, c.name_en as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${where}
       ORDER BY p.${sortField} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, String(limit), String(offset)]
    );

    const countParams = [...params];
    const [[{ total }]] = await pool.execute(
      `SELECT COUNT(*) as total FROM products p ${where}`,
      countParams
    );

    return { products: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  findById: async (id) => {
    const [rows] = await pool.execute(
      `SELECT p.*, c.name_en as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  create: async (data) => {
    const [result] = await pool.execute(
      `INSERT INTO products (category_id, name_en, name_am, name_om, description_en, description_am, description_om,
                             price, stock_quantity, roast_level, origin_region, altitude, process_method, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.category_id || null,
        data.name_en,
        data.name_am || null,
        data.name_om || null,
        data.description_en || null,
        data.description_am || null,
        data.description_om || null,
        data.price,
        data.stock_quantity || 0,
        data.roast_level || 'Medium',
        data.origin_region || null,
        data.altitude || null,
        data.process_method || null,
        data.image_url || null,
      ]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    for (const field of ALLOWED_PRODUCT_FIELDS) {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    if (fields.length === 0) return 0;

    values.push(id);
    const [result] = await pool.execute(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  },

  decrementStock: async (conn, productId, quantity) => {
    const [result] = await conn.execute(
      'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?',
      [quantity, productId, quantity]
    );
    return result.affectedRows > 0;
  },

  getCurrentPrice: async (id) => {
    const [rows] = await pool.execute('SELECT price FROM products WHERE id = ?', [id]);
    return rows[0] ? rows[0].price : null;
  },
};

module.exports = Product;
