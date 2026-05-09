const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // Short lived access token
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET || 'refresh_secret_ethio',
        { expiresIn: '7d' } // Long lived refresh token
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
