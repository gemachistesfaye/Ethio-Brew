const Review = require('../models/Review');

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { product_id, rating, comment } = req.body;

      const existing = await Review.findUserReviewForProduct(req.user.id, product_id);
      if (existing) {
        return res.status(400).json({ error: 'You have already reviewed this product. Edit your existing review instead.' });
      }

      const id = await Review.create({ user_id: req.user.id, product_id, rating, comment });
      res.status(201).json({ id, message: 'Review created successfully' });
    } catch (error) {
      console.error('createReview error:', error);
      res.status(500).json({ error: 'Could not create review.' });
    }
  },

  getProductReviews: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Review.findByProductId(req.params.productId, { page, limit });
      res.json(result);
    } catch (error) {
      console.error('getProductReviews error:', error);
      res.status(500).json({ error: 'Could not load reviews.' });
    }
  },

  getMyReviews: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Review.findByUserId(req.user.id, { page, limit });
      res.json(result);
    } catch (error) {
      console.error('getMyReviews error:', error);
      res.status(500).json({ error: 'Could not load reviews.' });
    }
  },

  updateReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ error: 'Review not found' });
      if (review.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

      const { rating, comment } = req.body;
      await Review.update(req.params.id, { rating, comment });
      res.json({ message: 'Review updated successfully' });
    } catch (error) {
      console.error('updateReview error:', error);
      res.status(500).json({ error: 'Could not update review.' });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ error: 'Review not found' });
      if (review.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

      await Review.delete(req.params.id);
      res.json({ message: 'Review deleted' });
    } catch (error) {
      console.error('deleteReview error:', error);
      res.status(500).json({ error: 'Could not delete review.' });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Review.findAll({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getAllReviews error:', error);
      res.status(500).json({ error: 'Could not load reviews.' });
    }
  },

  adminDeleteReview: async (req, res) => {
    try {
      const affected = await Review.delete(req.params.id);
      if (affected === 0) return res.status(404).json({ error: 'Review not found' });
      res.json({ message: 'Review deleted' });
    } catch (error) {
      console.error('adminDeleteReview error:', error);
      res.status(500).json({ error: 'Could not delete review.' });
    }
  },
};

module.exports = reviewController;
