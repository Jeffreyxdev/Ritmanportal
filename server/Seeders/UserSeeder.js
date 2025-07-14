import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const users = [
  {
    fullName: 'Admin User',
    email: 'admin@ritman.edu',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
  },
  {
    fullName: 'John Student',
    email: 'john@ritman.edu.ng',
    regNumber: 'RU0/CS/2025/001',
    password: bcrypt.hashSync('password123', 10),
    department: 'Computer Science',
    role: 'student',
  },
  {
    fullName: 'Jane Student',
    email: 'jane@ritman.edu.ng',
    regNumber: 'RU0/CS/2025/002',
    password: bcrypt.hashSync('password123', 10),
    department: 'Computer Science',
    role: 'student',
  }
];

await User.deleteMany();
await User.insertMany(users);

console.log('✅ Seeded admin and students!');
process.exit();
