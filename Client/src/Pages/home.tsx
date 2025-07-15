import LoginForm from "../Pages/Students/StudentLogin";
import React from "react";
import Navbar from "./Components/Navbar";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
const home = () => {
  return (
    <div>
      
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-university-black leading-tight">
                Ritman University
                <br />
                <span className="text-university-orange">Students e-Portal</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Access your academic information, course materials, grades, and university services all in one convenient location.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm hover-scale">
                <div className="w-12 h-12 bg-university-orange/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-university-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-university-black">Academic Records</h3>
                  <p className="text-sm text-muted-foreground">View grades & transcripts</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm hover-scale">
                <div className="w-12 h-12 bg-university-orange/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-university-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-university-black">Course Materials</h3>
                  <p className="text-sm text-muted-foreground">Access lectures & resources</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm hover-scale">
                <div className="w-12 h-12 bg-university-orange/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-university-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-university-black">Student Services</h3>
                  <p className="text-sm text-muted-foreground">Registration & support</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm hover-scale">
                <div className="w-12 h-12 bg-university-orange/10 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-university-orange" />
                </div>
                <div>
                  <h3 className="font-semibold text-university-black">Achievements</h3>
                  <p className="text-sm text-muted-foreground">Track your progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <LoginForm />
          </div>
        </div>

        {/* Bottom Section - Stats */}
       
        
      </main>

      {/* Footer */}
      <footer className="bg-university-black text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 Ritman University. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    
    </div>
  )
}

export default home