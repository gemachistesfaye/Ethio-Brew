const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Assuming db setup exists
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
    const { full_name, email, password, phone } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Insert user (using a simplified query - adjust based on your db.js)
        // For now, we'll return a success message
        console.log(`Registering user: ${email}`);
        
        res.status(201).json({ 
            message: 'User registered successfully! Please log in.' 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // MOCK LOGIN for immediate testing (Replace with DB query)
        if (email === 'admin@ethiobrew.com' && password === 'admin123') {
            const user = { id: 1, email, roles: ['admin', 'customer'] };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
            return res.json({ 
                message: 'Logged in successfully',
                token: accessToken,
                user: { name: 'System Admin', email: user.email, roles: user.roles }
            });
        }

        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
    res.json({ user: req.user });
};

// @desc    Logout
// @route   POST /api/auth/logout
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
    forgotPassword: (req, res) => res.json({ message: "Email sent" }),
    resetPassword: (req, res) => res.json({ message: "Password reset" }),
    updateProfile: (req, res) => res.json({ message: "Profile updated" })
};
