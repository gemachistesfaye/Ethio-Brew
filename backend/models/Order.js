const pool = require('../config/db');

const Order = {
  create: async ({ user_id, total_amount, shipping_address, phone_number, items, payment_method }) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [orderResult] = await conn.execute(
        `INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, payment_method, status, payment_status)
         VALUES (?, ?, ?, ?, ?, 'Pending', 'Unpaid')`,
        [user_id, total_amount, shipping_address, phone_number, payment_method || null]
      );
      const orderId = orderResult.insertId;

      if (Array.isArray(items) && items.length > 0) {
        const itemValues = items.map(item => [
          orderId, item.product_id, item.quantity, item.price_at_purchase,
        ]);
        await conn.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ?',
          [itemValues]
        );

        for (const item of items) {
          await conn.execute(
            'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?',
            [item.quantity, item.product_id, item.quantity]
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

  findAll: async ({ page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT o.id, o.user_id, o.total_amount, o.shipping_address, o.phone_number,
              o.status, o.payment_status, o.payment_method, o.tracking_number,
              o.created_at, o.updated_at,
              u.full_name as customer_name, u.email as customer_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM orders');
    return { orders: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
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

  findItemsByOrderId: async (orderId) => {
    const [rows] = await pool.execute(
      `SELECT oi.*, p.name_en as product_name, p.image_url
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );
    return rows;
  },

  findByUserId: async (user_id, { page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [user_id, String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM orders WHERE user_id = ?', [user_id]);
    return { orders: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  updateStatus: async (id, status) => {
    const [result] = await pool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },

  generateTrackingNumber: async (id) => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const [[{ cnt }]] = await pool.execute(
      "SELECT COUNT(*) as cnt FROM orders WHERE tracking_number LIKE ?",
      [`EB-${date}-%`]
    );
    const seq = String((cnt || 0) + 1).padStart(4, '0');
    const tracking = `EB-${date}-${seq}`;
    await pool.execute('UPDATE orders SET tracking_number = ? WHERE id = ?', [tracking, id]);
    return tracking;
  },
};

module.exports = Order;
