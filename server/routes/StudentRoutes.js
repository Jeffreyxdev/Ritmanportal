// routes/studentRoutes.ts
import express from 'express';
import {getStudentProfile } from '../Controllers/StudentController.js';


const router = express.Router();

router.get("/:id", getStudentProfile);


export default router;
