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
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:3000", 
  "http://localhost:5173", 
  "http://localhost:5174"
].filter(Boolean);

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

const pool = require('./config/db');
const bcrypt = require('bcryptjs');

// 6. SELF-HEALING: ULTIMATE ADMIN RESET
const seedAdmin = async () => {
    try {
        console.log("------------------------------------------");
        console.log("🛠️  DEVELOPER MODE: RESETTING ADMIN ACCOUNT...");
        const hashedPass = await bcrypt.hash('admin123', 12);
        
        // Ensure Roles exist
        await pool.execute('INSERT IGNORE INTO roles (id, name, description) VALUES (1, "customer", "Default"), (2, "admin", "Master Admin")');
        
        // DELETE OLD ADMIN (To be 100% sure)
        await pool.execute('DELETE FROM users WHERE email = "admin@ethiobrew.com"');
        
        // CREATE FRESH ADMIN
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, password, is_verified) VALUES ("Master Admin", "admin@ethiobrew.com", ?, TRUE)',
            [hashedPass]
        );
        
        // LINK ROLE
        await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, 2)', [result.insertId]);
        
        console.log("✅  ADMIN ACCOUNT RESET TO: admin@ethiobrew.com / admin123");
        console.log("------------------------------------------");
    } catch (err) {
        console.error("❌  ADMIN RESET FAILED:", err.message);
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
  
  // Initialize admin only if DB is likely ready
  // The db.js already logs its own status
  seedAdmin();
});

