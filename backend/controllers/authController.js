const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/db');
const { generateAccessToken, generateRefreshToken, ACCESS_SECRET } = require('../utils/tokenUtils');
const sendEmail = require('../utils/sendEmail');

// Duration a verification token remains valid.
const VERIFY_TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours

/**
 * Sign a short-lived email-verification token for a user.
 * The token encodes the userId + email hash so it is bound to the account
 * and cannot be replayed against a different user.
 */
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

        // Assign Role
        let [roleResult] = await pool.execute("SELECT id FROM roles WHERE name = 'customer'");
        const roleId = roleResult.length > 0 ? roleResult[0].id : 1;
        await pool.execute('INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)', [userId, roleId]);

        // Send Verification Email with a SIGNED token (not a raw userId).
        const verifyToken = signVerificationToken(userId, email);
        const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`;
        const message = `
            <h1>Welcome to Ethio-Brew!</h1>
            <p>Please verify your account by clicking the link below:</p>
            <a href="${verifyUrl}" style="background: #006341; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a>
            <p>This link expires in 24 hours. If you did not create this account, please ignore this email.</p>
        `;

        try {
            await sendEmail({
                email,
                subject: 'Verify your Ethio-Brew Account',
                message
            });
        } catch (emailErr) {
            console.error("Email Error:", emailErr);
        }

        res.status(201).json({
            message: 'Registration successful! Please check your email to verify your account.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed. Please try again.' });
    }
};

// @desc    Verify User — now requires a valid signed token.
const verify = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Verification token is required' });
    }

    try {
        // Verify signature + expiry. Throws on tampering/expiry.
        const decoded = jwt.verify(token, ACCESS_SECRET);

        const [users] = await pool.execute(
            'SELECT id, email, is_verified FROM users WHERE id = ?',
            [decoded.id]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        const user = users[0];

        // Bind token to the account: email hash must match.
        const expectedHash = crypto.createHash('sha256').update(user.email).digest('hex');
        if (expectedHash !== decoded.emailHash) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        if (user.is_verified) {
            return res.json({ message: 'Account already verified' });
        }

        await pool.execute('UPDATE users SET is_verified = TRUE WHERE id = ?', [user.id]);
        res.json({ message: 'Account verified successfully!' });
    } catch (error) {
        // jwt.verify failure (expired/invalid) lands here.
        return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
};

// @desc    Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const [users] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);

        // SECURITY: return the same generic success message whether or not the
        // email exists, to avoid user-enumeration. Only send mail if it does.
        if (users.length > 0) {
            const token = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 3600000); // 1 hour

            await pool.execute(
                'INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)',
                [email, token, expires]
            );

            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
            const message = `
                <h1>Password Reset Request</h1>
                <p>You requested a password reset. Click the link below to set a new password:</p>
                <a href="${resetUrl}" style="background: #4B2C20; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                <p>This link will expire in 1 hour. If you did not request this, you can safely ignore this email.</p>
            `;

            try {
                await sendEmail({
                    email,
                    subject: 'Ethio-Brew Password Reset',
                    message
                });
            } catch (emailErr) {
                console.error("Reset email error:", emailErr);
            }
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
        const [resets] = await pool.execute(
            'SELECT * FROM password_resets WHERE email = ? AND token = ? AND expires_at > NOW()',
            [email, token]
        );

        if (resets.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await pool.execute('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);
        // Invalidate ALL reset tokens for this email once one is used.
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

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = users[0];

        if (!user.is_verified) {
            return res.status(403).json({ message: 'Please verify your email first', userId: user.id });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const roles = user.roles_list.split(',');
        const userData = { id: user.id, name: user.full_name, email: user.email, roles: roles };

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
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: 'Login successful', token: accessToken, user: userData });

    } catch (error) {
        res.status(500).json({ message: "Login failed. Server error." });
    }
};

const getProfile = async (req, res) => res.json({ user: req.user });

const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out successfully' });
};

const updateProfile = async (req, res) => {
    // Basic implementation
    res.json({ message: "Profile updated" });
};

module.exports = {
    register,
    login,
    logout,
    getProfile,
    verify,
    forgotPassword,
    resetPassword,
    updateProfile
};

