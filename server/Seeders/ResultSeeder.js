import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Result from '../models/Result.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const john = await User.findOne({ regNumber: 'RU0/CS/2025/001' });
const jane = await User.findOne({ regNumber: 'RU0/CS/2025/002' });
const csc101 = await Course.findOne({ code: 'CSC101' });

const results = [
  {
    student: john._id,
    course: csc101._id,
    score: 84,
    grade: 'A',
    semester: 'First',
    session: '2024/2025'
  },
  {
    student: jane._id,
    course: csc101._id,
    score: 65,
    grade: 'B',
    semester: 'First',
    session: '2024/2025'
  }
];

await Result.deleteMany();
await Result.insertMany(results);

console.log('✅ Seeded sample results');
process.exit();
