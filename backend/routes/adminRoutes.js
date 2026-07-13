const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Analytics (delegates to the real controller — no more hardcoded demo data)
router.get('/analytics', adminController.getAnalytics);

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/role', adminController.updateUserRole);

// Order Management
router.get('/orders', adminController.getOrders);
router.put('/orders/status', adminController.updateOrderStatus);

// Payment Verification
router.post('/payments/verify', adminController.verifyPayment);

module.exports = router;
