const pool = require('../config/db');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { paymentApprovedEmail, paymentRejectedEmail } = require('../utils/emailTemplates');
const { PAYMENT_VALID_TRANSITIONS } = require('../utils/constants');

const paymentController = {
  uploadProof: async (req, res) => {
    try {
      const { order_id, method, screenshot_url, proof_image, amount } = req.body;
      const image = screenshot_url || proof_image;

      const order = await Order.findById(order_id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      if (order.user_id !== req.user.id) return res.status(403).json({ error: 'Not authorized' });

      const paymentId = await Payment.create({
        order_id,
        method,
        screenshot_url: image,
        amount: amount || order.total_amount,
      });

      await pool.execute(
        "UPDATE orders SET payment_status = 'Pending Verification' WHERE id = ? AND payment_status = 'Unpaid'",
        [order_id]
      );

      res.status(201).json({ message: 'Payment proof uploaded', paymentId });
    } catch (error) {
      console.error('uploadProof error:', error);
      res.status(500).json({ error: 'Could not upload payment proof.' });
    }
  },

  getMyPayments: async (req, res) => {
    try {
      const payments = await Payment.findByOrderId(req.query.order_id);
      const filtered = [];
      for (const p of payments) {
        const order = await Order.findById(p.order_id);
        if (order && order.user_id === req.user.id) {
          filtered.push(p);
        }
      }
      res.json(filtered);
    } catch (error) {
      console.error('getMyPayments error:', error);
      res.status(500).json({ error: 'Could not load payments.' });
    }
  },

  getPendingPayments: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await Payment.findAllPending({ page, limit });
      res.json(result);
    } catch (error) {
      console.error('getPendingPayments error:', error);
      res.status(500).json({ error: 'Could not load payments.' });
    }
  },

  verifyPayment: async (req, res) => {
    try {
      const { status, admin_notes } = req.body;
      const payment = await Payment.findById(req.params.id);
      if (!payment) return res.status(404).json({ error: 'Payment not found' });

      const allowed = PAYMENT_VALID_TRANSITIONS[payment.status];
      if (!allowed || !allowed.includes(status)) {
        return res.status(400).json({
          error: `Cannot transition from "${payment.status}" to "${status}". Allowed: ${allowed ? allowed.join(', ') : 'none'}`,
        });
      }

      await Payment.verify(req.params.id, status, admin_notes, req.user.id);

      try {
        const order = await Order.findById(payment.order_id);
        const user = order && order.user_id ? await User.findById(order.user_id) : null;
        if (user) {
          if (status === 'Approved') {
            await pool.execute(
              "UPDATE orders SET payment_status = 'Paid', status = 'Payment Verified' WHERE id = ?",
              [payment.order_id]
            );
            await sendEmail({ email: user.email, subject: 'Payment Approved', message: paymentApprovedEmail(user.full_name, payment.order_id, payment.amount || order.total_amount) });
          } else if (status === 'Rejected') {
            await pool.execute(
              "UPDATE orders SET payment_status = 'Unpaid' WHERE id = ?",
              [payment.order_id]
            );
            await sendEmail({ email: user.email, subject: 'Payment Rejected', message: paymentRejectedEmail(user.full_name, payment.order_id, admin_notes) });
          }
        }
      } catch (e) {
        console.error('Payment email error:', e.message);
      }

      res.json({ message: `Payment ${status.toLowerCase()}` });
    } catch (error) {
      console.error('verifyPayment error:', error);
      res.status(500).json({ error: 'Could not verify payment.' });
    }
  },
};

module.exports = paymentController;
