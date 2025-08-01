import express from 'express';
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCoursesByDepartment,
    getCoursesByLevel,
    getCoursesBySemester,
    getCoursesByCode,
    getCoursesByTitle,
    getCoursesByCodeAndLevel,
    getCoursesByCodeAndSemester,
    getCoursesByCodeAndDepartment,
    getCoursesByLevelAndSemester,
    getCoursesBySemesterAndDepartment,
    getCoursesByLevelSemesterAndDepartment,
    getCoursesByTitleAndLevel
} from '../Controllers/CourseControll.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/', getAllCourses);

// 🔐 Single & Composite Filters First
router.get('/department/:department', getCoursesByDepartment);
router.get('/level/:level', getCoursesByLevel);
router.get('/semester/:semester', getCoursesBySemester);
router.get('/code/:code', getCoursesByCode);
router.get('/title/:title', getCoursesByTitle);

router.get('/code/:code/level/:level', getCoursesByCodeAndLevel);
router.get('/code/:code/semester/:semester', getCoursesByCodeAndSemester);
router.get('/code/:code/department/:department', getCoursesByCodeAndDepartment);
router.get('/level/:level/semester/:semester', getCoursesByLevelAndSemester);
router.get('/semester/:semester/department/:department', getCoursesBySemesterAndDepartment);
router.get('/level/:level/semester/:semester/department/:department', getCoursesByLevelSemesterAndDepartment);
router.get('/title/:title/level/:level', getCoursesByTitleAndLevel);

// 🧠 MUST come after specific ones
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
// export const getCoursesByLevelAndSemester = async (req, res) => {
//   const { level, semester } = req.params;
//   const courses = await Course.find({ level, semester });
//   if (!courses.length) return res.status(404).json({ message: 'No courses found for this level and semester' });
//   res.json(courses);
// }
// export const getCoursesBySemesterAndDepartment = async (req, res) => {
//   const { semester, department } = req.params;
//   const courses = await Course.find({ semester, department });
//   if (!courses.length) return res.status(404).json({ message: 'No courses found for this semester and department' });
//   res.json(courses);
// }

export default router;

