const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { updateUserRoleRules, adminUpdateOrderStatusRules, adminVerifyPaymentRules, paginationRules } = require('../middleware/validation');

router.get('/analytics', adminController.getAnalytics);

router.get('/users', paginationRules, adminController.getUsers);
router.put('/users/role', updateUserRoleRules, adminController.updateUserRole);
router.put('/users/:id/block', adminController.blockUser);
router.put('/users/:id/unblock', adminController.unblockUser);

router.get('/orders', paginationRules, adminController.getOrders);
router.get('/orders/:id', adminController.getOrderById);
router.put('/orders/status', adminUpdateOrderStatusRules, adminController.updateOrderStatus);

router.get('/payments', paginationRules, adminController.getPayments);
router.post('/payments/verify', adminVerifyPaymentRules, adminController.verifyPayment);

router.post('/reset-database', adminController.resetDatabase);

module.exports = router;
