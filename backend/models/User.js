const pool = require('../config/db');
const crypto = require('crypto');

const User = {
  create: async ({ full_name, email, password, phone }) => {
    const id = crypto.randomUUID();
    await pool.execute(
      'INSERT INTO users (id, full_name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
      [id, full_name, email, password, phone || null]
    );
    return id;
  },

  findByEmail: async (email) => {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT id, full_name, email, phone, profile_pic, preferred_language, points, is_verified, is_blocked, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  findWithRoles: async (email) => {
    const [rows] = await pool.execute(
      `SELECT u.*, string_agg(r.name, ',') as roles_list
       FROM users u
       JOIN user_roles ur ON u.id = ur.user_id
       JOIN roles r ON ur.role_id = r.id
       WHERE u.email = ?
       GROUP BY u.id`,
      [email]
    );
    return rows[0] || null;
  },

  updateProfile: async (id, { full_name, phone }) => {
    const [result] = await pool.execute(
      'UPDATE users SET full_name = ?, phone = ? WHERE id = ?',
      [full_name, phone, id]
    );
    return result.affectedRows;
  },

  updatePassword: async (id, hashedPassword) => {
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows;
  },

  findAll: async ({ page = 1, limit = 20 } = {}) => {
    const offset = (page - 1) * limit;
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.is_verified, u.is_blocked,
              u.preferred_language, u.points, u.created_at,
              string_agg(r.name, ',') as roles
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       GROUP BY u.id
       ORDER BY u.created_at DESC
       LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );
    const [[{ total }]] = await pool.execute('SELECT COUNT(*) as total FROM users');
    return { users: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  count: async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  },

  updateRole: async (userId, roleId) => {
    await pool.execute('DELETE FROM user_roles WHERE user_id = ?', [userId]);
    await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);
  },

  block: async (id) => {
    const [result] = await pool.execute('UPDATE users SET is_blocked = TRUE WHERE id = ?', [id]);
    return result.affectedRows;
  },

  unblock: async (id) => {
    const [result] = await pool.execute('UPDATE users SET is_blocked = FALSE WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = User;
