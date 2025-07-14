import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true },
  phone: String,
  gender: String,
  dob: String,
  address: String,
  course: String,
  faculty: String,
  department: String,
  level: String,
  jambRegistrationNumber: String,
  jambScore: Number,
  oLevelResults: [
    {
      subject: String,
      grade: String,
      year: Number
    }
  ],
  oLevelCertificate: String,
  birthCertificate: String,
  stateOfOrigin: String,
  localGovernmentArea: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);