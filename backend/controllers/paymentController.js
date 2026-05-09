const Payment = require('../models/Payment');

const paymentController = {
  uploadProof: async (req, res) => {
    try {
      const paymentId = await Payment.create(req.body);
      res.status(201).json({ message: 'Payment proof uploaded', paymentId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getPendingPayments: async (req, res) => {
    try {
      const payments = await Payment.findAllPending();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      await Payment.verify(req.params.id, req.body.status, req.body.admin_notes);
      res.json({ message: 'Payment verification updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = paymentController;
