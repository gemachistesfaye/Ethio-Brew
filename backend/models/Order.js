const pool = require('../config/db');

const Order = {
  // Creates the order + its line items in a single transaction.
  // `items` is optional; if provided it should be an array of
  // { product_id, quantity, price_at_purchase }.
  create: async (orderData) => {
    const { user_id, total_price, delivery_address, phone, items } = orderData;
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // NOTE: column names target the production_schema.sql table:
      // total_amount / shipping_address / phone_number.
      const [result] = await conn.query(
        'INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, status) VALUES (?, ?, ?, ?, ?)',
        [user_id, total_price, delivery_address, phone, 'Pending']
      );
      const orderId = result.insertId;

      if (Array.isArray(items) && items.length > 0) {
        for (const it of items) {
          await conn.query(
            'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
            [orderId, it.product_id, it.quantity, it.price_at_purchase ?? it.price]
          );
        }
      }

      await conn.commit();
      return orderId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return rows;
  },
  findByUser: async (userId) => {
    const [rows] = await pool.query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  },
  updateStatus: async (id, status) => {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  }
};

module.exports = Order;
