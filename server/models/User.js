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

    // 🎓 Student-only fields (can be left empty for admins)
    matricNumber: {
      type: String,
      unique: true,
      sparse: true, // allow null for admin
    },
    faculty: String,
    department: String,
    level: String, // e.g. "100", "200", "Final Year"
    phone: String,
    profilePhoto: String, // store URL or filename

    // Optional: references to Course documents
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      }
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
