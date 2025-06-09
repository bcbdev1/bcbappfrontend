import { Request, Response } from 'express';
import User from '../models/User.model';
import OTP from '../models/OTP.model';
import { generateToken, verifyToken } from '../utils/jwt.utils';
import { generateOTP } from '../utils/otp.utils';
import { sendVerificationEmail } from '../services/mailer.service';
import { hashPassword, comparePassword } from '../utils/hash.utils';
import bcrypt from 'bcryptjs';
// Input validation helpers
const validateEmail = (email: any): boolean => {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
};

const validatePassword = (password: any): boolean => {
  return typeof password === 'string' && password.length >= 6;
};

const validateOTP = (code: any): boolean => {
  return typeof code === 'string' && /^\d{4,8}$/.test(code.trim());
};

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

// POST /signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      res.status(400).json({ message: 'All fields are required', error: 'MISSING_FIELDS' });
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      res.status(400).json({ message: 'Invalid email format', error: 'INVALID_EMAIL' });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({ 
        message: 'Password must be 6+ characters', 
        error: 'INVALID_PASSWORD' 
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match', error: 'PASSWORD_MISMATCH' });
      return;
    }

    // Check existing user
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      res.status(409).json({ message: 'Email already exists', error: 'EMAIL_EXISTS' });
      return;
    }
  

    // Create user
    const user = await User.create({ 
      fullName, 
      email: normalizedEmail, 
      password: await hashPassword(password)
    });


    // Generate OTP
    const otp = generateOTP();
    await OTP.create({ 
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      userId: user.id,
      type: 'signup'
    });

    await sendVerificationEmail(normalizedEmail, otp);

    res.status(201).json({ 
      message: 'OTP sent for verification',
      userId: user.id,
      // email: normalizedEmail
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: 'SERVER_ERROR' 
    });
  }
};

/// POST /login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      res.status(400).json({ 
        message: 'Email and password required', 
        error: 'MISSING_FIELDS' 
      });
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      res.status(400).json({ 
        message: 'Invalid email format', 
        error: 'INVALID_EMAIL' 
      });
      return;
    }

    // Find user
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      res.status(401).json({ 
        message: 'Invalid credentials', 
        error: 'INVALID_CREDENTIALS' 
      });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    console.log('Comparison result:', isMatch);
    
    if (!isMatch) {
      res.status(401).json({ 
        message: 'Invalid credentials password', 
        error: 'INVALID_CREDENTIALS' 
      });
      return;
    }

    // Generate OTP
    await OTP.destroy({ where: { userId: user.id, type: 'login' } }); // Cleanup old OTPs
    
    const otp = generateOTP();
    await OTP.create({
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      userId: user.id,
      type: 'login'
    });

    await sendVerificationEmail(normalizedEmail, otp);

    res.json({ 
      message: 'OTP sent for verification',
      requiresOTP: true,
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: 'SERVER_ERROR' 
    });
  }
};

// POST /verify-otp
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { id, email, code } = req.body;

  try {
    // Validation
    if (!code || !validateOTP(code)) {
      res.status(400).json({ message: 'Invalid OTP format', error: 'INVALID_OTP' });
      return;
    }

    // Find user by ID (signup) or email (login)
    let user;
    if (id) {
      user = await User.findByPk(id);
    } else if (email) {
      const normalizedEmail = normalizeEmail(email);
      if (!validateEmail(normalizedEmail)) {
        res.status(400).json({ message: 'Invalid email', error: 'INVALID_EMAIL' });
        return;
      }
      user = await User.findOne({ where: { email: normalizedEmail } });
    }

    if (!user) {
      res.status(404).json({ message: 'User not found', error: 'USER_NOT_FOUND' });
      return;
    }

    // Verify OTP
    const otp = await OTP.findOne({ 
      where: { 
        userId: user.id, 
        code: code.trim() 
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otp || otp.expiresAt < new Date()) {
      res.status(401).json({ 
        message: 'Invalid or expired OTP', 
        error: 'OTP_INVALID' 
      });
      return;
    }

    // Mark email as verified (if signup)
    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
    }

    // Cleanup OTP
    await otp.destroy();

    // Generate JWT
    const token = generateToken(user.id);

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: 'SERVER_ERROR' 
    });
  }
};

// POST /forgot-password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    if (!email || !validateEmail(normalizeEmail(email))) {
      res.status(400).json({ message: 'Valid email required', error: 'INVALID_EMAIL' });
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    const user = await User.findOne({ where: { email: normalizedEmail } });

    if (user) {
      // Cleanup old OTPs
      await OTP.destroy({ where: { userId: user.id, type: 'password_reset' } });

      // Generate OTP
      const otp = generateOTP();
      await OTP.create({
        code: otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        userId: user.id,
        type: 'password_reset'
      });

      await sendVerificationEmail(normalizedEmail, otp);
    }

    // Always return success to prevent email enumeration
    res.json({ message: 'If the email exists, a reset OTP was sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: 'SERVER_ERROR' 
    });
  }
};

// POST /reset-password
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, code, newPassword, confirmPassword } = req.body;

  try {
    // Validation
    if (!email || !code || !newPassword || !confirmPassword) {
      res.status(400).json({ message: 'All fields required', error: 'MISSING_FIELDS' });
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    if (!validateEmail(normalizedEmail)) {
      res.status(400).json({ message: 'Invalid email', error: 'INVALID_EMAIL' });
      return;
    }

    if (!validatePassword(newPassword)) {
      res.status(400).json({ 
        message: 'Password must be 6+ characters', 
        error: 'INVALID_PASSWORD' 
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match', error: 'PASSWORD_MISMATCH' });
      return;
    }

    // Find user and OTP
    const user = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      res.status(404).json({ message: 'User not found', error: 'USER_NOT_FOUND' });
      return;
    }

    const otp = await OTP.findOne({
      where: { 
        userId: user.id, 
        code: code.trim(),
        type: 'password_reset'
      },
      order: [['createdAt', 'DESC']]
    });

    if (!otp || otp.expiresAt < new Date()) {
      res.status(401).json({ 
        message: 'Invalid or expired OTP', 
        error: 'OTP_INVALID' 
      });
      return;
    }

    // Update password
    user.password = await hashPassword(newPassword);
    await user.save();

    // Cleanup OTP
    await otp.destroy();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: 'SERVER_ERROR' 
    });
  }
};