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
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// Single parameter routes
router.get('/department/:department', getCoursesByDepartment);
router.get('/level/:level', getCoursesByLevel);
router.get('/semester/:semester', getCoursesBySemester);
router.get('/code/:code', getCoursesByCode);
router.get('/title/:title', getCoursesByTitle);

// Composite parameter routes (use more specific paths)
router.get('/code/:code/level/:level', getCoursesByCodeAndLevel);
router.get('/code/:code/semester/:semester', getCoursesByCodeAndSemester);
router.get('/code/:code/department/:department', getCoursesByCodeAndDepartment);
router.get('/level/:level/semester/:semester', getCoursesByLevelAndSemester);
router.get('/semester/:semester/department/:department', getCoursesBySemesterAndDepartment);
router.get('/level/:level/semester/:semester/department/:department', getCoursesByLevelSemesterAndDepartment);
router.get('/title/:title/level/:level', getCoursesByTitleAndLevel);

export default router;

