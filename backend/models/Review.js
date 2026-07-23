const pool = require('../config/db');

const Review = {
  create: async ({ user_id, product_id, rating, comment }) => {
    const [result] = await pool.execute(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?) RETURNING id',
      [user_id, product_id, rating, comment || null]
    );
    return result.insertId;
  },

  findByProductId: async (productId, { page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT r.*, u.full_name as user_name
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [productId, String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM reviews WHERE product_id = ?',
      [productId]
    );
    const [[{ avgRating }]] = await pool.execute(
      'SELECT COALESCE(AVG(rating), 0) as avgRating FROM reviews WHERE product_id = ?',
      [productId]
    );
    return { reviews: rows, total, avgRating: parseFloat(avgRating).toFixed(1), page, limit, totalPages: Math.ceil(total / limit) };
  },

  findByUserId: async (userId, { page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT r.*, p.name_en as product_name
       FROM reviews r
       LEFT JOIN products p ON r.product_id = p.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM reviews WHERE user_id = ?',
      [userId]
    );
    return { reviews: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  findById: async (id) => {
    const [rows] = await pool.execute(
      `SELECT r.*, u.full_name as user_name, p.name_en as product_name
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       LEFT JOIN products p ON r.product_id = p.id
       WHERE r.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  findUserReviewForProduct: async (userId, productId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM reviews WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows[0] || null;
  },

  update: async (id, { rating, comment }) => {
    const fields = [];
    const values = [];
    if (rating !== undefined) { fields.push('rating = ?'); values.push(rating); }
    if (comment !== undefined) { fields.push('comment = ?'); values.push(comment); }
    if (fields.length === 0) return 0;
    values.push(id);
    const [result] = await pool.execute(
      `UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM reviews WHERE id = ?', [id]);
    return result.affectedRows;
  },

  findAll: async ({ page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT r.*, u.full_name as user_name, p.name_en as product_name
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       LEFT JOIN products p ON r.product_id = p.id
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM reviews');
    return { reviews: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },
};

module.exports = Review;
