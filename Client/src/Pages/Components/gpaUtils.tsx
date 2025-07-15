import React from "react";
interface CourseResult {
  creditUnits: number;
  grade: string;
}

export const calculateGPA = (courses: CourseResult[]): number => {
  const gradeToPoint = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const gradePoint = gradeToPoint[course.grade.toUpperCase() as keyof typeof gradeToPoint];
    if (gradePoint !== undefined) {
      totalPoints += gradePoint * course.creditUnits;
      totalCredits += course.creditUnits;
    }
  });

  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};
