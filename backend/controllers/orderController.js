const Order = require('../models/Order');

const orderController = {
  // SECURITY: the user_id comes from the verified JWT (req.user), NEVER from the
  // request body. Trusting req.body.user_id would let any user place orders
  // against any other account (IDOR).
  createOrder: async (req, res) => {
    try {
      const { total_price, delivery_address, phone, items } = req.body;
      const orderId = await Order.create({
        user_id: req.user.id,
        total_price,
        delivery_address,
        phone,
        items
      });
      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      console.error('createOrder error:', error);
      res.status(500).json({ error: 'Could not create order. Please try again.' });
    }
  },
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error('getAllOrders error:', error);
      res.status(500).json({ error: 'Could not load orders.' });
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      // Whitelist allowed status values.
      const allowed = ['Pending', 'Payment Verified', 'Roasting', 'Packaging', 'Shipping', 'Delivered', 'Cancelled'];
      const status = req.body.status;
      if (!allowed.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
      await Order.updateStatus(req.params.id, status);
      res.json({ message: 'Order status updated' });
    } catch (error) {
      console.error('updateOrderStatus error:', error);
      res.status(500).json({ error: 'Could not update order status.' });
    }
  }
};

module.exports = orderController;
