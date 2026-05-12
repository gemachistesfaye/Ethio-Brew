const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

/**
 * DATABASE CONFIGURATION EXPLAINED:
 * 
 * 1. LOCAL DEVELOPMENT (XAMPP):
 *    - Host: localhost
 *    - Port: 3306
 *    - SSL: Not required
 * 
 * 2. PRODUCTION DEPLOYMENT (Render + Aiven):
 *    - Host: provided by Aiven (e.g., mysql-instance-name.aivencloud.com)
 *    - Port: provided by Aiven (usually not 3306)
 *    - SSL: REQUIRED by Aiven. 
 *    - Why localhost fails on Render: Render runs in a containerized environment. 
 *      'localhost' inside the container refers to the container itself, not your local machine 
 *      or the Aiven cloud database.
 */

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ethiobrew',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Aiven requires SSL. rejectUnauthorized: false is common for cloud providers
  // if you don't want to manage specific CA certificates.
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' ? {
    rejectUnauthorized: false
  } : null
};

const pool = mysql.createPool(dbConfig);

// Test connection and log status
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('------------------------------------------');
    console.log(`✅  DATABASE CONNECTED SUCCESSFULLY`);
    console.log(`📍  Host: ${dbConfig.host}`);
    console.log(`🔌  Port: ${dbConfig.port}`);
    console.log(`🌍  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('------------------------------------------');
    connection.release();
  } catch (err) {
    console.error('------------------------------------------');
    console.error('❌  DATABASE CONNECTION FAILED!');
    console.error(`⚠️  Error: ${err.message}`);
    console.error('💡  Check your .env variables and MySQL service status.');
    console.error('------------------------------------------');
    // We don't exit the process here to prevent the backend from crashing completely,
    // allowing other parts of the app (like AI endpoints) to potentially function
    // or allowing the developer to see the error in the logs.
  }
})();

module.exports = pool;

