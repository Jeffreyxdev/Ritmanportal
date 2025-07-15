import Home from "./Pages/home"
import React from "react";
import { Toaster } from "./Pages/Components/ui/toaster";
import { AuthProvider } from './Pages/Content/AuthContent'; 
import {  Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Toaster />
      
      <AuthProvider>
        <Routes>
       
          <Route path="/" element={<Home />} />
        
        </Routes>
       
      </AuthProvider>
      
    </div>
  )
}

export default App