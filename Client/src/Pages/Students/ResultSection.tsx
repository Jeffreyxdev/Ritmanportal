import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../Components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CourseTable } from "./CourseTable";
import { calculateGPA } from "../Components/gpaUtils";

interface Course {
  code: string;
  title: string;
  creditUnits: number;
  ca: number;
  exam?: number;
  total?: number;
  grade: string; 
}

interface ResultSectionProps {
  level: string;
  semester: string;
  courses: Course[];
  isOpenByDefault?: boolean;
}

export const ResultSection = ({ level, semester, courses, isOpenByDefault = false }: ResultSectionProps) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [gpa, setGpa] = useState<number>(0);

  useEffect(() => {
    if (courses.length) {
      setGpa(calculateGPA(courses));
    }
  }, [courses]);

  return (
    <div className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 bg-card hover:bg-academic-secondary/50 border-b border-academic-secondary transition-colors">
            <div>
              <h3 className="text-lg font-semibold text-orange-800">
                {level} Level {semester} Semester Result
              </h3>
              {isOpen && (
                <p className="text-sm text-muted-foreground mt-1">
                  GPA: <strong>{gpa.toFixed(2)}</strong>
                </p>
              )}
            </div>
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-academic-primary" />
            ) : (
              <ChevronRight className="w-5 h-5 text-academic-primary" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 bg-card">
            <CourseTable courses={courses} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
