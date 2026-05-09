const pool = require('../config/db');

const adminController = {
    // Get all users with their roles
    getUsers: async (req, res) => {
        try {
            const [users] = await pool.execute(`
                SELECT u.id, u.full_name, u.email, u.phone, GROUP_CONCAT(r.name) as roles
                FROM users u
                LEFT JOIN user_roles ur ON u.id = ur.user_id
                LEFT JOIN roles r ON ur.role_id = r.id
                GROUP BY u.id
            `);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update user role
    updateUserRole: async (req, res) => {
        const { userId, roleName } = req.body;
        try {
            // Remove old roles
            await pool.execute('DELETE FROM user_roles WHERE user_id = ?', [userId]);
            // Add new role
            await pool.execute(
                'INSERT INTO user_roles (user_id, role_id) VALUES (?, (SELECT id FROM roles WHERE name = ?))',
                [userId, roleName]
            );
            res.json({ message: `User promoted to ${roleName}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update Order Status
    updateOrderStatus: async (req, res) => {
        const { orderId, status } = req.body;
        try {
            await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
            res.json({ message: `Order ${orderId} is now ${status}` });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Verify Payment
    verifyPayment: async (req, res) => {
        const { orderId } = req.body;
        try {
            await pool.execute('UPDATE orders SET status = "Payment Verified" WHERE id = ?', [orderId]);
            await pool.execute('UPDATE payments SET status = "completed" WHERE order_id = ?', [orderId]);
            res.json({ message: 'Payment verified successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = adminController;
