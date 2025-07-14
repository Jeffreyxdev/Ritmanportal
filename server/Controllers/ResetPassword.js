import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import sendEmail from '../utils/SendEmail.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(20).toString('hex');
  const expiry = Date.now() + 15 * 60 * 1000;

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;//replce with bacend link when deploying

  const html = `
    <h3>Password Reset Request</h3>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  await sendEmail(user.email, 'Ritman Portal - Password Reset', html);

  res.json({ message: 'Password reset email sent!' });
};



export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
