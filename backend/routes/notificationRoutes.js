const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { idParamRules, paginationRules } = require('../middleware/validation');

router.get('/', paginationRules, notificationController.getMyNotifications);
router.put('/:id/read', idParamRules, notificationController.markAsRead);
router.put('/read-all', notificationController.markAllAsRead);
router.delete('/:id', idParamRules, notificationController.deleteNotification);

module.exports = router;
