// 📁 server/routes/authRoutes.js
import express from 'express';
import { login, registerAdmin } from '../Controllers/authController.js';
import { registerStudent } from '../Controllers/authController.js';
import { submitApplication } from '../Controllers/ApplicationController.js';
import { requestPasswordReset, resetPassword } from '../Controllers/ResetPassword.js';
const router = express.Router();
import { protect, adminOnly } from '../middleware/authMiddleware.js';
router.post('/login', login);
router.post('/register', registerStudent); // Optional, if you allow self-registration
router.post('/register-admin', protect, adminOnly, registerAdmin);
router.post('/register-student', registerStudent);
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.post('/apply', submitApplication);
export default router;
