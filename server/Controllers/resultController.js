import Result from '../models/Result.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

// Create a result by regNumber and courseId
export const createResult = async (req, res) => {
  try {
    const { regNumber, courseId, score, grade, semester, session } = req.body;

    const student = await User.findOne({ regNumber });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    let course;
    // Check if courseId is a valid ObjectId
    if (/^[0-9a-fA-F]{24}$/.test(courseId)) {
      course = await Course.findById(courseId);
    }
    // If not, try to find by course code
    if (!course) {
      course = await Course.findOne({ courseCode: courseId });
    }
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const result = await Result.create({
      student: student._id,
      course: course._id,
      score,
      grade,
      semester,
      session
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all results
export const getAllResults = async (_, res) => {
  const results = await Result.find().populate('student course');
  res.json(results);
};

// Student: Get their own results
export const getStudentResults = async (req, res) => {
  const studentId = req.user.id;
  const results = await Result.find({ student: studentId }).populate('course');
  res.json(results);
};

// Admin: Update a result by ID
export const updateResult = async (req, res) => {
  const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!result) return res.status(404).json({ message: 'Result not found' });
  res.json(result);
};

// Admin: Delete a result by ID
export const deleteResult = async (req, res) => {
  const result = await Result.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ message: 'Result not found' });
  res.json({ message: 'Result deleted' });
};
