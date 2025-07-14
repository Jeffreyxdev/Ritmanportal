// 📁 src/layouts/AdminLayout.jsx
import type{ ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">Admin Panel</header>
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;