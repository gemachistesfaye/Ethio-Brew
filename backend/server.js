const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ethiobrew',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- API Routes ---

// 1. Products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Orders
app.post('/api/orders', async (req, res) => {
  const { user_id, total_price, items, delivery_address, phone } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, total_price, delivery_address, phone, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, total_price, delivery_address, phone, 'pending']
    );
    const orderId = result.insertId;

    // Insert order items
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.status(201).json({ message: 'Order created', orderId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Admin: Update Order Status
app.put('/api/admin/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Payments: Upload Proof (Stub for logic)
app.post('/api/payments/upload', async (req, res) => {
  const { order_id, method, proof_image } = req.body;
  try {
    await pool.query(
      'INSERT INTO payments (order_id, method, proof_image, status) VALUES (?, ?, ?, ?)',
      [order_id, method, proof_image, 'pending']
    );
    res.status(201).json({ message: 'Payment proof uploaded' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Analytics: Revenue
app.get('/api/admin/analytics/revenue', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DATE_FORMAT(created_at, '%M') as month, SUM(total_price) as total 
      FROM orders 
      WHERE status = 'delivered' 
      GROUP BY month
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ethio-Brew Backend running on port ${PORT}`);
});
