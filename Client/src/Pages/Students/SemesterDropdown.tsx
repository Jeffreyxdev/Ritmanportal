import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Calendar } from "lucide-react";

import React from "react";
interface SemesterDropdownProps {
  selectedSemester: string;
  onSemesterChange: (semester: string) => void;
  availableSemesters: string[]; // 🆕 comes from backend
}

export const SemesterDropdown = ({
  selectedSemester,
  onSemesterChange,
  availableSemesters,
}: SemesterDropdownProps) => {
  return (
    <div className="mb-6">
      <Select value={selectedSemester} onValueChange={onSemesterChange}>
        <SelectTrigger className="w-full max-w-md bg-card border-2 border-academic-secondary hover:border-academic-primary transition-colors">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-800" />
            <span>{selectedSemester || "Select semester"}</span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-card border-academic-secondary">
          {availableSemesters.map((sem) => (
            <SelectItem key={sem} value={sem}>
              {sem.replace("-", " ")} Semester
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
