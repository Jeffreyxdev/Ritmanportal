import Result from '../models/Result.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

// Create a result by regNumber and courseId
export const createResult = async (req, res) => {
  try {
    const { regNumber, courseId, score, grade, semester, session, ca, exam } = req.body;

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
      ca,            // Optional, frontend can pass it or not
      exam,          // Optional
      semester,
      session,
      level: student.level || course.level || undefined, // fallback options
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Result creation failed:", error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all results
export const getAllResults = async (_, res) => {
  const results = await Result.find().populate('student course');
  res.json(results);
};

export const getStudentResults = async (req, res) => {
  const studentId = req.user.id;
  const { semester, level } = req.query;

  const student = await User.findById(studentId).select("fullName department level");
  const filter = { student: studentId };
  if (semester) filter.semester = semester;
  if (level) filter.level = level;

  const results = await Result.find(filter).populate("course");

  res.json({ student, results });
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
