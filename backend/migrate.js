const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    try {
        console.log("------------------------------------------");
        console.log("🛠️ RUNNING DATABASE MIGRATION...");
        console.log("Connecting to Aiven MySQL database...");
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || 21992),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: { rejectUnauthorized: false },
            multipleStatements: true // REQUIRED to run the full schema file at once
        });
        
        console.log("✅ Connected! Reading schema file...");
        const schemaPath = path.join(__dirname, '..', 'db', 'production_schema.sql');
        const sql = fs.readFileSync(schemaPath, 'utf8');
        
        console.log("Executing schema...");
        await connection.query(sql);
        console.log("✅ BOOM! All database tables created successfully!");
        console.log("------------------------------------------");
        
        await connection.end();
    } catch (error) {
        console.error("------------------------------------------");
        console.error("❌ MIGRATION FAILED!");
        console.error("Error:", error.message);
        console.error("Did you paste your password into backend/.env?");
        console.error("------------------------------------------");
    }
}

runMigration();
