import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(course);
};

export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: 'Course deleted' });
};
export const getCoursesByDepartment = async (req, res) => {
  const { department } = req.params;
  const courses = await Course.find({ department });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this department' });
  res.json(courses);
};
export const getCoursesByLevel = async (req, res) => {
  const { level } = req.params;
  const courses = await Course.find({ level });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this level' });
  res.json(courses);
}
export const getCoursesBySemester = async (req, res) => {
  const { semester } = req.params;
  const courses = await Course.find({ semester });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this semester' });
  res.json(courses);
}
export const getCoursesByCode = async (req, res) => {
  const { code } = req.params;
  const course = await Course.findOne({ code });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
}
export const getCoursesByTitle = async (req, res) => {
  const { title } = req.params;
  const courses = await Course.find({ title: new RegExp(title, 'i') }); // case-insensitive search
  if (!courses.length) return res.status(404).json({ message: 'No courses found with this title' });
  res.json(courses);
}
export const getCoursesByCodeAndLevel = async (req, res) => {
  const { code, level } = req.params;
  const courses = await Course.find({ code, level });
  if (!courses.length) return res.status(404).json({ message: 'No courses found with this code and level' });
  res.json(courses);
}
export const getCoursesByCodeAndSemester = async (req, res) => {
  const { code, semester } = req.params;
  const courses = await Course.find({ code, semester });
  if (!courses.length) return res.status(404).json({ message: 'No courses found with this code and semester' });
  res.json(courses);
}
export const getCoursesByCodeAndDepartment = async (req, res) => {
  const { code, department } = req.params;
  const courses = await Course.find({ code, department });
  if (!courses.length) return res.status(404).json({ message: 'No courses   found with this code and department' });
  res.json(courses);
}
export const getCoursesByLevelAndSemester = async (req, res) => {
  const { level, semester } = req.params;
  const courses = await Course.find({ level, semester });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this level and semester' });
  res.json(courses);
}
export const getCoursesByLevelAndDepartment = async (req, res) => {
  const { level, department } = req.params;
  const courses = await Course.find({ level, department });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this level and department' });
  res.json(courses);
}
export const getCoursesBySemesterAndDepartment = async (req, res) => {
  const { semester, department } = req.params;
  const courses = await Course.find({ semester, department });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this semester and department' });
  res.json(courses);
}
export const getCoursesByLevelSemesterAndDepartment = async (req, res) => {
  const { level, semester, department } = req.params;
  const courses = await Course.find({ level, semester, department });
  if (!courses.length) return res.status(404).json({ message: 'No courses found for this level, semester and department' });
  res.json(courses);
}
export const getCoursesByTitleAndLevel = async (req, res) => {
  const { title, level } = req.params;
  const courses = await Course.find({ title: new RegExp(title, 'i'), level });
  if (!courses.length) return res.status(404).json({ message: 'No courses found with this title and level' });
  res.json(courses);
}
