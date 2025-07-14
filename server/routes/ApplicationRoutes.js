import express from 'express';
import {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication
} from '../Controllers/ApplicationController.js';
import { approveApplication } from '../Controllers/authController.js'; 
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', submitApplication); // open to public
router.get('/', getAllApplications);
router.get('/:id', protect, adminOnly, getApplicationById);
router.put('/:id', protect, adminOnly, updateApplicationStatus);
router.put('/:id/approve', protect, adminOnly, approveApplication);

export default router;
