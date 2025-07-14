import express from 'express';
import {
  createResult,
  getAllResults,
  getStudentResults,
  updateResult,
deleteResult
} from '../Controllers/resultController.js';

import { protect, adminOnly, studentOnly } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', protect, adminOnly, createResult);
router.get('/', protect, adminOnly, getAllResults);
router.get('/me', protect, studentOnly, getStudentResults);
router.put('/:id', protect, adminOnly, updateResult);
router.delete('/:id', protect, adminOnly, deleteResult);

export default router;
