const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Uploading a payment proof requires an authenticated user (the order owner).
router.post('/upload', protect, paymentController.uploadProof);

// Viewing pending payments and approving/rejecting them is admin-only.
// These expose payment screenshots and money-moving actions — never anonymous.
router.get('/pending', protect, authorize('admin'), paymentController.getPendingPayments);
router.put('/:id/verify', protect, authorize('admin'), paymentController.verifyPayment);

module.exports = router;
