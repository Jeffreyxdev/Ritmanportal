import { useEffect, useState } from "react";
import { Button } from "../Components/ui/button";
import { Bell } from "lucide-react";
import { getStudentProfile } from "../Services/authAPI";
import React from "react";

export const StudentHeader = () => {
  const [student, setStudent] = useState({
    name: "",
    department: "",
    level: "",
    semester: "",
    cgpa: ""
  });

  useEffect(() => {
    getStudentProfile().then(data => {
      setStudent({
        name: data.name,
        department: data.department,
        level: data.level,
        semester: data.semester,
        cgpa: data.cgpa
      });
    }).catch(err => {
      console.error("Failed to fetch student profile", err);
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-900 to-orange-800 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            Welcome {student.name || "Student"}
          </h1>
          <p className="text-lg opacity-90">
            {student.department || "Department"} — {student.level || "Level"}
          </p>
          <p className="text-md mt-1">
            {student.semester ? `${student.semester}` : "Semester not set"} | CGPA: {student.cgpa || "N/A"}
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => console.log("🔔 Updates clicked")}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30"
        >
          <Bell className="w-4 h-4 mr-2" />
          Updates
        </Button>
      </div>
    </div>
  );
};
