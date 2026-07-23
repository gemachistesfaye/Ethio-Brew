const pool = require('../config/db');

const Notification = {
  create: async ({ user_id, title, message, type = 'System' }) => {
    const [result] = await pool.execute(
      'INSERT INTO notifications (user_id, title, message, type) VALUES (?, ?, ?, ?) RETURNING id',
      [user_id, title, message, type]
    );
    return result.insertId;
  },

  findByUserId: async (userId, { page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [userId, String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM notifications WHERE user_id = ?',
      [userId]
    );
    const [[{ unread }]] = await pool.execute(
      'SELECT COUNT(*) as unread FROM notifications WHERE user_id = ? AND is_read = FALSE',
      [userId]
    );
    return { notifications: rows, total, unread, page, limit, totalPages: Math.ceil(total / limit) };
  },

  markAsRead: async (id, userId) => {
    const [result] = await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  },

  markAllAsRead: async (userId) => {
    const [result] = await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
      [userId]
    );
    return result.affectedRows;
  },

  delete: async (id, userId) => {
    const [result] = await pool.execute(
      'DELETE FROM notifications WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows;
  },
};

module.exports = Notification;
