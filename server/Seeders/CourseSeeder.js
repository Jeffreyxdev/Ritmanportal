import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const courses = [
  {
    title: 'Introduction to Computer Science',
    code: 'CSC101',
    level: '100',
    department: 'Computer Science',
    semester: '1st'
  },
  {
    title: 'Mathematics for Computer Science',
    code: 'MTH101',
    level: '100',
    department: 'Computer Science',
    semester: '1st'
  },
  {
    title: 'Fundamentals of Software Engineering',
    code: 'SWE101',
    level: '100',
    department: 'Software Engineering',
    semester: '1st'
  },
  {
    title: 'Introduction to Information Technology',
    code: 'ITE101',
    level: '100',
    department: 'Information Technology',
    semester: '1st'
  }
  // Add more as needed
];

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('✅ Courses seeded successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedCourses();
