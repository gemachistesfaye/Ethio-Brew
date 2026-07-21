const pool = require('../config/db');

const Subscription = {
  create: async ({ user_id, plan_name, frequency_days }) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + frequency_days);
    const [result] = await pool.execute(
      `INSERT INTO subscriptions (user_id, plan_name, frequency_days, next_delivery_date)
       VALUES (?, ?, ?, ?)`,
      [user_id, plan_name, frequency_days, nextDate.toISOString().slice(0, 10)]
    );
    return result.insertId;
  },

  findByUserId: async (userId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.execute('SELECT * FROM subscriptions WHERE id = ?', [id]);
    return rows[0] || null;
  },

  findAll: async ({ page = 1, limit = 20, status } = {}) => {
    const conditions = [];
    const params = [];
    if (status) {
      conditions.push('s.status = ?');
      params.push(status);
    }
    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT s.*, u.full_name as user_name, u.email as user_email
       FROM subscriptions s
       LEFT JOIN users u ON s.user_id = u.id
       ${where}
       ORDER BY s.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute(
      `SELECT COUNT(*) as total FROM subscriptions s ${where}`,
      params
    );
    return { subscriptions: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
    if (data.frequency_days !== undefined) {
      fields.push('frequency_days = ?');
      values.push(data.frequency_days);
    }
    if (fields.length === 0) return 0;
    values.push(id);
    const [result] = await pool.execute(
      `UPDATE subscriptions SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await pool.execute('DELETE FROM subscriptions WHERE id = ?', [id]);
    return result.affectedRows;
  },

  countActive: async () => {
    const [[{ total }]] = await pool.execute(
      "SELECT COUNT(*) as total FROM subscriptions WHERE status = 'Active'"
    );
    return total;
  },
};

module.exports = Subscription;
