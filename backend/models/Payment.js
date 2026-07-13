const pool = require('../config/db');

const Payment = {
  // production_schema.sql uses screenshot_url (not proof_image) and a 'Pending'
  // enum value. We store the uploader for an audit trail.
  create: async (paymentData) => {
    const { order_id, method, proof_image, uploaded_by } = paymentData;
    const [result] = await pool.query(
      'INSERT INTO payments (order_id, payment_method, screenshot_url, status) VALUES (?, ?, ?, ?)',
      [order_id, method, proof_image, 'Pending']
    );
    return result.insertId;
  },
  findAllPending: async () => {
    const [rows] = await pool.query("SELECT * FROM payments WHERE status = 'Pending'");
    return rows;
  },
  // adminController now passes the verifying admin's id.
  verify: async (id, status, admin_notes, verified_by) => {
    await pool.query(
      'UPDATE payments SET status = ?, admin_notes = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, admin_notes, verified_by, id]
    );
  }
};

module.exports = Payment;
