const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

/**
 * PRODUCTION-READY DATABASE CONFIGURATION
 * Optimized for: Render (Backend) + Aiven (MySQL)
 */

// Debug Logs for Startup (Requirement #9)
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 18785; // Default to Aiven port, no 3306 fallback

console.log('--- DB CONNECTION DEBUG ---');
console.log(`📡 Host: ${DB_HOST || 'NOT DEFINED'}`);
console.log(`🔌 Port: ${DB_PORT}`);
console.log(`🏗️  Mode: ${NODE_ENV.toUpperCase()}`);
console.log('---------------------------');

const dbConfig = {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Aiven REQUIRED SSL
  ssl: {
    rejectUnauthorized: false
  }
};

// Check for missing required variables
const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0 && NODE_ENV === 'production') {
  console.error(`❌ CRITICAL ERROR: Missing environment variables: ${missingVars.join(', ')}`);
}

const pool = mysql.createPool(dbConfig);

// Test connection and log status
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('------------------------------------------');
    console.log(`✅ MySQL connected successfully`);
    console.log(`📍 Connected to: ${DB_HOST}`);
    console.log('------------------------------------------');
    connection.release();
  } catch (err) {
    console.error('------------------------------------------');
    console.error('❌ DATABASE CONNECTION FAILED!');
    console.error(`⚠️  Error: ${err.message}`);
    console.error('💡 Troubleshooting:');
    console.log('   1. Check if DB_HOST and DB_PORT are correct in Render/Env');
    console.log('   2. Ensure Aiven MySQL is running and allows connections');
    console.log('   3. Verify SSL configuration is accepted');
    console.error('------------------------------------------');
    // Backend will not crash, allowing for logs to be inspected
  }
})();

module.exports = pool;


