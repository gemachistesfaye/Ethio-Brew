const pool = require('../config/db');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { ORDER_STATUS_TRANSITIONS, PAYMENT_VALID_TRANSITIONS } = require('../utils/constants');

const adminController = {
  getAnalytics: async (req, res) => {
    try {
      const [revenue] = await pool.execute(
        `SELECT COALESCE(SUM(total_amount), 0) as total
         FROM orders
         WHERE status IN ('Delivered', 'Shipping', 'Payment Verified')`
      );
      const [orderCount] = await pool.execute('SELECT COUNT(*) as total FROM orders');
      const [userCount] = await pool.execute('SELECT COUNT(*) as total FROM users');
      const [productCount] = await pool.execute('SELECT COUNT(*) as total FROM products WHERE is_active = TRUE');
      const activeSubscriptions = await Subscription.countActive();

      const [trends] = await pool.execute(
        `SELECT to_char(created_at, 'Mon') as month,
                COALESCE(SUM(total_amount), 0) as revenue,
                COUNT(*) as orders
         FROM orders
         WHERE created_at > NOW() - INTERVAL '6 months'
           AND status != 'Cancelled'
         GROUP BY to_char(created_at, 'Mon'), EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)
         ORDER BY MIN(created_at) ASC`
      );

      const [regions] = await pool.execute(
        `SELECT p.origin_region as region, SUM(oi.quantity) as count
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE p.origin_region IS NOT NULL
         GROUP BY p.origin_region
         ORDER BY count DESC
         LIMIT 6`
      );

      const totalRevenue = Number(revenue[0].total) || 0;
      const totalOrders = orderCount[0].total || 0;
      const totalUsers = userCount[0].total || 0;

      const [prevRevenue] = await pool.execute(
        `SELECT COALESCE(SUM(total_amount), 0) as total
         FROM orders
         WHERE created_at BETWEEN NOW() - INTERVAL '12 months' AND NOW() - INTERVAL '6 months'
           AND status != 'Cancelled'`
      );
      const prevTotal = Number(prevRevenue[0].total) || 1;
      const revenueGrowth = ((totalRevenue - prevTotal) / prevTotal * 100).toFixed(1);

      const regionTotal = regions.reduce((sum, r) => sum + Number(r.count), 0) || 1;
      const regionalDemand = regions.map(r => ({
        region: r.region || 'Unknown',
        percentage: Math.round((Number(r.count) / regionTotal) * 100),
      }));

      const [recentResult] = await pool.execute(
        `SELECT o.id, o.total_amount, o.status, o.created_at, u.full_name as customer_name
         FROM orders o
         LEFT JOIN users u ON o.user_id = u.id
         ORDER BY o.created_at DESC
         LIMIT 10`
      );

      res.json({
        overview: {
          totalRevenue,
          revenueGrowth: parseFloat(revenueGrowth),
          totalOrders,
          totalUsers,
          activeSubscriptions,
          totalProducts: productCount[0].total,
        },
        salesTrends: trends.length > 0 ? trends : [{ month: 'N/A', revenue: 0, orders: 0 }],
        regionalDemand: regionalDemand.length > 0 ? regionalDemand : [{ region: 'No data', percentage: 100 }],
        recentOrders: recentResult,
      });
    } catch (error) {
      console.error('Analytics Error:', error);
      res.status(500).json({ message: 'Analytics database error' });
    }
  },

  getUsers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await User.findAll({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getUsers error:', error);
      res.status(500).json({ message: 'Could not load users' });
    }
  },

  updateUserRole: async (req, res) => {
    const { userId, roleId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const [roles] = await pool.execute('SELECT id FROM roles WHERE id = ?', [roleId]);
      if (roles.length === 0) return res.status(400).json({ message: 'Invalid role' });

      await User.updateRole(userId, roleId);
      res.json({ message: 'User role updated' });
    } catch (error) {
      console.error('updateUserRole error:', error);
      res.status(500).json({ message: 'Could not update user role' });
    }
  },

  blockUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (user.email === process.env.ADMIN_EMAIL) {
        return res.status(400).json({ message: 'Cannot block the main admin' });
      }
      await User.block(req.params.id);
      res.json({ message: 'User blocked' });
    } catch (error) {
      console.error('blockUser error:', error);
      res.status(500).json({ message: 'Could not block user' });
    }
  },

  unblockUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      await User.unblock(req.params.id);
      res.json({ message: 'User unblocked' });
    } catch (error) {
      console.error('unblockUser error:', error);
      res.status(500).json({ message: 'Could not unblock user' });
    }
  },

  getOrders: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Order.findAll({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getOrders error:', error);
      res.status(500).json({ message: 'Could not load orders' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
      const items = await Order.findItemsByOrderId(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error('getOrderById error:', error);
      res.status(500).json({ message: 'Could not load order' });
    }
  },

  updateOrderStatus: async (req, res) => {
    const { orderId, status } = req.body;
    try {
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      const allowed = ORDER_STATUS_TRANSITIONS[order.status];
      if (!allowed || !allowed.includes(status)) {
        return res.status(400).json({
          message: `Cannot transition from "${order.status}" to "${status}". Allowed: ${allowed ? allowed.join(', ') : 'none'}`,
        });
      }

      await Order.updateStatus(orderId, status);

      if (status === 'Shipping') {
        const tracking = await Order.generateTrackingNumber(orderId);
        res.json({ message: 'Order shipped', trackingNumber: tracking });
      } else {
        res.json({ message: 'Order status updated' });
      }
    } catch (error) {
      console.error('updateOrderStatus error:', error);
      res.status(500).json({ message: 'Could not update order' });
    }
  },

  verifyPayment: async (req, res) => {
    const { paymentId, status, adminNotes } = req.body;
    try {
      const payment = await Payment.findById(paymentId);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });

      const allowed = PAYMENT_VALID_TRANSITIONS[payment.status];
      if (!allowed || !allowed.includes(status)) {
        return res.status(400).json({
          message: `Cannot transition from "${payment.status}" to "${status}". Allowed: ${allowed ? allowed.join(', ') : 'none'}`,
        });
      }

      await Payment.verify(paymentId, status, adminNotes, req.user.id);

      if (status === 'Approved') {
        await pool.execute(
          "UPDATE orders SET payment_status = 'Paid', status = 'Payment Verified' WHERE id = ?",
          [payment.order_id]
        );
      } else if (status === 'Rejected') {
        await pool.execute(
          "UPDATE orders SET payment_status = 'Unpaid' WHERE id = ?",
          [payment.order_id]
        );
      }

      res.json({ message: `Payment ${status.toLowerCase()}` });
    } catch (error) {
      console.error('verifyPayment error:', error);
      res.status(500).json({ message: 'Could not verify payment' });
    }
  },

  getPayments: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Payment.findAllPending({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getPayments error:', error);
      res.status(500).json({ message: 'Could not load payments' });
    }
  },

  resetDatabase: async (req, res) => {
    try {
      const confirm = req.body.confirm;
      if (confirm !== 'DELETE_ALL') {
        return res.status(400).json({ message: 'Send { "confirm": "DELETE_ALL" } to proceed' });
      }

      const tables = [
        'notifications', 'reviews', 'subscriptions',
        'password_resets', 'refresh_tokens',
        'payments', 'order_items', 'orders',
        'user_roles', 'users'
      ];
      for (const table of tables) {
        await pool.execute(`TRUNCATE TABLE ${table} CASCADE`);
      }

      res.json({ message: 'Database reset. All users, orders, and payments cleared.' });
    } catch (error) {
      console.error('resetDatabase error:', error);
      res.status(500).json({ message: 'Could not reset database' });
    }
  },
};

module.exports = adminController;
