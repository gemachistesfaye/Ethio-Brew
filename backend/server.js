const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Register API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

// AI Route (Simulated or Real depending on env)
app.post('/api/ai', async (req, res) => {
  const { message } = req.body;
  if (!process.env.GEMINI_API_KEY) {
    // Simulated AI response for demo if no key
    return res.json({ response: "Hello! I am the Ethio-Brew AI assistant. I can help you pick the perfect coffee. How can I assist you today?" });
  }
  // If actual integration is required later, we would call the API here.
  res.json({ response: `You asked: "${message}". Our coffee experts are currently offline, but this is a simulated response!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ethio-Brew API is live on port ${PORT}`);
  console.log(`- Products: http://localhost:${PORT}/api/products`);
  console.log(`- Orders: http://localhost:${PORT}/api/orders`);
  console.log(`- Payments: http://localhost:${PORT}/api/payments`);
  console.log(`- Auth: http://localhost:${PORT}/api/auth`);
  console.log(`- AI: http://localhost:${PORT}/api/ai`);
});
