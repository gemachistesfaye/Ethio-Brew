const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Customers create orders for themselves — must be authenticated.
router.post('/', protect, orderController.createOrder);

// Listing all orders is admin-only; a logged-in customer should only see their
// own (handled at the controller level). For now, require auth + admin for the
// global list to avoid leaking every order's PII.
router.get('/', protect, authorize('admin'), orderController.getAllOrders);

// Status changes are admin-only.
router.put('/:id/status', protect, authorize('admin'), orderController.updateOrderStatus);

module.exports = router;
