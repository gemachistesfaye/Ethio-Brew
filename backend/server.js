const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);

// Super-Resilient Gemini AI Integration (Updated with your account's specific models)
app.post('/api/ai', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.json({ response: "Hello! I am the Ethio-Brew AI assistant. Please add your real GEMINI_API_KEY to the .env file!" });
  }

  // UPDATED: These are the exact models available for your specific key based on our scan
  const attempts = [
    { ver: 'v1beta', model: 'gemini-2.0-flash' },
    { ver: 'v1beta', model: 'gemini-2.5-flash' },
    { ver: 'v1beta', model: 'gemini-flash-latest' },
    { ver: 'v1beta', model: 'gemini-pro-latest' }
  ];

  let lastError = "";

  for (const attempt of attempts) {
    try {
      const url = `https://generativelanguage.googleapis.com/${attempt.ver}/models/${attempt.model}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are the official AI assistant for Ethio-Brew, a premium Ethiopian coffee startup. 
                    Your name is Coffee Expert. Be polite, enthusiastic, and keep it short.
                    
                    User: ${message}`
            }]
          }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        console.log(`AI Success using ${attempt.ver}/${attempt.model}`);
        return res.json({ response: data.candidates[0].content.parts[0].text });
      } else if (data.error) {
        lastError = data.error.message;
        console.log(`Attempt failed (${attempt.ver}/${attempt.model}): ${lastError}`);
      }
    } catch (err) {
      lastError = err.message;
      console.log(`Network error (${attempt.ver}/${attempt.model}): ${lastError}`);
    }
  }

  res.status(500).json({ 
    response: `AI Connection Failed. Google Error: "${lastError}". Please ensure the Generative Language API is enabled for this key.` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ethio-Brew API is live on port ${PORT}`);
});
