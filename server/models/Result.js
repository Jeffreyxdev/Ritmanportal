import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ca: Number,
    exam: Number,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    grade: {
      type: String, // e.g. A, B, C, F
      required: true,
    },
    semester: {
      type: String,
      enum: ['First', 'Second'],
      required: true,
    },
    session: {
      type: String,
      required: true, // e.g. "2024/2025"
    },
    level: {
      type: String,
      required: false, // optional if you want to infer it from course/student
    },
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', resultSchema);
export default Result;
