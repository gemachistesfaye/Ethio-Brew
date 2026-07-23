const crypto = require('crypto');
const pool = require('../config/db');

const OTP_EXPIRY_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;
const RESEND_LIMIT = 3;
const RESEND_WINDOW_MINUTES = 10;

const generateOTP = () => {
  const buffer = crypto.randomBytes(3);
  const num = buffer.readUIntBE(0, 3);
  return String(num % Math.pow(10, OTP_LENGTH)).padStart(OTP_LENGTH, '0');
};

const storeOTP = async (email, purpose) => {
  const code = generateOTP();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await pool.execute(
    'INSERT INTO otps (email, code, purpose, expires_at) VALUES (?, ?, ?, ?)',
    [email, code, purpose, expiresAt]
  );

  await pool.execute(
    `DELETE FROM otps WHERE email = ? AND purpose = ? AND id NOT IN (
      SELECT id FROM otps WHERE email = ? AND purpose = ? ORDER BY created_at DESC LIMIT 1
    )`,
    [email, purpose, email, purpose]
  );

  return code;
};

const verifyOTP = async (email, code, purpose) => {
  const [rows] = await pool.execute(
    'SELECT * FROM otps WHERE email = ? AND purpose = ? ORDER BY created_at DESC LIMIT 1',
    [email, purpose]
  );

  if (rows.length === 0) {
    return { valid: false, message: 'No OTP found. Please request a new one.' };
  }

  const otp = rows[0];

  if (new Date() > new Date(otp.expires_at)) {
    await pool.execute('DELETE FROM otps WHERE id = ?', [otp.id]);
    return { valid: false, message: 'OTP has expired. Please request a new one.' };
  }

  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    await pool.execute('DELETE FROM otps WHERE id = ?', [otp.id]);
    return { valid: false, message: 'Too many attempts. Please request a new OTP.' };
  }

  if (otp.code !== code) {
    await pool.execute('UPDATE otps SET attempts = attempts + 1 WHERE id = ?', [otp.id]);
    const remaining = OTP_MAX_ATTEMPTS - otp.attempts - 1;
    return { valid: false, message: `Invalid OTP. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` };
  }

  await pool.execute('DELETE FROM otps WHERE email = ? AND purpose = ?', [email, purpose]);
  return { valid: true };
};

const checkResendCooldown = async (email, purpose) => {
  const [rows] = await pool.execute(
    `SELECT created_at FROM otps 
     WHERE email = ? AND purpose = ? 
     ORDER BY created_at DESC LIMIT 1`,
    [email, purpose]
  );

  if (rows.length > 0) {
    const lastSent = new Date(rows[0].created_at);
    const elapsed = (Date.now() - lastSent.getTime()) / 1000;
    if (elapsed < RESEND_COOLDOWN_SECONDS) {
      return { allowed: false, waitSeconds: Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed) };
    }
  }

  const [recentCount] = await pool.execute(
    `SELECT COUNT(*) as count FROM otps 
     WHERE email = ? AND purpose = ? 
     AND created_at > NOW() - INTERVAL '${RESEND_WINDOW_MINUTES} minutes'`,
    [email, purpose]
  );

  if (Number(recentCount[0].count) >= RESEND_LIMIT) {
    return { allowed: false, waitSeconds: RESEND_WINDOW_MINUTES * 60, message: 'Too many OTP requests. Please try again later.' };
  }

  return { allowed: true };
};

module.exports = {
  generateOTP,
  storeOTP,
  verifyOTP,
  checkResendCooldown,
  OTP_EXPIRY_MINUTES,
  OTP_MAX_ATTEMPTS,
  RESEND_COOLDOWN_SECONDS,
};
