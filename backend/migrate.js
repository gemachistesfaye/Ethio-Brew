const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

async function runMigration() {
  let client;
  try {
    console.log('Connecting to database...');
    client = new Client({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    console.log('Connected! Reading schema file...');

    const schemaPath = path.join(__dirname, '..', 'db', 'production_schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    await client.query(sql);
    console.log('Migration complete! All tables created/verified.');
  } catch (error) {
    console.error('MIGRATION FAILED:', error.message);
    process.exit(1);
  } finally {
    if (client) await client.end();
  }
}

runMigration();
