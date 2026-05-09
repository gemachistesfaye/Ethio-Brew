const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assuming db.js exists and exports a promise-based pool

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
router.get('/analytics', async (req, res) => {
    try {
        // In a real app, these would be separate optimized queries
        // For now, we'll return structured mock data until the DB is fully populated
        const analytics = {
            overview: {
                totalRevenue: 125430.50,
                revenueGrowth: 12.5,
                totalOrders: 452,
                orderGrowth: 8.2,
                totalUsers: 1240,
                userGrowth: 15.1,
                activeSubscriptions: 85
            },
            salesTrends: [
                { month: 'Jan', revenue: 15000 },
                { month: 'Feb', revenue: 18000 },
                { month: 'Mar', revenue: 16500 },
                { month: 'Apr', revenue: 22000 },
                { month: 'May', revenue: 25000 }
            ],
            popularProducts: [
                { name: 'Yirgacheffe Floral', sales: 145 },
                { name: 'Sidamo Sun-Dried', sales: 120 },
                { name: 'Harar Golden', sales: 98 }
            ],
            regionalDemand: [
                { region: 'Addis Ababa', percentage: 45 },
                { region: 'Dire Dawa', percentage: 15 },
                { region: 'Bahir Dar', percentage: 20 },
                { region: 'Others', percentage: 20 }
            ]
        };

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
