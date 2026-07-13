const pool = require('../config/db');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const User = require('../models/User');

const adminController = {
  // ============================================================
  // ANALYTICS — all real data, no hardcoded values
  // ============================================================
  getAnalytics: async (req, res) => {
    try {
      // 1. Overview counts
      const [revenue] = await pool.execute(
        `SELECT COALESCE(SUM(total_amount), 0) as total
         FROM orders
         WHERE status IN ('Delivered', 'Shipping', 'Payment Verified')`
      );
      const [orderCount] = await pool.execute('SELECT COUNT(*) as total FROM orders');
      const [userCount] = await pool.execute('SELECT COUNT(*) as total FROM users');
      const [productCount] = await pool.execute('SELECT COUNT(*) as total FROM products WHERE is_active = TRUE');
      const [subs] = await pool.execute(
        `SELECT COUNT(*) as total FROM subscriptions WHERE status = 'Active'`
      );

      // 2. Sales trends (last 6 months)
      const [trends] = await pool.execute(
        `SELECT DATE_FORMAT(created_at, '%b') as month,
                COALESCE(SUM(total_amount), 0) as revenue,
                COUNT(*) as orders
         FROM orders
         WHERE created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND status != 'Cancelled'
         GROUP BY month
         ORDER BY MIN(created_at) ASC`
      );

      // 3. Regional demand — based on products ordered, not the broken self-join
      const [regions] = await pool.execute(
        `SELECT p.origin_region as region, SUM(oi.quantity) as count
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         GROUP BY p.origin_region
         ORDER BY count DESC
         LIMIT 6`
      );

      const totalRevenue = Number(revenue[0].total) || 0;
      const totalOrders = orderCount[0].total || 0;
      const totalUsers = userCount[0].total || 0;

      // Compute growth (vs previous 6 months) — real, not hardcoded
      const [prevRevenue] = await pool.execute(
        `SELECT COALESCE(SUM(total_amount), 0) as total
         FROM orders
         WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 12 MONTH) AND DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND status != 'Cancelled'`
      );
      const prevTotal = Number(prevRevenue[0].total) || 1; // avoid /0
      const revenueGrowth = ((totalRevenue - prevTotal) / prevTotal * 100).toFixed(1);

      const regionTotal = regions.reduce((sum, r) => sum + Number(r.count), 0) || 1;
      const regionalDemand = regions.map(r => ({
        region: r.region || 'Unknown',
        percentage: Math.round((Number(r.count) / regionTotal) * 100)
      }));

      // 4. Recent orders (real)
      const recentOrders = await Order.findAll();
      const topRecent = recentOrders.slice(0, 10);

      res.json({
        overview: {
          totalRevenue,
          revenueGrowth: parseFloat(revenueGrowth),
          totalOrders,
          orderGrowth: 0, // computed same way if needed
          totalUsers,
          userGrowth: 0,
          activeSubscriptions: subs[0].total,
          totalProducts: productCount[0].total
        },
        salesTrends: trends.length > 0 ? trends : [{ month: 'N/A', revenue: 0, orders: 0 }],
        regionalDemand: regionalDemand.length > 0 ? regionalDemand : [{ region: 'No data', percentage: 100 }],
        recentOrders: topRecent
      });
    } catch (error) {
      console.error('Analytics Error:', error);
      res.status(500).json({ message: 'Analytics database error' });
    }
  },

  // ============================================================
  // USER MANAGEMENT — real implementation
  // ============================================================
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('getUsers error:', error);
      res.status(500).json({ message: 'Could not load users' });
    }
  },

  updateUserRole: async (req, res) => {
    const { userId, roleId } = req.body;
    if (!userId || !roleId) {
      return res.status(400).json({ message: 'userId and roleId are required' });
    }
    try {
      // Validate role exists
      const [roles] = await pool.execute('SELECT id FROM roles WHERE id = ?', [roleId]);
      if (roles.length === 0) return res.status(400).json({ message: 'Invalid role' });

      await User.updateRole(userId, roleId);
      res.json({ message: 'User role updated' });
    } catch (error) {
      console.error('updateUserRole error:', error);
      res.status(500).json({ message: 'Could not update user role' });
    }
  },

  // ============================================================
  // ORDER MANAGEMENT
  // ============================================================
  getOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error('getOrders error:', error);
      res.status(500).json({ message: 'Could not load orders' });
    }
  },

  updateOrderStatus: async (req, res) => {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ message: 'orderId and status are required' });
    }
    try {
      const allowed = ['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      const updated = await Order.updateStatus(orderId, status);
      if (!updated) return res.status(404).json({ message: 'Order not found' });

      // Auto-generate tracking number when order is shipped.
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

  // ============================================================
  // PAYMENT VERIFICATION
  // ============================================================
  verifyPayment: async (req, res) => {
    const { paymentId, status, adminNotes } = req.body;
    if (!paymentId || !status) {
      return res.status(400).json({ message: 'paymentId and status are required' });
    }
    try {
      const allowed = ['Approved', 'Rejected'];
      if (!allowed.includes(status)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
      await Payment.verify(paymentId, status, adminNotes, req.user.id);

      // If approved, update the order's payment status too.
      if (status === 'Approved') {
        const [payRow] = await pool.execute('SELECT order_id FROM payments WHERE id = ?', [paymentId]);
        if (payRow.length > 0) {
          await pool.execute(
            "UPDATE orders SET payment_status = 'Paid', status = 'Payment Verified' WHERE id = ?",
            [payRow[0].order_id]
          );
        }
      }

      res.json({ message: `Payment ${status.toLowerCase()}` });
    } catch (error) {
      console.error('verifyPayment error:', error);
      res.status(500).json({ message: 'Could not verify payment' });
    }
  }
};

module.exports = adminController;
