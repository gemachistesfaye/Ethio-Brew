const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/db');
const { generateAccessToken, generateRefreshToken, ACCESS_SECRET } = require('../utils/tokenUtils');
const sendEmail = require('../utils/sendEmail');

const VERIFY_TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours

const signVerificationToken = (userId, email) => {
    return jwt.sign(
        { id: userId, emailHash: crypto.createHash('sha256').update(email).digest('hex') },
        ACCESS_SECRET,
        { expiresIn: VERIFY_TOKEN_TTL_SECONDS }
    );
};

// @desc    Register new user
const register = async (req, res) => {
    const { name, full_name, email, password, phone } = req.body;
    const finalName = name || full_name;

    try {
        const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, password, phone, is_verified) VALUES (?, ?, ?, ?, FALSE)',
            [finalName, email, hashedPassword, phone || null]
        );
        const userId = result.insertId;

        let [roleResult] = await pool.execute("SELECT id FROM roles WHERE name = 'customer'");
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

        try { await sendEmail({ email, subject: 'Verify your Ethio-Brew Account', message }); } catch (emailErr) {
            console.error("Email Error:", emailErr);
        }

        res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

// @desc    Verify User (signed token required)
const verify = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Verification token is required' });

    try {
        const decoded = jwt.verify(token, ACCESS_SECRET);
        const [users] = await pool.execute('SELECT id, email, is_verified FROM users WHERE id = ?', [decoded.id]);
        if (users.length === 0) return res.status(400).json({ message: 'Invalid verification token' });

        const user = users[0];
        const expectedHash = crypto.createHash('sha256').update(user.email).digest('hex');
        if (expectedHash !== decoded.emailHash) return res.status(400).json({ message: 'Invalid verification token' });
        if (user.is_verified) return res.json({ message: 'Account already verified' });

        await pool.execute('UPDATE users SET is_verified = TRUE WHERE id = ?', [user.id]);
        res.json({ message: 'Account verified successfully!' });
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
};

// @desc    Forgot Password (anti-enumeration)
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const [users] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
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
            try { await sendEmail({ email, subject: 'Ethio-Brew Password Reset', message }); } catch (e) { console.error('Reset email error:', e); }
        }
        res.json({ message: 'If that email exists, a reset link has been sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Could not process request. Please try again.' });
    }
};

// @desc    Reset Password
const resetPassword = async (req, res) => {
    const { token, email, newPassword } = req.body;
    try {
        const [resets] = await pool.execute('SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()', [email, token]);
        if (resets.length === 0) return res.status(400).json({ message: 'Invalid or expired token' });
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await pool.execute('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        await pool.execute('DELETE FROM password_resets WHERE email = ?', [email]);
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Reset failed. Please try again.' });
    }
};

// @desc    Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.execute(`
            SELECT u.*, GROUP_CONCAT(r.name) as roles_list
            FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            WHERE u.email = ?
            GROUP BY u.id
        `, [email]);

        if (users.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

        const user = users[0];
        if (!user.is_verified) return res.status(403).json({ message: 'Please verify your email first', userId: user.id });
        if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Invalid email or password' });

        const roles = (user.roles_list || '').split(',');
        const userData = { id: user.id, name: user.full_name, email: user.email, roles: roles };

        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        await pool.execute(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
            [user.id, refreshToken]
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 15 * 60 * 1000
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Login successful', token: accessToken, user: userData });
    } catch (error) {
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
};

// @desc    Refresh access token
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

        const [users] = await pool.execute('SELECT id, email FROM users WHERE id = ?', [decoded.id]);
        if (users.length === 0) return res.status(401).json({ message: 'User not found' });

        const [roles] = await pool.execute(
            'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?',
            [users[0].id]
        );
        const userData = { id: users[0].id, email: users[0].email, roles: roles.map(r => r.name) };
        const newAccessToken = generateAccessToken(userData);

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 15 * 60 * 1000
        });
        res.json({ token: newAccessToken });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};

// @desc    Get profile (real data from DB)
const getProfile = async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, full_name, email, phone, profile_pic, preferred_language, points, is_verified, created_at FROM users WHERE id = ?',
            [req.user.id]
        );
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const [roles] = await pool.execute(
            'SELECT r.name FROM roles r JOIN user_roles ur ON r.id = ur.role_id WHERE ur.user_id = ?', [req.user.id]
        );
        const user = users[0];
        res.json({
            user: {
                id: user.id, name: user.full_name, email: user.email, phone: user.phone,
                roles: roles.map(r => r.name), is_verified: user.is_verified,
                points: user.points, created_at: user.created_at
            }
        });
    } catch (error) {
        console.error('getProfile error:', error);
        res.status(500).json({ message: 'Could not load profile' });
    }
};

// @desc    Logout
const logout = async (req, res) => {
    // Delete the user's refresh tokens to force re-login.
    if (req.user && req.user.id) {
        try { await pool.execute('DELETE FROM refresh_tokens WHERE user_id = ?', [req.user.id]); } catch (e) { /* ignore */ }
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};

// @desc    Update profile (real implementation)
const updateProfile = async (req, res) => {
    try {
        const { full_name, phone } = req.body;
        if (!full_name) return res.status(400).json({ message: 'Name is required' });
        await pool.execute('UPDATE users SET full_name = ?, phone = ? WHERE id = ?', [full_name, phone || null, req.user.id]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('updateProfile error:', error);
        res.status(500).json({ message: 'Could not update profile' });
    }
};

module.exports = {
    register, login, logout, getProfile, updateProfile,
    verify, forgotPassword, resetPassword, refreshToken: refreshTokenHandler
};
