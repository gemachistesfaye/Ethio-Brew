const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createOrderRules, updateOrderStatusRules, idParamRules, paginationRules } = require('../middleware/validation');

router.post('/', protect, createOrderRules, orderController.createOrder);
router.get('/mine', protect, paginationRules, orderController.getMyOrders);
router.get('/mine/:id', protect, idParamRules, orderController.getMyOrderById);
router.get('/', protect, authorize('admin'), paginationRules, orderController.getAllOrders);
router.get('/:id', protect, authorize('admin'), idParamRules, orderController.getOrderById);
router.put('/:id/status', protect, authorize('admin'), idParamRules, updateOrderStatusRules, orderController.updateOrderStatus);

module.exports = router;
