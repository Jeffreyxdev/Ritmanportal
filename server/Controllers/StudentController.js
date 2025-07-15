import User from "../models/User.js";

export const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await User.findById(studentId).select("-password"); // assuming you're using the User model

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      name: student.fullName,
      department: student.department,
      level: student.level,
      semester: student.semester,
      cgpa: student.cgpa
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
