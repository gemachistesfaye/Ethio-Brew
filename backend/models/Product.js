const pool = require('../config/db');

/**
 * Product model — aligned with production_schema.sql.
 *
 * Columns: id, category_id, name_en, name_am, name_om,
 *          description_en, description_am, description_om,
 *          price, stock_quantity, roast_level, origin_region,
 *          altitude, process_method, image_url, is_active, created_at
 */
const Product = {
  findAll: async (onlyActive = true) => {
    const sql = onlyActive
      ? 'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC'
      : 'SELECT * FROM products ORDER BY created_at DESC';
    const [rows] = await pool.execute(sql);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ name_en, name_am, name_om, description_en, price, stock_quantity, roast_level, origin_region, altitude, process_method, image_url, category_id }) => {
    const [result] = await pool.execute(
      `INSERT INTO products (category_id, name_en, name_am, name_om, description_en, price,
                             stock_quantity, roast_level, origin_region, altitude, process_method, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [category_id || null, name_en, name_am || null, name_om || null, description_en || null,
       price, stock_quantity || 0, roast_level || 'Medium', origin_region || null,
       altitude || null, process_method || null, image_url || null]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];

    const allowedFields = [
      'name_en', 'name_am', 'name_om', 'description_en', 'description_am', 'description_om',
      'price', 'stock_quantity', 'roast_level', 'origin_region', 'altitude',
      'process_method', 'image_url', 'category_id', 'is_active'
    ];

    for (const field of allowedFields) {
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

  count: async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM products WHERE is_active = TRUE');
    return rows[0].total;
  }
};

module.exports = Product;
