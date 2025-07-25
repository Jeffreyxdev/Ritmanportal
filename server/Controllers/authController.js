// ==========================
// 📦 Imports
// ==========================
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Application from '../models/Application.js';
import generateToken from '../utils/generateToken.js';

// ==========================
// 🧠 Matric Number Generator
// ==========================
const getNextMatricNumber = async (department) => {
  const deptCodes = {
    'Computer Science': { faculty: '02', dept: '04' },
    'Cyber Secuirty': {faculty: '02', dept: '09'},
    'Software Engineering': { faculty: '02', dept: '10' },
    'Information Technology': { faculty: '02', dept: '11' },
    'Mass Communication': { faculty: '03', dept: '01' },
    'Business Admin': { faculty: '01', dept: '07' },
    'Accounting': { faculty: '01', dept: '08' }
    // ➕ Add more department mappings here
  };

  const code = deptCodes[department];
  if (!code) throw new Error(`Unknown department code for ${department}`);

  const count = await User.countDocuments({ department, role: 'student' });
  const paddedSerial = String(count + 1).padStart(3, '0'); // e.g. "001"
  const year = new Date().getFullYear().toString().slice(-2); // e.g. "24"

  return `RU${code.faculty}${code.dept}${year}${paddedSerial}`;
};

// ==========================
// ✅ Approve Application -> Register Student
// ==========================
export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application)
      return res.status(404).json({ message: 'Application not found' });

    if (application.status === 'approved')
      return res.status(400).json({ message: 'Application already approved' });

    const userExists = await User.findOne({ email: application.email });
    if (userExists)
      return res.status(400).json({ message: 'User with this email already exists' });

    const generatedMatric = await getNextMatricNumber(application.department);
    const hashedPassword = await bcrypt.hash('student123', 10); // default password

    const student = await User.create({
      fullName: application.fullName,
      email: application.email,
      phone: application.phone,
      gender: application.gender,
      dob: application.dob,
      address: application.address,
      course: application.course,
      faculty: application.faculty,
      department: application.department,
      level: application.level,
      profilePhoto: '',
      matricNumber: generatedMatric,
      jambRegistrationNumber: application.jambRegistrationNumber,
      oLevelResults: application.oLevelResults,
      oLevelCertificate: application.oLevelCertificate,
      birthCertificate: application.birthCertificate,
      stateOfOrigin: application.stateOfOrigin,
      localGovernmentArea: application.localGovernmentArea,
      jambScore: application.jambScore,
      password: hashedPassword,
      role: 'student'
    });

    application.status = 'approved';
    await application.save();

    res.status(201).json({
      message: 'Application approved, student registered',
      student: {
        _id: student._id,
        fullName: student.fullName,
        email: student.email,
        matricNumber: student.matricNumber,
        role: student.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// 🧑‍🎓 Manual Student Registration
// ==========================
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
    if (userExists)
      return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const generatedMatric = await getNextMatricNumber(department);

    const student = await User.create({
      fullName, email, phone, gender, dob, address,
      course, faculty, department, level,
      profilePhoto,
      matricNumber: generatedMatric,
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

// ==========================
// 🔐 Login (Shared - Admin & Student)
// ==========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({
  user: {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    matricNumber: user.matricNumber
  },
  token: generateToken(user._id)
});
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("User found?", user);
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("User update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ==========================
// 🧑‍💼 Register Admin
// ==========================
export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const adminExists = await User.findOne({ email });
    if (adminExists)
      return res.status(400).json({ message: 'Admin already exists' });

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
