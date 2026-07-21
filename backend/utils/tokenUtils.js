const jwt = require('jsonwebtoken');

/**
 * Token utilities.
 *
 * SECURITY: Access and refresh secrets are REQUIRED. We deliberately do NOT
 * fall back to a default string — a missing secret must crash the server at
 * boot rather than silently signing tokens with a guessable value.
 *
 * Secrets should be long (>=32 chars), random, and different from each other.
 * Generate with:  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
 */
const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || ACCESS_SECRET.length < 32) {
    throw new Error('FATAL: JWT_SECRET is missing or too short. Set a strong random value (>=32 chars) in your environment.');
}
if (!REFRESH_SECRET || REFRESH_SECRET.length < 32) {
    throw new Error('FATAL: JWT_REFRESH_SECRET is missing or too short. Set a strong random value (>=32 chars) in your environment.');
}
if (ACCESS_SECRET === REFRESH_SECRET) {
    throw new Error('FATAL: JWT_SECRET and JWT_REFRESH_SECRET must be different values.');
}

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, roles: user.roles },
        ACCESS_SECRET,
        { expiresIn: '15m' } // Short-lived access token
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, purpose: 'refresh' },
        REFRESH_SECRET,
        { expiresIn: '7d' } // Long-lived refresh token
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    ACCESS_SECRET,
    REFRESH_SECRET
};
