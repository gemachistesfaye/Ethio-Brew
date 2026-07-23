const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerRules, loginRules, updateProfileRules, changePasswordRules, forgotPasswordRules, verifyOTPRules, resetPasswordOTPRules, resendOTPRules } = require('../middleware/validation');

router.post('/register', registerRules, authController.register);
router.post('/verify', verifyOTPRules, authController.verify);
router.post('/login', loginRules, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.post('/forgot-password', forgotPasswordRules, authController.forgotPassword);
router.post('/reset-password', resetPasswordOTPRules, authController.resetPassword);
router.post('/resend-otp', resendOTPRules, authController.resendOTP);

router.get('/profile', protect, authController.getProfile);
router.put('/profile', protect, updateProfileRules, authController.updateProfile);
router.post('/change-password', protect, changePasswordRules, authController.changePassword);

module.exports = router;
