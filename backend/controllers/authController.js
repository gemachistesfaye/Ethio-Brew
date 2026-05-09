const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      
      // Check if user exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
      });

      // Send actual email using nodemailer
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER || '"Ethio-Brew" <noreply@ethiobrew.com>',
          to: email,
          subject: 'Verify your Ethio-Brew Account',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #006341;">Welcome to Ethio-Brew, ${name}!</h2>
              <p>Thank you for joining the Ethio-Brew community. You are one step away from exploring the finest Ethiopian coffee.</p>
              <p>Please return to your browser and click the <strong>Complete Verification</strong> button to finish your registration.</p>
              <br/>
              <p style="color: #888; font-size: 12px;">If you did not request this, please ignore this email.</p>
            </div>
          `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          await transporter.sendMail(mailOptions);
        } else {
          console.log("Email not sent: EMAIL_USER and EMAIL_PASS are not set in .env.");
          console.log("Email content would have been:", mailOptions.html);
        }
      } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        // Continue with registration even if email fails
      }

      res.status(201).json({ message: 'User registered successfully. Verification email sent.', userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verify: async (req, res) => {
    try {
      const { userId } = req.body;
      await User.verifyUser(userId);
      res.json({ message: 'Account verified successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (!user.is_verified) {
        return res.status(403).json({ message: 'Please verify your account first', userId: user.id });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { name, phone, address } = req.body;
      await User.updateProfile(req.user.id, { name, phone, address });
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create a reset token valid for 1 hour
      const resetToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
      const mailOptions = {
        from: process.env.EMAIL_USER || '"Ethio-Brew" <noreply@ethiobrew.com>',
        to: email,
        subject: 'Reset your Ethio-Brew Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #006341;">Password Reset Request</h2>
            <p>We received a request to reset your password for your Ethio-Brew account.</p>
            <p>Click the link below to set a new password. This link is valid for 1 hour.</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #006341; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px; margin-bottom: 20px;">Reset Password</a>
            <br/>
            <p style="color: #888; font-size: 12px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
          </div>
        `
      };

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
      } else {
        console.log("Email not sent: EMAIL_USER and EMAIL_PASS are not set in .env.");
        console.log("Reset Link:", resetLink);
      }

      res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, token, newPassword } = req.body;
      
      // Verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findByEmail(email);
        
        if (!user || user.id !== decoded.id) {
          return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updatePassword(user.id, hashedPassword);
        
        res.json({ message: 'Password successfully reset' });
      } catch (err) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  }
};

module.exports = authController;
