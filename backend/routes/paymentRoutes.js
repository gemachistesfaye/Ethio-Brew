const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/upload', paymentController.uploadProof);
router.get('/pending', paymentController.getPendingPayments);
router.put('/:id/verify', paymentController.verifyPayment);

module.exports = router;
