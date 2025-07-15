
import { Button } from "../Components/ui/button";
import React from "react";
import logo from "../../Assets/logo.jpeg"; 
const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-university-orange rounded-full flex items-center justify-center">
              <img src={logo} alt="ritman logo"  />
            </div>
            <div>
              <h1 className="text-xl font-bold text-university-black">Ritman University</h1>
              <p className="text-sm text-muted-foreground">Excellence in Education</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="default" 
              className="bg-university-orange hover:bg-university-orange-dark text-white px-6 py-2 rounded-full hover-scale"
            >
              Log in
            </Button>
            <Button 
              variant="outline" 
              className="border-university-black text-university-black hover:bg-university-black hover:text-white px-6 py-2 rounded-full hover-scale"
            >
              Updates
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
