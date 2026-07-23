const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 5432;

const dbConfig = {
  host: DB_HOST,
  port: parseInt(DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: NODE_ENV === 'production' ? 20 : 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  ssl: { rejectUnauthorized: false },
};

const pgPool = new Pool(dbConfig);

const executeQuery = async (client, sql, params = []) => {
  let counter = 1;
  const pgSql = sql.replace(/\?/g, () => `$${counter++}`);

  const { rows, rowCount } = await client.query(pgSql, params);

  const isInsert = pgSql.trim().toUpperCase().startsWith('INSERT');
  const combinedRows = rows;
  combinedRows.affectedRows = rowCount;
  combinedRows.insertId = (isInsert && rows.length > 0 && rows[0].id) ? rows[0].id : null;

  return [combinedRows];
};

const poolWrapper = {
  execute: async (sql, params) => executeQuery(pgPool, sql, params),
  query: async (sql, params) => executeQuery(pgPool, sql, params),
  getConnection: async () => {
    const client = await pgPool.connect();
    return {
      beginTransaction: async () => await client.query('BEGIN'),
      commit: async () => { await client.query('COMMIT'); client.release(); },
      rollback: async () => { await client.query('ROLLBACK'); client.release(); },
      execute: async (sql, params) => executeQuery(client, sql, params),
      query: async (sql, params) => executeQuery(client, sql, params),
      release: () => client.release()
    };
  }
};

module.exports = poolWrapper;
