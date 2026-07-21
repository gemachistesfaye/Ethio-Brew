const Subscription = require('../models/Subscription');

const subscriptionController = {
  createSubscription: async (req, res) => {
    try {
      const { plan_name, frequency_days } = req.body;
      const id = await Subscription.create({
        user_id: req.user.id,
        plan_name,
        frequency_days,
      });
      res.status(201).json({ id, message: 'Subscription created successfully' });
    } catch (error) {
      console.error('createSubscription error:', error);
      res.status(500).json({ error: 'Could not create subscription.' });
    }
  },

  getMySubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.findByUserId(req.user.id);
      res.json(subscriptions);
    } catch (error) {
      console.error('getMySubscriptions error:', error);
      res.status(500).json({ error: 'Could not load subscriptions.' });
    }
  },

  updateSubscription: async (req, res) => {
    try {
      const sub = await Subscription.findById(req.params.id);
      if (!sub) return res.status(404).json({ error: 'Subscription not found' });
      if (sub.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

      await Subscription.update(req.params.id, req.body);
      res.json({ message: 'Subscription updated successfully' });
    } catch (error) {
      console.error('updateSubscription error:', error);
      res.status(500).json({ error: 'Could not update subscription.' });
    }
  },

  cancelSubscription: async (req, res) => {
    try {
      const sub = await Subscription.findById(req.params.id);
      if (!sub) return res.status(404).json({ error: 'Subscription not found' });
      if (sub.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

      await Subscription.update(req.params.id, { status: 'Cancelled' });
      res.json({ message: 'Subscription cancelled' });
    } catch (error) {
      console.error('cancelSubscription error:', error);
      res.status(500).json({ error: 'Could not cancel subscription.' });
    }
  },

  getAllSubscriptions: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const { status } = req.query;
      const result = await Subscription.findAll({ page, limit, status });
      res.json(result);
    } catch (error) {
      console.error('getAllSubscriptions error:', error);
      res.status(500).json({ error: 'Could not load subscriptions.' });
    }
  },
};

module.exports = subscriptionController;
