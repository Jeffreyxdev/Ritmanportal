import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
 
  fullName: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  address: String,
  course: String,
  faculty: String,
  department: String,
  level: String,
  profilePhoto: String,

  matricNumber: {
    type: String,
    unique: true,
    required: true,
    sparse: true,
  },
  jambRegistrationNumber: String,
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
  jambScore: Number,

  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  }
},{ timestamps: true });


const Application = mongoose.model('Application', applicationSchema);
export default Application;
