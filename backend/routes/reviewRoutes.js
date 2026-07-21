const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { createReviewRules, idParamRules, paginationRules } = require('../middleware/validation');

router.get('/product/:productId', paginationRules, reviewController.getProductReviews);

router.post('/', protect, createReviewRules, reviewController.createReview);
router.get('/mine', protect, paginationRules, reviewController.getMyReviews);
router.put('/:id', protect, idParamRules, reviewController.updateReview);
router.delete('/:id', protect, idParamRules, reviewController.deleteReview);

router.get('/all', protect, authorize('admin'), paginationRules, reviewController.getAllReviews);
router.delete('/admin/:id', protect, authorize('admin'), idParamRules, reviewController.adminDeleteReview);

module.exports = router;
