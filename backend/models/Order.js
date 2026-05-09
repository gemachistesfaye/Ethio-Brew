const pool = require('../config/db');

const Order = {
  create: async (orderData) => {
    const { user_id, total_price, delivery_address, phone } = orderData;
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, total_price, delivery_address, phone, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, total_price, delivery_address, phone, 'pending']
    );
    return result.insertId;
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return rows;
  },
  updateStatus: async (id, status) => {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  }
};

module.exports = Order;
