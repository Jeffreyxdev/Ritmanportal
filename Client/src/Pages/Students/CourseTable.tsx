import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/ui/table";
import { Badge } from "../Components/ui/badge";

interface Course {
  code: string;
  title: string;
  creditUnits: number;
  ca: number;
  exam?: number;
  total?: number;
  grade?: string;
}

interface CourseTableProps {
  courses: Course[];
}

export const CourseTable = ({ courses }: CourseTableProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-academic-success text-white";
      case "B":
        return "bg-academic-info text-white";
      case "C":
        return "bg-academic-warning text-white";
      case "D":
        return "bg-academic-accent text-white";
      case "F":
        return "bg-destructive text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRemarks = (grade?: string) => {
    if (!grade) return "-";
    return grade === "F" ? "Failed" : "Passed";
  };

  return (
    <div className="border border-academic-secondary rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-academic-secondary hover:bg-academic-secondary">
            <TableHead className="font-semibold text-academic-primary">Course Code</TableHead>
            <TableHead className="font-semibold text-academic-primary">Course Title</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">Units</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">CA</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">Exam</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">Total</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">Grade</TableHead>
            <TableHead className="font-semibold text-academic-primary text-center">Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => {
            const isFailed = course.grade === "F";

            return (
              <TableRow
                key={course.code}
                className={`hover:bg-academic-secondary/50 ${
                  isFailed ? "bg-destructive/10" : ""
                }`}
              >
                <TableCell className="font-medium">{course.code}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell className="text-center">{course.creditUnits}</TableCell>
                <TableCell className="text-center">{course.ca ?? "-"}</TableCell>
                <TableCell className="text-center">{course.exam ?? "-"}</TableCell>
                <TableCell className="text-center font-medium">{course.total ?? "-"}</TableCell>
                <TableCell className="text-center">
                  {course.grade && (
                    <Badge className={`${getGradeColor(course.grade)} font-bold`}>
                      {course.grade}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {getRemarks(course.grade)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
