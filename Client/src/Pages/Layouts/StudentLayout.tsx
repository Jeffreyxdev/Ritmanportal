import type { ReactNode } from "react";

interface StudentLayoutProps {
  children: ReactNode;
}

const StudentLayout = ({ children }: StudentLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-green-600 text-white p-4">Student Portal</header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default StudentLayout;
