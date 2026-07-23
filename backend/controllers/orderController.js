const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { orderConfirmedEmail } = require('../utils/emailTemplates');
const { ORDER_STATUS_TRANSITIONS } = require('../utils/constants');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { shipping_address, delivery_address, phone_number, phone, items, payment_method } = req.body;
      const address = shipping_address || delivery_address;
      const phoneNum = phone_number || phone;

      if (!address) return res.status(400).json({ error: 'Shipping address is required' });
      if (!phoneNum) return res.status(400).json({ error: 'Phone number is required' });
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'At least one item is required' });
      }

      let total_amount = 0;
      const validatedItems = [];

      for (const item of items) {
        if (!item.product_id || !item.quantity || item.quantity < 1) {
          return res.status(400).json({ error: `Invalid item: product_id and quantity required` });
        }
        const product = await Product.findById(item.product_id);
        if (!product) {
          return res.status(400).json({ error: `Product ${item.product_id} not found` });
        }
        if (!product.is_active) {
          return res.status(400).json({ error: `Product "${product.name_en}" is no longer available` });
        }
        if (product.stock_quantity < item.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for "${product.name_en}": ${product.stock_quantity} available, ${item.quantity} requested`,
          });
        }
        const lineTotal = Number(product.price) * item.quantity;
        total_amount += lineTotal;
        validatedItems.push({
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: product.price,
        });
      }

      const orderId = await Order.create({
        user_id: req.user.id,
        total_amount: total_amount.toFixed(2),
        shipping_address: address,
        phone_number: phoneNum,
        payment_method: payment_method || null,
        items: validatedItems,
      });

      try {
        const user = await User.findById(req.user.id);
        if (user) {
          await sendEmail({
            email: user.email,
            subject: 'Order Confirmed',
            message: orderConfirmedEmail(user.full_name, orderId, total_amount.toFixed(2)),
          });
        }
      } catch (e) {
        console.error('Order confirmed email error:', e.message);
      }

      res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
      console.error('createOrder error:', error);
      res.status(500).json({ error: 'Could not create order. Please try again.' });
    }
  },

  getMyOrders: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Order.findByUserId(req.user.id, { page, limit });
      res.json(result);
    } catch (error) {
      console.error('getMyOrders error:', error);
      res.status(500).json({ error: 'Could not load orders.' });
    }
  },

  getMyOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      if (order.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
      const items = await Order.findItemsByOrderId(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error('getMyOrderById error:', error);
      res.status(500).json({ error: 'Could not load order.' });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Order.findAll({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getAllOrders error:', error);
      res.status(500).json({ error: 'Could not load orders.' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      const items = await Order.findItemsByOrderId(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error('getOrderById error:', error);
      res.status(500).json({ error: 'Could not load order.' });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });

      const allowed = ORDER_STATUS_TRANSITIONS[order.status];
      if (!allowed || !allowed.includes(status)) {
        return res.status(400).json({
          error: `Cannot transition from "${order.status}" to "${status}". Allowed: ${allowed ? allowed.join(', ') : 'none'}`,
        });
      }

      await Order.updateStatus(req.params.id, status);
      res.json({ message: 'Order status updated' });
    } catch (error) {
      console.error('updateOrderStatus error:', error);
      res.status(500).json({ error: 'Could not update order status.' });
    }
  },
};

module.exports = orderController;
