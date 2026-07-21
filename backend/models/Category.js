const pool = require('../config/db');

const Category = {
  findAll: async () => {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name_en ASC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  },

  create: async ({ name_en, name_am, name_om, description_en }) => {
    const [result] = await pool.execute(
      'INSERT INTO categories (name_en, name_am, name_om, description_en) VALUES (?, ?, ?, ?)',
      [name_en, name_am || null, name_om || null, description_en || null]
    );
    return result.insertId;
  },

  update: async (id, { name_en, name_am, name_om, description_en }) => {
    const fields = [];
    const values = [];
    if (name_en !== undefined) { fields.push('name_en = ?'); values.push(name_en); }
    if (name_am !== undefined) { fields.push('name_am = ?'); values.push(name_am); }
    if (name_om !== undefined) { fields.push('name_om = ?'); values.push(name_om); }
    if (description_en !== undefined) { fields.push('description_en = ?'); values.push(description_en); }
    if (fields.length === 0) return 0;
    values.push(id);
    const [result] = await pool.execute(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows;
  },

  count: async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM categories');
    return rows[0].total;
  },
};

module.exports = Category;
