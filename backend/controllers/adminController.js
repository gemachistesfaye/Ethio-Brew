const pool = require('../config/db');

const adminController = {
    // Get real dynamic analytics from the database.
    getAnalytics: async (req, res) => {
        try {
            // 1. Totals. Region/beans are derived from order_items -> products,
            // not a self-join on orders.
            const [revenue] = await pool.execute(
                "SELECT SUM(total_amount) as total FROM orders WHERE status = 'Delivered' OR status = 'Shipped'"
            );
            const [orders] = await pool.execute('SELECT COUNT(*) as total FROM orders');
            const [users] = await pool.execute('SELECT COUNT(*) as total FROM users');
            // subscriptions status is capitalized in the production schema.
            const [subs] = await pool.execute(
                "SELECT COUNT(*) as total FROM subscriptions WHERE status = 'Active'"
            );

            // 2. Sales trends by month.
            const [trends] = await pool.execute(`
                SELECT DATE_FORMAT(created_at, '%b') as month, SUM(total_amount) as revenue
                FROM orders
                WHERE created_at > DATE_SUB(NOW(), INTERVAL 6 MONTH)
                GROUP BY month
                ORDER BY created_at ASC
            `);

            // 3. Regional demand: join order_items -> products to count which
            //    origin_region sells most. Falls back to empty list if the
            //    order_items table has no rows.
            const [regions] = await pool.execute(`
                SELECT p.origin_region AS region, COUNT(oi.id) AS count
                FROM order_items oi
                JOIN products p ON oi.product_id = p.id
                WHERE p.origin_region IS NOT NULL
                GROUP BY p.origin_region
                ORDER BY count DESC
                LIMIT 6
            `);
            const regionTotal = regions.reduce((sum, r) => sum + r.count, 0) || 1;
            const regionalDemand = regions.map(r => ({
                region: r.region,
                percentage: Math.round((r.count / regionTotal) * 100)
            }));

            res.json({
                overview: {
                    totalRevenue: revenue[0].total || 0,
                    revenueGrowth: 0,
                    totalOrders: orders[0].total,
                    orderGrowth: 0,
                    totalUsers: users[0].total,
                    userGrowth: 0,
                    activeSubscriptions: subs[0].total || 0
                },
                salesTrends: trends.length > 0 ? trends : [],
                regionalDemand
            });
        } catch (error) {
            console.error('Analytics error:', error);
            res.status(500).json({ message: 'Could not load analytics.' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const [rows] = await pool.execute(
                `SELECT u.id, u.full_name, u.email, u.phone, u.is_verified, u.is_blocked, u.created_at,
                        GROUP_CONCAT(r.name) AS roles
                 FROM users u
                 LEFT JOIN user_roles ur ON u.id = ur.user_id
                 LEFT JOIN roles r ON ur.role_id = r.id
                 GROUP BY u.id
                 ORDER BY u.created_at DESC`
            );
            res.json(rows);
        } catch (error) {
            console.error('getUsers error:', error);
            res.status(500).json({ message: 'Could not load users.' });
        }
    },

    updateUserRole: async (req, res) => {
        try {
            const { userId, role } = req.body;
            const [roleRow] = await pool.execute('SELECT id FROM roles WHERE name = ?', [role]);
            if (roleRow.length === 0) {
                return res.status(400).json({ message: 'Unknown role' });
            }
            await pool.execute('DELETE FROM user_roles WHERE user_id = ?', [userId]);
            await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleRow[0].id]);
            res.json({ message: 'Role updated' });
        } catch (error) {
            console.error('updateUserRole error:', error);
            res.status(500).json({ message: 'Could not update role.' });
        }
    },

    updateOrderStatus: async (req, res) => {
        try {
            const allowed = ['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'];
            const { orderId, status } = req.body;
            if (!allowed.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
            res.json({ message: 'Order status updated' });
        } catch (error) {
            console.error('updateOrderStatus error:', error);
            res.status(500).json({ message: 'Could not update order status.' });
        }
    },

    verifyPayment: async (req, res) => {
        try {
            const { paymentId, status } = req.body;
            const allowed = ['Pending', 'Approved', 'Rejected'];
            if (!allowed.includes(status)) {
                return res.status(400).json({ message: 'Invalid payment status' });
            }
            await pool.execute(
                'UPDATE payments SET status = ?, verified_by = ?, verified_at = CURRENT_TIMESTAMP WHERE id = ?',
                [status, req.user.id, paymentId]
            );
            res.json({ message: 'Payment verification updated' });
        } catch (error) {
            console.error('verifyPayment error:', error);
            res.status(500).json({ message: 'Could not verify payment.' });
        }
    }
};

module.exports = adminController;
