const pool = require('../config/db');

const Payment = {
  create: async (paymentData) => {
    const { order_id, method, proof_image } = paymentData;
    const [result] = await pool.query(
      'INSERT INTO payments (order_id, method, proof_image, status) VALUES (?, ?, ?, ?)',
      [order_id, method, proof_image, 'pending']
    );
    return result.insertId;
  },
  findAllPending: async () => {
    const [rows] = await pool.query('SELECT * FROM payments WHERE status = "pending"');
    return rows;
  },
  verify: async (id, status, admin_notes) => {
    await pool.query(
      'UPDATE payments SET status = ?, admin_notes = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, admin_notes, id]
    );
  }
};

module.exports = Payment;
