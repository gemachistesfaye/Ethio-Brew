const pool = require('../config/db');

/**
 * Payment model — aligned with production_schema.sql.
 *
 * Columns: id, order_id, transaction_id, screenshot_url, amount,
 *          verified_by, verified_at, status (Pending/Approved/Rejected)
 */
const Payment = {
  create: async ({ order_id, method, screenshot_url, amount, uploaded_by }) => {
    const [result] = await pool.execute(
      `INSERT INTO payments (order_id, method, screenshot_url, amount, status)
       VALUES (?, ?, ?, ?, 'Pending')`,
      [order_id, method, screenshot_url, amount || null]
    );
    return result.insertId;
  },

  findAllPending: async () => {
    const [rows] = await pool.execute(
      `SELECT p.*, o.total_amount, o.shipping_address, o.phone_number,
              o.status as order_status, u.full_name as customer_name
       FROM payments p
       LEFT JOIN orders o ON p.order_id = o.id
       LEFT JOIN users u ON o.user_id = u.id
       WHERE p.status = 'Pending'
       ORDER BY p.created_at DESC`
    );
    return rows;
  },

  verify: async (id, status, admin_notes, verified_by) => {
    await pool.execute(
      `UPDATE payments SET status = ?, admin_notes = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, admin_notes || null, verified_by || null, id]
    );
  }
};

module.exports = Payment;
