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

// Enable trust proxy for cloud platforms (Render, Heroku, Vercel)
app.set('trust proxy', 1);

// 1. GLOBAL SECURITY MIDDLEWARE
app.use(helmet()); // Sets various HTTP headers for security
app.use(cookieParser());
app.use(express.json({ limit: '10kb' })); // Prevents large payload attacks

// 2. CORS CONFIGURATION
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:3000", 
  "http://localhost:5173", 
  "http://localhost:5174"
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // 2. Normalize origins (remove trailing slashes) for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(allowed => 
        allowed.replace(/\/$/, '') === normalizedOrigin
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS Blocked for origin: ${origin}`);
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

// Root Route (Health Check & Welcome)
app.get(['/', '/api'], (req, res) => {
  res.json({
    message: "Welcome to Ethio-Brew Enterprise API",
    status: "Healthy",
    version: "1.0.0",
    docs: "https://github.com/gemachistesfaye/Ethio-Brew"
  });
});

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
                    contents: [{ parts: [{ text: `You are the 'Ethio-Brew Sommelier', an elite AI expert on Ethiopian coffee heritage. 

STYLING RULES:
- Use **bolding** for coffee regions and *italics* for flavor notes.
- Use emojis SPARINGLY (max 1 per response, only at the end).
- Do NOT use too many emojis. Keep it professional.
- Be concise and punchy for simple greetings.
- Be deeply detailed and cinematic only when asked for recommendations or history.

Always prioritize Ethiopian varieties (Yirgacheffe, Sidamo, Harar, Guji, Jimma) and cultural traditions.

CRITICAL LANGUAGE RULE:
- If language is 'am', you MUST speak ONLY Amharic (አማርኛ).
- If language is 'om', you MUST speak ONLY Afaan Oromoo.
- If language is 'en', you MUST speak ONLY English.

Current Language: ${language === 'am' ? 'Amharic' : language === 'om' ? 'Afaan Oromoo' : 'English'}.
User Query: ${message}` }] }]
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

const pool = require('./config/db');
const bcrypt = require('bcryptjs');

// 6. SELF-HEALING: DATABASE INITIALIZATION
const initializeDB = async () => {
    try {
        console.log("------------------------------------------");
        console.log("🛠️  DEVELOPER MODE: INITIALIZING DATABASE...");
        
        // Ensure Roles exist
        await pool.execute("INSERT IGNORE INTO roles (id, name, description) VALUES (1, 'customer', 'Default'), (2, 'admin', 'Master Admin')");
        
        // Ensure Password Resets table exists
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS password_resets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) NOT NULL,
                token VARCHAR(255) NOT NULL,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        const hashedPass = await bcrypt.hash('admin123', 12);
        
        // DELETE OLD ADMIN (To be 100% sure)
        await pool.execute("DELETE FROM users WHERE email = 'admin@ethiobrew.com'");
        
        // CREATE FRESH ADMIN
        const [result] = await pool.execute(
            "INSERT INTO users (full_name, email, password, is_verified) VALUES ('Master Admin', 'admin@ethiobrew.com', ?, TRUE)",
            [hashedPass]
        );
        
        // LINK ROLE
        await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, 2)', [result.insertId]);
        
        console.log("✅  DATABASE INITIALIZED & ADMIN ACCOUNT READY");
        console.log("------------------------------------------");
    } catch (err) {
        console.error("❌  DB INITIALIZATION FAILED:", err.message);
    }
};

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log('==========================================');
  console.log(`🚀  ETHIO-BREW ENTERPRISE API`);
  console.log(`📡  Status: RUNNING`);
  console.log(`🔗  Port: ${PORT}`);
  console.log(`🏗️  Mode: ${ENV.toUpperCase()}`);
  console.log('==========================================');
  
  initializeDB();
});

