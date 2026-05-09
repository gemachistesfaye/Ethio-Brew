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

// Shared Product List for AI (Simplified for tokens)
const coffeeList = [
  { name: 'Midnight Espresso', price: 450, region: 'Jimma', notes: 'Dark chocolate, toasted nuts' },
  { name: 'Sidamo Sun-Dried', price: 380, region: 'Sidama', notes: 'Fruity, berry, syrupy' },
  { name: 'Yirgacheffe Floral', price: 420, region: 'Yirgacheffe', notes: 'Jasmine, lemony acidity' },
  { name: 'Harar Golden Bean', price: 410, region: 'Harar', notes: 'Wild berries, wine-like' },
  { name: 'Guji Highland Special', price: 460, region: 'Guji', notes: 'Peach, black tea' },
  { name: 'Buna Ceremony Blend', price: 320, region: 'Multi-region', notes: 'Traditional roast' },
  { name: 'Ethiopian Tasting Box', price: 850, region: 'All Regions', notes: 'Selection of 4 coffees' }
];

// Amazing Gemini AI Integration
app.post('/api/ai', async (req, res) => {
  const { message, language } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.json({ response: "Please add your real GEMINI_API_KEY to enable the AI." });
  }

  const langName = language === 'am' ? 'Amharic' : language === 'om' ? 'Afaan Oromo' : 'English';

  const attempts = [
    { ver: 'v1beta', model: 'gemini-2.0-flash' },
    { ver: 'v1beta', model: 'gemini-2.5-flash' },
    { ver: 'v1beta', model: 'gemini-flash-latest' }
  ];

  let lastError = "";

  for (const attempt of attempts) {
    try {
      const url = `https://generativelanguage.googleapis.com/${attempt.ver}/models/${attempt.model}:generateContent?key=${apiKey}`;
      
      const systemPrompt = `
        You are "Coffee Expert", the official AI assistant for Ethio-Brew. 
        
        KNOWLEDGE BASE:
        1. Our Products: ${JSON.stringify(coffeeList)}
        2. Cultural Expertise: You know the Ethiopian coffee ceremony (Abol, Tona, Bereka) in detail.
        3. Regions: You are an expert on Sidamo, Yirgacheffe, Harar, and Jimma beans.
        
        INSTRUCTIONS:
        - Response Language: You MUST respond in ${langName}. 
        - Style: Enthusiastic, professional, and culturally respectful.
        - Recommendations: Always suggest 1 or 2 specific products from the list above when relevant.
        - Brevity: Keep responses concise (under 3 sentences unless explaining a ceremony).
        
        User Query: "${message}"
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return res.json({ response: data.candidates[0].content.parts[0].text });
      } else if (data.error) {
        lastError = data.error.message;
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  res.status(500).json({ response: `Error: ${lastError}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Ethio-Brew Amazing AI API is live on port ${PORT}`);
});
