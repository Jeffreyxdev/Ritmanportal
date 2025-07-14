import express from 'express';
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus
} from '../Controllers/ApplicationController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitApplication); // Public
router.get('/', protect, getAllApplications); // Admin
router.put('/:id', protect, updateApplicationStatus); // Admin

export default router;
