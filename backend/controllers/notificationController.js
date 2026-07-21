const Notification = require('../models/Notification');

const notificationController = {
  getMyNotifications: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Notification.findByUserId(req.user.id, { page, limit });
      res.json(result);
    } catch (error) {
      console.error('getMyNotifications error:', error);
      res.status(500).json({ error: 'Could not load notifications.' });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const affected = await Notification.markAsRead(req.params.id, req.user.id);
      if (affected === 0) return res.status(404).json({ error: 'Notification not found' });
      res.json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('markAsRead error:', error);
      res.status(500).json({ error: 'Could not update notification.' });
    }
  },

  markAllAsRead: async (req, res) => {
    try {
      const count = await Notification.markAllAsRead(req.user.id);
      res.json({ message: `${count} notifications marked as read` });
    } catch (error) {
      console.error('markAllAsRead error:', error);
      res.status(500).json({ error: 'Could not update notifications.' });
    }
  },

  deleteNotification: async (req, res) => {
    try {
      const affected = await Notification.delete(req.params.id, req.user.id);
      if (affected === 0) return res.status(404).json({ error: 'Notification not found' });
      res.json({ message: 'Notification deleted' });
    } catch (error) {
      console.error('deleteNotification error:', error);
      res.status(500).json({ error: 'Could not delete notification.' });
    }
  },
};

module.exports = notificationController;
