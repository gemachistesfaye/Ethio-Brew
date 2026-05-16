const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Use the real DB pool
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
    const { name, full_name, email, password, phone } = req.body;
    const finalName = name || full_name;
    
    try {
        // 1. Check if user exists
        const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // 2. Hash Password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // 3. Create User
        const [result] = await pool.execute(
            'INSERT INTO users (full_name, email, password, phone) VALUES (?, ?, ?, ?)',
            [finalName, email, hashedPassword, phone || null]
        );

        // 4. Assign Default Role (customer) - Self-healing logic
        let [roleResult] = await pool.execute("SELECT id FROM roles WHERE name = 'customer'");
        let roleId;
        
        if (roleResult.length === 0) {
            const [newRole] = await pool.execute("INSERT INTO roles (name, description) VALUES ('customer', 'Default customer role')");
            roleId = newRole.insertId;
        } else {
            roleId = roleResult[0].id;
        }

        await pool.execute(
            'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [result.insertId, roleId]
        );
        
        res.status(201).json({ 
            message: 'Account created successfully! Please sign in.' 
        });
    } catch (error) {
        console.error("Register Error (DETAIL):", error);
        res.status(500).json({ message: `Registration failed: ${error.message}` });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. Get user and their roles
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

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 3. Prepare User Data
        const roles = user.roles_list.split(',');
        const userData = {
            id: user.id,
            name: user.full_name,
            email: user.email,
            roles: roles
        };

        // 4. Generate Tokens
        const accessToken = generateAccessToken(userData);
        const refreshToken = generateRefreshToken(userData);

        // 5. Store Refresh Token in DB
        await pool.execute(
            'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))',
            [user.id, refreshToken]
        );

        // 6. Set Cookie
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 
        });

        res.json({ 
            message: 'Login successful',
            token: accessToken,
            user: userData
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login failed. Server error." });
    }
};

// @desc    Get user profile
const getProfile = async (req, res) => {
    res.json({ user: req.user });
};

// @desc    Logout
const logout = async (req, res) => {
    res.clearCookie('accessToken');
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    logout,
    getProfile,
    verify: (req, res) => res.json({ message: "Verification system active" }),
    forgotPassword: (req, res) => res.json({ message: "Check your email" }),
    resetPassword: (req, res) => res.json({ message: "Password updated" }),
    updateProfile: (req, res) => res.json({ message: "Profile updated" })
};
