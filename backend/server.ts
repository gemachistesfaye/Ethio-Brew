
/**
 * BACKEND SERVER LOGIC (Node.js + Express + TypeScript)
 */

/*
import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

// 1. Manual Payment Proof Upload
app.post('/api/orders/upload-proof', upload.single('screenshot'), async (req, res) => {
    const { orderId, paymentMethod } = req.body;
    const screenshotUrl = req.file?.path;
    
    // Update DB: 
    // UPDATE orders SET 
    //   payment_method = paymentMethod, 
    //   payment_screenshot_url = screenshotUrl, 
    //   status = 'Awaiting Confirmation' 
    // WHERE id = orderId;
    
    res.json({ success: true, message: "Payment proof uploaded. Awaiting admin confirmation." });
});

// 2. Admin Confirm Payment
app.post('/api/admin/confirm-payment', async (req, res) => {
    const { orderId } = req.body;
    // Check if user is admin
    // Update DB: UPDATE orders SET paid = true, status = 'Preparing' WHERE id = orderId;
    res.json({ success: true, message: "Order marked as paid." });
});

app.listen(3000, () => console.log('Server running on port 3000'));
*/
