const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 18785;

const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error(`CRITICAL: Missing environment variables: ${missingVars.join(', ')}`);
  if (NODE_ENV === 'production') {
    process.exit(1);
  }
}

const dbConfig = {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: NODE_ENV === 'production' ? 20 : 10,
  queueLimit: 0,
  ssl: NODE_ENV === 'production'
    ? { rejectUnauthorized: true }
    : { rejectUnauthorized: false },
};

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`MySQL connected to ${DB_HOST}:${DB_PORT}`);
    connection.release();
  } catch (err) {
    console.error(`DATABASE CONNECTION FAILED: ${err.message}`);
    if (NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

module.exports = pool;
