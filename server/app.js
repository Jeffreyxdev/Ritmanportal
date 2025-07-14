import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/CourseRoutes.js';

import resultRoutes from './routes/resultRoutes.js';

import applicationRoutes from './routes/ApplicationRoutes.js';


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Ritman Portal API');
});
app.use('/api/results', resultRoutes);
app.use('/api/applications', applicationRoutes);

export default app;
