const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');

dotenv.config();

require('./utils/tokenUtils');

const pool = require('./config/db');

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    const isAllowed = allowedOrigins.some(
      allowed => allowed.replace(/\/$/, '') === normalizedOrigin
    );
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: 'error', message: 'Too many requests, please try again later.' },
});
app.use('/api', limiter);

const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 8,
  message: { status: 'error', message: 'Too many AI requests, slow down.' },
});

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const aiController = require('./controllers/aiController');
const { protect, authorize } = require('./middleware/authMiddleware');

app.get(['/', '/api', '/health'], (req, res) => {
  res.json({
    message: 'Welcome to Ethio-Brew Enterprise API',
    status: 'Healthy',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/subscriptions', protect, subscriptionRoutes);
app.use('/api/notifications', protect, notificationRoutes);
app.use('/api/admin', protect, authorize('admin'), adminRoutes);
app.post('/api/ai', aiLimiter, aiController.chat);

app.use((err, req, res, next) => {
  console.error('ERROR:', err.message || err);
  if (process.env.NODE_ENV !== 'production') {
    console.error('STACK:', err.stack);
  }
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  if (status >= 500) {
    const msg = process.env.NODE_ENV !== 'production' ? err.message : 'Internal server error';
    return res.status(status).json({ status: 'error', message: msg });
  }
  return res.status(status).json({ status: 'error', message: err.message || 'Request error' });
});

const PORT = process.env.PORT || 5000;

const runMigration = async () => {
  try {
    const schemaPath = path.join(__dirname, '..', 'db', 'production_schema.sql');
    if (fs.existsSync(schemaPath)) {
      let sql = fs.readFileSync(schemaPath, 'utf8');
      sql = sql.replace(/DROP TABLE[\s\S]*?;/gi, '');
      await pool.query(sql);
      console.log('Migration complete: tables created/verified.');
    } else {
      console.log('No schema file found, skipping migration.');
    }
  } catch (err) {
    console.error('Migration warning:', err.message);
  }
};

const start = async () => {
  await runMigration();
  try {
    const client = await pool.query('SELECT 1');
    console.log(`PostgreSQL connected to ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  } catch (err) {
    console.error(`DATABASE CONNECTION FAILED: ${err.message}`);
  }
  app.listen(PORT, () => {
    console.log(`Ethio-Brew API running on port ${PORT} (${(process.env.NODE_ENV || 'development').toUpperCase()})`);
  });
};

start();
