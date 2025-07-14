import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    gender: String,
    dob: String,
    address: String,
    program: String, // e.g. "Computer Science"
    faculty: String,
    jambScore: Number,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;
