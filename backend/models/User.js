const pool = require('../config/db');

const User = {
  create: async (userData) => {
    const { name, email, password, phone, address } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, address]
    );
    return result.insertId;
  },
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  findById: async (id) => {
    const [rows] = await pool.query('SELECT id, name, email, phone, address, role, is_verified FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  verifyUser: async (id) => {
    await pool.query('UPDATE users SET is_verified = TRUE WHERE id = ?', [id]);
  },
  updateProfile: async (id, data) => {
    const { name, phone, address } = data;
    await pool.query(
      'UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?',
      [name, phone, address, id]
    );
  },
  updatePassword: async (id, hashedPassword) => {
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
  }
};

module.exports = User;
