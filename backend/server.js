const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
// const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
// app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ethio-Brew API is live on port ${PORT}`);
  console.log(`- Products: http://localhost:${PORT}/api/products`);
  console.log(`- Orders: http://localhost:${PORT}/api/orders`);
  console.log(`- Payments: http://localhost:${PORT}/api/payments`);
});
