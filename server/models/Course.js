import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    unit: {
      type: Number,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      enum: ['First', 'Second'],
      required: true,
    },
    department: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
