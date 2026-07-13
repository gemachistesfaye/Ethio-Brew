const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Analytics — real DB-backed. (Previously an inline handler returned hardcoded
// demo data and shadowed this controller; removed so the live query runs.)
router.get('/analytics', adminController.getAnalytics);

// User Management
router.get('/users', adminController.getUsers);
router.put('/users/role', adminController.updateUserRole);

// Order Management
router.put('/orders/status', adminController.updateOrderStatus);
router.post('/orders/verify-payment', adminController.verifyPayment);

module.exports = router;
