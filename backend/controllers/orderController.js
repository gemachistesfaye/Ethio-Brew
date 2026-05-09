const Order = require('../models/Order');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const orderId = await Order.create(req.body);
      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      await Order.updateStatus(req.params.id, req.body.status);
      res.json({ message: 'Order status updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = orderController;
