const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const { createSubscriptionRules, updateSubscriptionRules, idParamRules, paginationRules } = require('../middleware/validation');

router.post('/', createSubscriptionRules, subscriptionController.createSubscription);
router.get('/mine', subscriptionController.getMySubscriptions);
router.put('/:id', idParamRules, updateSubscriptionRules, subscriptionController.updateSubscription);
router.post('/:id/cancel', idParamRules, subscriptionController.cancelSubscription);

router.get('/admin/all', paginationRules, subscriptionController.getAllSubscriptions);

module.exports = router;
