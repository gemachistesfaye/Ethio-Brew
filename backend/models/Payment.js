const pool = require('../config/db');

const Payment = {
  create: async ({ order_id, method, screenshot_url, amount }) => {
    const [result] = await pool.execute(
      `INSERT INTO payments (order_id, method, screenshot_url, amount, status)
       VALUES (?, ?, ?, ?, 'Pending') RETURNING id`,
      [order_id, method, screenshot_url || null, amount || null]
    );
    return result.insertId;
  },

  findById: async (id) => {
    const [rows] = await pool.execute('SELECT * FROM payments WHERE id = ?', [id]);
    return rows[0] || null;
  },

  findByOrderId: async (orderId) => {
    const [rows] = await pool.execute(
      'SELECT * FROM payments WHERE order_id = ? ORDER BY created_at DESC',
      [orderId]
    );
    return rows;
  },

  findAllPending: async ({ page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT p.*, o.total_amount, o.shipping_address, o.phone_number,
              o.status as order_status, u.full_name as customer_name
       FROM payments p
       LEFT JOIN orders o ON p.order_id = o.id
       LEFT JOIN users u ON o.user_id = u.id
       WHERE p.status = 'Pending'
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute(
      "SELECT COUNT(*) as total FROM payments WHERE status = 'Pending'"
    );
    return { payments: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  verify: async (id, status, admin_notes, verified_by) => {
    await pool.execute(
      `UPDATE payments SET status = ?, admin_notes = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, admin_notes || null, verified_by || null, id]
    );
  },
};

module.exports = Payment;
