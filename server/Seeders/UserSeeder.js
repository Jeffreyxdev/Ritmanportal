import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const students = [
  {
    fullName: 'Jeffrey Agaba',
    email: 'jeffrey100@ritman.edu.ng',
    phone: '08012345678',
    gender: 'Male',
    dob: '2004-04-22',
    address: 'No 1, Student Street, Akwa Ibom',
    course: 'Computer Science',
    faculty: 'Natural Sciences',
    department: 'Computer Science',
    level: '100',
    profilePhoto: '',
    matricNumber: 'RU02042024001',
    jambRegistrationNumber: 'JAMB123456',
    oLevelResults: [
      { subject: 'Mathematics', grade: 'A', year: 2022 },
      { subject: 'English', grade: 'B', year: 2022 },
      { subject: 'Physics', grade: 'C', year: 2022 }
    ],
    oLevelCertificate: '',
    birthCertificate: '',
    stateOfOrigin: 'Akwa Ibom',
    localGovernmentArea: 'Uyo',
    jambScore: 250,
    password: 'student123',
    role: 'student'
  },
  {
    fullName: 'Grace Uduak',
    email: 'grace100@ritman.edu.ng',
    phone: '08123456789',
    gender: 'Female',
    dob: '2005-01-10',
    address: 'Girls Hostel, Uyo',
    course: 'Software Engineering',
    faculty: 'Natural Sciences',
    department: 'Software Engineering',
    level: '100',
    profilePhoto: '',
    matricNumber: 'RU02102424001',
    jambRegistrationNumber: 'JAMB987654',
    oLevelResults: [
      { subject: 'Mathematics', grade: 'B', year: 2022 },
      { subject: 'English', grade: 'A', year: 2022 },
      { subject: 'Chemistry', grade: 'C', year: 2022 }
    ],
    oLevelCertificate: '',
    birthCertificate: '',
    stateOfOrigin: 'Cross River',
    localGovernmentArea: 'Calabar',
    jambScore: 230,
    password: 'student123',
    role: 'student'
  }
];

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({ role: 'student' });

    const hashedStudents = await Promise.all(
      students.map(async (student) => {
        const hashedPassword = await bcrypt.hash(student.password, 10);
        return { ...student, password: hashedPassword };
      })
    );

    await User.insertMany(hashedStudents);

    console.log('✅ Students seeded');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding students:', err);
    process.exit(1);
  }
};

seedStudents();
