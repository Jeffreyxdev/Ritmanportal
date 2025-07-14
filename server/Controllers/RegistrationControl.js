import User from '../models/User.js';
import Course from '../models/Course.js';

export const registerCourses = async (req, res) => {
  const { courseIds } = req.body; // array of Mongo IDs
  const studentId = req.user.id;
const currentYear = new Date().getFullYear();
const generatedMatric = await getNextMatricNumber(department, currentYear);

  try {
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const courses = await Course.find({ _id: { $in: courseIds } });

    student.courses = courses.map(c => c._id);
    await student.save();

    res.json({ message: 'Courses registered', courses });
  } catch (err) {
    res.status(500).json({ message: 'Course registration failed' });
  }
};

export const getRegisteredCourses = async (req, res) => {
  const studentId = req.user.id;
  const student = await User.findById(studentId).populate('courses');
  res.json(student.courses);
};
