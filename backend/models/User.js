const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  create: async (userData) => {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'customer']
    );
    return result.insertId;
  }
};

module.exports = User;
