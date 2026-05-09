const express = require('express');
const router = express.Router();

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
router.get('/analytics', async (req, res) => {
    try {
        console.log("Admin Analytics Requested by:", req.user.email);
        
        // Return high-fidelity mock data for the enterprise demo
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

        res.status(200).json(analytics);
    } catch (error) {
        console.error("Analytics Route Error:", error);
        res.status(500).json({ message: "Internal Server Error in Analytics" });
    }
});

module.exports = router;
