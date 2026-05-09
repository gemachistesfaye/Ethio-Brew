const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

// Security Utilities
const { protect, authorize } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// 1. GLOBAL SECURITY MIDDLEWARE
app.use(helmet()); // Sets various HTTP headers for security
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // Prevents large payload attacks

// 2. CORS CONFIGURATION
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// 3. RATE LIMITING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// 4. ROUTES
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); // New Admin Routes

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', protect, authorize('admin'), adminRoutes);

// 5. AMAZING AI ENDPOINT (Updated with Security)
app.post('/api/ai', async (req, res) => {
    const { message, language } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ response: "AI Config Error" });

    const attempts = [
        { ver: 'v1beta', model: 'gemini-2.0-flash' },
        { ver: 'v1beta', model: 'gemini-2.5-flash' }
    ];

    for (const attempt of attempts) {
        try {
            const url = `https://generativelanguage.googleapis.com/${attempt.ver}/models/${attempt.model}:generateContent?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `You are Coffee Expert. Language: ${language}. Query: ${message}` }] }]
                })
            });
            const data = await response.json();
            if (data.candidates) return res.json({ response: data.candidates[0].content.parts[0].text });
        } catch (err) { continue; }
    }
    res.status(500).json({ response: "AI Connection Failed" });
});

// 6. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Ethio-Brew Enterprise API running on port ${PORT}`);
});
