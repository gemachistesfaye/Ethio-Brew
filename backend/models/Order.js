const pool = require('../config/db');

/**
 * Order model — aligned with production_schema.sql.
 *
 * production_schema columns:
 *   id, user_id, total_amount (DECIMAL), shipping_address, phone_number,
 *   status (ENUM), payment_status (ENUM), payment_method, tracking_number,
 *   created_at, updated_at
 *
 * Related: order_items (order_id, product_id, quantity, price_at_purchase)
 */
const Order = {
  create: async ({ user_id, total_amount, shipping_address, phone_number, items, payment_method }) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      // Create the order header.
      const [orderResult] = await conn.execute(
        `INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, payment_method, status, payment_status)
         VALUES (?, ?, ?, ?, ?, 'Pending', 'Unpaid')`,
        [user_id, total_amount, shipping_address, phone_number, payment_method || null]
      );
      const orderId = orderResult.insertId;

      // Create order_items rows.
      if (Array.isArray(items) && items.length > 0) {
        const itemValues = items.map(item =>
          [orderId, item.product_id, item.quantity, item.price_at_purchase]
        );
        await conn.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ?`,
          [itemValues]
        );
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
    const [rows] = await pool.execute(
      `SELECT o.id, o.user_id, o.total_amount, o.shipping_address, o.phone_number,
              o.status, o.payment_status, o.payment_method, o.tracking_number,
              o.created_at, o.updated_at,
              u.full_name as customer_name, u.email as customer_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.execute(
      `SELECT o.*,
              u.full_name as customer_name, u.email as customer_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
    return rows;
  },

  updateStatus: async (id, status) => {
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },

  // Generate a tracking number (simple: EB-YYYYMMDD-XXXX).
  generateTrackingNumber: async (id) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const tracking = `EB-${date}-${random}`;
    await pool.execute(
      'UPDATE orders SET tracking_number = ? WHERE id = ?',
      [tracking, id]
    );
    return tracking;
  }
};

module.exports = Order;
