const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Security Utilities
const { protect, authorize } = require('./middleware/authMiddleware');

dotenv.config();

// SECURITY: require a strong JWT secret at boot (tokenUtils throws otherwise).
// Importing here validates configuration as early as possible.
require('./utils/tokenUtils');

// Lazy-init the Gemini client once (key read from env, never placed in a URL).
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

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

// 3b. STRICTER RATE LIMITING for the expensive AI endpoint
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,        // 1 minute
  max: 8,                     // 8 AI requests per IP per minute
  message: { status: 'error', message: 'Too many AI requests, slow down.' }
});

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

// 5. AI ENDPOINT — uses the official SDK, key in Authorization header (never in URL).
app.post('/api/ai', aiLimiter, async (req, res) => {
    const { message, language } = req.body;

    // Input validation
    if (typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ response: 'A non-empty message is required.' });
    }
    if (message.length > 1000) {
        return res.status(413).json({ response: 'Message too long (max 1000 characters).' });
    }
    const lang = ['am', 'om', 'en'].includes(language) ? language : 'en';

    if (!genAI) {
        return res.status(503).json({ response: 'AI service is not configured.' });
    }

    const SYSTEM_PROMPT = `You are the 'Ethio-Brew Sommelier', an elite AI expert on Ethiopian coffee heritage.

STYLING RULES:
- Use **bolding** for coffee regions and *italics* for flavor notes.
- Use emojis SPARINGLY (max 1 per response, only at the end).
- Be concise and punchy for simple greetings.
- Be deeply detailed and cinematic only when asked for recommendations or history.

Always prioritize Ethiopian varieties (Yirgacheffe, Sidamo, Harar, Guji, Jimma) and cultural traditions.

CRITICAL LANGUAGE RULE:
- If language is 'am', you MUST speak ONLY Amharic (አማርኛ).
- If language is 'om', you MUST speak ONLY Afaan Oromoo.
- If language is 'en', you MUST speak ONLY English.

Current Language: ${lang === 'am' ? 'Amharic' : lang === 'om' ? 'Afaan Oromoo' : 'English'}.`;

    const models = ['gemini-2.0-flash', 'gemini-2.5-flash'];
    for (const modelName of models) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent([
                { text: SYSTEM_PROMPT },
                { text: `User Query: ${message}` }
            ]);
            const text = result.response.text();
            if (text) return res.json({ response: text });
        } catch (err) {
            // Try the next model.
            continue;
        }
    }
    res.status(502).json({ response: 'AI service is temporarily unavailable.' });
});

// 6. GLOBAL ERROR HANDLER — never leak internal error details to clients.
app.use((err, req, res, next) => {
    console.error(err.stack || err);

    // Preserve intended status codes from controllers that throw with a status.
    const status = err.status && Number.isInteger(err.status) ? err.status : 500;

    if (status >= 500) {
        // Generic message for server errors; full detail stays in logs.
        return res.status(status).json({ status: 'error', message: 'Internal server error' });
    }
    // For 4xx, the controller's message is safe to surface.
    return res.status(status).json({ status: 'error', message: err.message || 'Request error' });
});

const pool = require('./config/db');
const bcrypt = require('bcryptjs');

// 6. IDEMPOTENT SEED: ensures the customer/admin roles and the password_resets
//    table exist, and creates an admin account ONLY if none exists yet.
//    SECURITY: never deletes or overwrites an existing admin, and never hardcodes
//    a password — the admin password must come from ADMIN_PASSWORD env var.
const initializeDB = async () => {
    try {
        // Ensure Roles exist
        await pool.execute(
            "INSERT IGNORE INTO roles (id, name, description) VALUES (1, 'customer', 'Default'), (2, 'admin', 'Master Admin')"
        );

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

        // Seed an admin ONLY if one does not already exist. We do NOT touch any
        // existing admin row, so editing admin credentials in production survives
        // redeploys. The password is read from env, with no insecure default.
        const [adminRows] = await pool.execute(
            "SELECT u.id FROM users u JOIN user_roles ur ON u.id = ur.user_id WHERE ur.role_id = 2 LIMIT 1"
        );

        if (adminRows.length === 0) {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@ethiobrew.com';
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword || adminPassword.length < 8) {
                console.warn("⚠️  No admin user found and ADMIN_PASSWORD missing/too short — skipping admin seed.");
                console.warn("    Set ADMIN_EMAIL and ADMIN_PASSWORD (>=8 chars) to create one on next boot.");
            } else {
                const hashedPass = await bcrypt.hash(adminPassword, 12);
                const [result] = await pool.execute(
                    "INSERT INTO users (full_name, email, password, is_verified) VALUES ('Master Admin', ?, ?, TRUE)",
                    [adminEmail, hashedPass]
                );
                await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, 2)', [result.insertId]);
                console.log(`✅  Admin account created for ${adminEmail} (change this password after first login).`);
            }
        } else {
            console.log("✅  Admin account already present — skipping seed.");
        }
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

