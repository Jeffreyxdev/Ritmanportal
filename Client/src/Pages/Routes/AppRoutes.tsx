import { Route } from "react-router-dom";
import AdminLogin from "../Admin/AdminLogin";
import StudentLogin from "../Students/StudentLogin";
import ProtectedRoute from "../Components/ProtectedRoute";
import AdminLayout from "../Layouts/AdminLayouts";
import AdminDashboard from "../Admin/AdminDashboard";
import StudentLayout from "../Layouts/StudentLayout";
import StudentDashboard from "../Students/StudentsDsshboard";
import { Routes } from "react-router-dom";
import React from "react";

const AppRoutes = () => (
  <>
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/student/login" element={<StudentLogin />} />

    <Route path="/admin/dashboard" element={
      <ProtectedRoute role="admin">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </ProtectedRoute>
    } />

    <Route path="/student/dashboard" element={
      <ProtectedRoute role="student">
        <StudentLayout><StudentDashboard /></StudentLayout>
      </ProtectedRoute>
    } />
  </Routes>
  </>
);

export default AppRoutes;
