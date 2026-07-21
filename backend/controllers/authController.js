const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/db');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken, ACCESS_SECRET } = require('../utils/tokenUtils');
const sendEmail = require('../utils/sendEmail');

const VERIFY_TOKEN_TTL_SECONDS = 60 * 60 * 24;

const signVerificationToken = (userId, email) => {
  return jwt.sign(
    { id: userId, emailHash: crypto.createHash('sha256').update(email).digest('hex') },
    ACCESS_SECRET,
    { expiresIn: VERIFY_TOKEN_TTL_SECONDS }
  );
};

const register = async (req, res) => {
  const { name, full_name, email, password, phone } = req.body;
  const finalName = name || full_name;

  try {
    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userId = await User.create({ full_name: finalName, email, password: hashedPassword, phone });

    const [roleResult] = await pool.execute("SELECT id FROM roles WHERE name = 'customer'");
    const roleId = roleResult.length > 0 ? roleResult[0].id : 1;
    await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);

    const verifyToken = signVerificationToken(userId, email);
    const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`;
    const message = `
      <h1>Welcome to Ethio-Brew!</h1>
      <p>Please verify your account by clicking the link below:</p>
      <a href="${verifyUrl}" style="background: #006341; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
      <p>This link expires in 24 hours. If you did not create this account, please ignore this email.</p>
    `;

    try {
      await sendEmail({ email, subject: 'Verify your Ethio-Brew Account', message });
    } catch (emailErr) {
      console.error('Email Error:', emailErr.message);
    }

    res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
  } catch (error) {
    console.error('register error:', error);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

const verify = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Verification token is required' });

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: 'Invalid verification token' });

    const expectedHash = crypto.createHash('sha256').update(user.email).digest('hex');
    if (expectedHash !== decoded.emailHash) return res.status(400).json({ message: 'Invalid verification token' });
    if (user.is_verified) return res.json({ message: 'Account already verified' });

    await pool.execute('UPDATE users SET is_verified = TRUE WHERE id = ?', [user.id]);
    res.json({ message: 'Account verified successfully!' });
  } catch (error) {
    return res.status(400).json({ message: 'Invalid or expired verification token' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600000);
      await pool.execute('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)', [email, token, expires]);
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
      const message = `
        <h1>Password Reset Request</h1>
        <p>Click below to set a new password:</p>
        <a href="${resetUrl}" style="background: #4B2C20; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `;
      try {
        await sendEmail({ email, subject: 'Ethio-Brew Password Reset', message });
      } catch (e) {
        console.error('Reset email error:', e.message);
      }
    }
    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    res.status(500).json({ message: 'Could not process request. Please try again.' });
  }
};

const resetPassword = async (req, res) => {
  const { token, email, newPassword } = req.body;
  try {
    const [resets] = await pool.execute(
      'SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()',
      [email, token]
    );
    if (resets.length === 0) return res.status(400).json({ message: 'Invalid or expired token' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await pool.execute('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
    await pool.execute('DELETE FROM password_resets WHERE email = ?', [email]);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('resetPassword error:', error);
    res.status(500).json({ message: 'Reset failed. Please try again.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findWithRoles(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (user.is_blocked) return res.status(403).json({ message: 'Account has been blocked. Contact support.' });
    if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first', email: user.email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const roles = (user.roles_list || '').split(',').filter(Boolean);
    const userData = { id: user.id, name: user.full_name, email: user.email, roles };

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [user.id, refreshToken]
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful', token: accessToken, user: userData });
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

const refreshTokenHandler = async (req, res) => {
  const rawToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!rawToken) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(rawToken, process.env.JWT_REFRESH_SECRET);
    const [rows] = await pool.execute(
      'SELECT * FROM refresh_tokens WHERE token = ? AND user_id = ? AND expires_at > NOW()',
      [rawToken, decoded.id]
    );
    if (rows.length === 0) return res.status(401).json({ message: 'Refresh token expired or revoked' });

    await pool.execute('DELETE FROM refresh_tokens WHERE token = ?', [rawToken]);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const [roles] = await pool.execute(
      'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?',
      [user.id]
    );
    const userData = { id: user.id, email: user.email, roles: roles.map(r => r.name) };
    const newAccessToken = generateAccessToken(userData);
    const newRefreshToken = generateRefreshToken(userData);

    await pool.execute(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
      [user.id, newRefreshToken]
    );

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: newAccessToken });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const [roles] = await pool.execute(
      'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?',
      [req.user.id]
    );

    res.json({
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        roles: roles.map(r => r.name),
        is_verified: user.is_verified,
        points: user.points,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ message: 'Could not load profile' });
  }
};

const logout = async (req, res) => {
  const rawToken = req.cookies.refreshToken || req.body.refreshToken;
  if (rawToken) {
    try {
      await pool.execute('DELETE FROM refresh_tokens WHERE token = ?', [rawToken]);
    } catch (e) {
      /* ignore */
    }
  }
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
};

const updateProfile = async (req, res) => {
  try {
    const { full_name, phone } = req.body;
    await User.updateProfile(req.user.id, { full_name, phone: phone || null });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: 'Could not update profile' });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const [rows] = await pool.execute('SELECT id, password FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updatePassword(req.user.id, hashedPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('changePassword error:', error);
    res.status(500).json({ message: 'Could not update password' });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  verify,
  forgotPassword,
  resetPassword,
  refreshToken: refreshTokenHandler,
};
