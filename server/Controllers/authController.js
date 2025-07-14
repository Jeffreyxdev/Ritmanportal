import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// 🔁 Utility to auto-generate matric number
const getNextMatricNumber = async (department, year) => {
  const count = await User.countDocuments({ department, role: 'student' });
  const padded = String(count + 1).padStart(3, '0'); // e.g. "001"
  const deptCode = department === 'Computer Science' ? 'CS' : 'GEN';
  return `RU0/${deptCode}/${year}/${padded}`;
};

// 🧑‍🎓 Register Student
export const registerStudent = async (req, res) => {
  try {
    const {
      fullName, email, phone, gender, dob, address,
      course, faculty, department, level,
      profilePhoto, jambRegistrationNumber,
      oLevelResults, oLevelCertificate, birthCertificate,
      stateOfOrigin, localGovernmentArea, jambScore,
      password
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const currentYear = new Date().getFullYear();
    const generatedMatric = await getNextMatricNumber(department, currentYear);

    const student = await User.create({
      fullName, email, phone, gender, dob, address,
      course, faculty, department, level,
      profilePhoto,
      matricNumber: generatedMatric, // ✅ auto-filled
      jambRegistrationNumber,
      oLevelResults, oLevelCertificate, birthCertificate,
      stateOfOrigin, localGovernmentArea, jambScore,
      password: hashedPassword,
      role: 'student'
    });

    res.status(201).json({
      _id: student._id,
      fullName: student.fullName,  
      email: student.email,
      matricNumber: student.matricNumber,
      role: student.role,
      token: generateToken(student._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔐 Login (Student or Admin)
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};
export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const adminExists = await User.findOne({ email });
    if (adminExists) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    res.status(201).json({
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
