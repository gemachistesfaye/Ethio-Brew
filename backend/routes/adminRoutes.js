const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Analytics (Already exists)
router.get('/analytics', async (req, res) => {
    // ... logic I wrote before ...
    res.json({
        overview: { totalRevenue: 125430.5, revenueGrowth: 12.5, totalOrders: 452, orderGrowth: 8.2, totalUsers: 1240, userGrowth: 15.1, activeSubscriptions: 85 },
        salesTrends: [{ month: 'Jan', revenue: 15000 }, { month: 'Feb', revenue: 18000 }, { month: 'Mar', revenue: 16500 }, { month: 'Apr', revenue: 22000 }, { month: 'May', revenue: 25000 }],
        regionalDemand: [{ region: 'Addis Ababa', percentage: 45 }, { region: 'Dire Dawa', percentage: 15 }, { region: 'Bahir Dar', percentage: 20 }, { region: 'Others', percentage: 20 }]
    });
});

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/role', adminController.updateUserRole);

// Order Management
router.put('/orders/status', adminController.updateOrderStatus);
router.post('/orders/verify-payment', adminController.verifyPayment);

module.exports = router;
