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
    level: String, // e.g. "100", "200", "Final Year"
    course: String,

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ],

    // 🔐 Password Reset
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
