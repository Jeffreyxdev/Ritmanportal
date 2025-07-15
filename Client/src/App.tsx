import Home from "./Pages/home"
import React from "react";
import { Toaster } from "./Pages/Components/ui/toaster";
import { AuthProvider } from './Pages/Content/AuthContent'; 
import {  Routes, Route } from "react-router-dom";
import StudentDashboard from "./Pages/Students/StudentsDashboard";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PrivateRoute from "./Pages/Routes/PrivateRoute"; 
import ForgotPasswordModal from "./Pages/ForgotPassword";
const App = () => {
  return (
    <div>
      <Toaster />
      
      <AuthProvider>
        <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPasswordModal/>}/>
        
        </Routes>
       
      </AuthProvider>
      
    </div>
  )
}

export default App