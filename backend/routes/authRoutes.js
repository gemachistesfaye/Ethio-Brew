const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/verify', authController.verify);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Use 'protect' instead of 'authMiddleware'
router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, authController.updateProfile);

module.exports = router;
