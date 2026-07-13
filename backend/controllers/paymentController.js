const Payment = require('../models/Payment');

const paymentController = {
  // SECURITY: record which admin/user uploaded the proof from the JWT.
  uploadProof: async (req, res) => {
    try {
      const { order_id, method, proof_image } = req.body;
      if (!order_id || !method) {
        return res.status(400).json({ error: 'order_id and method are required' });
      }
      const paymentId = await Payment.create({ order_id, method, proof_image, uploaded_by: req.user.id });
      res.status(201).json({ message: 'Payment proof uploaded', paymentId });
    } catch (error) {
      console.error('uploadProof error:', error);
      res.status(500).json({ error: 'Could not upload payment proof.' });
    }
  },
  getPendingPayments: async (req, res) => {
    try {
      const payments = await Payment.findAllPending();
      res.json(payments);
    } catch (error) {
      console.error('getPendingPayments error:', error);
      res.status(500).json({ error: 'Could not load payments.' });
    }
  },
  verifyPayment: async (req, res) => {
    try {
      const allowed = ['Pending', 'Approved', 'Rejected'];
      if (!allowed.includes(req.body.status)) {
        return res.status(400).json({ error: 'Invalid payment status' });
      }
      // Record the verifying admin for an audit trail.
      await Payment.verify(req.params.id, req.body.status, req.body.admin_notes, req.user.id);
      res.json({ message: 'Payment verification updated' });
    } catch (error) {
      console.error('verifyPayment error:', error);
      res.status(500).json({ error: 'Could not verify payment.' });
    }
  }
};

module.exports = paymentController;
