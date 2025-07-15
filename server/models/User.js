import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
 semester: {
      type: String,
      required: true,
      enum: ["1st Semester", "2nd Semester"],
      default: "1st Semester",
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },

    matricNumber: {
      type: String,
      unique: true,
      sparse: true,
      required: function () {
        return this.role === 'student';
      }
    },

    faculty: String,
    department: String,
    level: {
  type: String,
  required: true
},
    course: {
  type: String,
  required: true,
  trim: true
},
session: {
  type: String,
  required: true,
  enum: ["2022/2023", "2023/2024", "2024/2025", 
        "2025/2026","2026/2027","2027/2028","2028/2029",
        "2029/2030","2030/2031"], // Add more sessions as needed
  trim: true
},
 // e.g. "2023/2024"
 
    phone: String,
    gender: String,
    dob: String,
    address: String,

    profilePhoto: String, // store URL or filename

    jambRegistrationNumber: String,
    jambScore: Number,

    oLevelResults: [
      {
        subject: String,
        grade: String, // e.g. A, B, C
        year: Number,
      }
    ],
    oLevelCertificate: String,   // URL or filename
    birthCertificate: String,    // URL or filename

    stateOfOrigin: String,
    localGovernmentArea: String,

   courses: [
  {
    code: String,
    title: String,
    unit: Number,
  }
],
    cgpa: {
      type: Number,
      default: 0.0,
    },



    // 🔐 Password Reset
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
