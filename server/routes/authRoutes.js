// 📁 server/routes/authRoutes.js
import express from 'express';
import { login, register } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); // Optional, if you allow self-registration

export default router;
