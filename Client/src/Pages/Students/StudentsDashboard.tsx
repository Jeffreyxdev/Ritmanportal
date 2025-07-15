import { useEffect, useState } from "react";
import { StudentHeader } from "./StudentHeader";
import { SemesterDropdown } from "./SemesterDropdown";
import { ResultSection } from "./ResultSection";
import { Card, CardContent } from "../Components/ui/card";
import { getStudentResults } from "../Services/resultAPI";
import API from "../Services/authAPI";
import { calculateGPA } from "../Components/gpaUtils";
import React from "react";
interface CourseResult {
  code: string;
  title: string;
  creditUnits: number;
  ca: number;
  exam: number;
  total: number;
  grade: string;
}

interface StudentResult {
  session: string;
  semester: string;
  level?: string;
  course: {
    courseCode: string;
    courseTitle: string;
    creditUnits: number;
    level?: string;
  };
  score: number;
  ca?: number;
  exam?: number;
  grade: string;
}

interface StudentProfile {
  name: string;
  department: string;
  level: string;
}

const StudentDashboard = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
 


  const [studentData, setStudentData] = useState<StudentProfile>({
    name: "",
    department: "",
    level: "",
  });
  const [gpaBySemester, setGpaBySemester] = useState<Record<string, number>>({});
  const [cgpa, setCgpa] = useState<number>(0);
  const [results, setResults] = useState<StudentResult[]>([]);
  const [availableSemesters, setAvailableSemesters] = useState<string[]>([]);
  const [groupedResults, setGroupedResults] = useState<any>({});

 useEffect(() => {
  const fetchStudentData = async () => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      console.error("❌ No student ID found in localStorage");
      return;
    }

    try {
      const res = await API.get(`/student/${studentId}`); // <-- must use backticks!
      setStudentData({
        name: res.data.fullName,
        department: res.data.department,
        level: res.data.level,
      });
    } catch (err) {
      console.error("Failed to fetch student data", err);
    }
  };

  fetchStudentData();
}, []);


  // ✅ Fetch available semesters from backend
  // useEffect(() => {
  //   const fetchSemesters = async () => {
  //     try {
  //       const res = await API.get("/semesters");
  //       setAvailableSemesters(res.data);
  //       if (res.data.length > 0) {
  //         setSelectedSemester(res.data[0]); // Set first semester as default
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch semesters", err);
  //     }
  //   };

  //   fetchSemesters();
  // }, []);


  // ✅ Fetch results and extract semesters
 useEffect(() => {
  const fetchResults = async () => {
    if (!studentData.level || !selectedSemester) return;

    try {
      const res = await getStudentResults(studentData.level, selectedSemester);
      const data: StudentResult[] = res.data;
      setResults(data);
    } catch (err) {
      console.error("Failed to fetch student results", err);
    }
  };

  fetchResults();
}, [studentData.level, selectedSemester]);

  // ✅ Group results by level and semester
  useEffect(() => {
    const grouped: Record<string, Record<string, CourseResult[]>> = {};
    results.forEach((res) => {
      const lvl = res.course.level || res.level || studentData.level;
      const sem = `${res.session}-${res.semester}`;
      if (!grouped[lvl]) grouped[lvl] = {};
      if (!grouped[lvl][sem]) grouped[lvl][sem] = [];

      grouped[lvl][sem].push({
        code: res.course.courseCode,
        title: res.course.courseTitle,
        creditUnits: res.course.creditUnits,
        ca: res.ca ?? res.score * 0.3,
        exam: res.exam ?? res.score * 0.7,
        total: res.score,
        grade: res.grade,
      });
    });
    setGroupedResults(grouped);
  }, [results, studentData]);

  // ✅ GPA + CGPA calculations
  useEffect(() => {
    const gpaMap: Record<string, number> = {};
    let allCourses: CourseResult[] = [];

    Object.keys(groupedResults).forEach((lvl) => {
      Object.keys(groupedResults[lvl]).forEach((sem) => {
        const key = `${lvl}-${sem}`;
        const courses = groupedResults[lvl][sem];
        const gpa = calculateGPA(courses);
        gpaMap[key] = gpa;
        allCourses = [...allCourses, ...courses];
      });
    });

    setGpaBySemester(gpaMap);
    setCgpa(calculateGPA(allCourses));
  }, [groupedResults]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <StudentHeader
         
        />

        <Card className="mb-6">
          <CardContent className="p-6">
            <SemesterDropdown
              semesters={Object.keys(groupedResults).flatMap((lvl) =>
                Object.keys(groupedResults[lvl])
              )}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
            />
            <p className="text-sm text-muted-foreground mt-2">
              GPA (this semester): <strong>{gpaBySemester[selectedSemester]?.toFixed(2) || "N/A"}</strong> | CGPA: <strong>{cgpa.toFixed(2)}</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="border-b border-academic-secondary">
              <h2 className="text-xl font-bold p-4 text-orange-700">Academic Results</h2>
            </div>

            {Object.keys(groupedResults).map((lvl) =>
              Object.keys(groupedResults[lvl])
                .filter((sem) => sem === selectedSemester)
                .map((sem, i) => (
                  <ResultSection
                    key={`${lvl}-${sem}`}
                    level={lvl}
                    semester={sem.split("-")[1]}
                    courses={groupedResults[lvl][sem]}
                    isOpenByDefault={i === 0}
                  />
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default StudentDashboard;