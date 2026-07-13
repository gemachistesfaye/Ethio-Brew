const pool = require('../config/db');

/**
 * User model — aligned with production_schema.sql.
 *
 * Columns: id, full_name, email, password, phone, profile_pic,
 *          is_verified, is_blocked, preferred_language, points,
 *          created_at, updated_at
 */
const User = {
  create: async ({ full_name, email, password, phone }) => {
    const [result] = await pool.execute(
      'INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)',
      [full_name, email, password, phone || null]
    );
    return result.insertId;
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
      `SELECT u.*, GROUP_CONCAT(r.name) as roles_list
       FROM users u
       JOIN user_roles ur ON u.id = ur.user_id
       JOIN roles r ON ur.role_id = r.id
       WHERE u.email = ?
       GROUP BY u.id`,
      [email]
    );
    return rows[0] || null;
  },

  verifyUser: async (id) => {
    await pool.execute('UPDATE users SET is_verified = TRUE WHERE id = ?', [id]);
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

  findAll: async () => {
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.is_verified, u.is_blocked,
              u.preferred_language, u.points, u.created_at,
              GROUP_CONCAT(r.name) as roles
       FROM users u
       LEFT JOIN user_roles ur ON u.id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.id
       GROUP BY u.id
       ORDER BY u.created_at DESC`
    );
    return rows;
  },

  count: async () => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM users');
    return rows[0].total;
  },

  updateRole: async (userId, roleId) => {
    // Replace all roles for a user with the given role.
    await pool.execute('DELETE FROM user_roles WHERE user_id = ?', [userId]);
    await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);
  }
};

module.exports = User;
