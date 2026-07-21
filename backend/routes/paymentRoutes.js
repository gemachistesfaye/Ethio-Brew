const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadPaymentRules, verifyPaymentRules, paginationRules } = require('../middleware/validation');

router.post('/upload', protect, uploadPaymentRules, paymentController.uploadProof);
router.get('/mine', protect, paymentController.getMyPayments);
router.get('/pending', protect, authorize('admin'), paginationRules, paymentController.getPendingPayments);
router.put('/:id/verify', protect, authorize('admin'), verifyPaymentRules, paymentController.verifyPayment);

module.exports = router;
