import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card";
import { useToast } from "../../hooks/use-toast";
import { UserCircle, Lock, LogIn } from "lucide-react";
import { useAuth } from "../Content/AuthContent";
import React from "react";
import { loginUser } from "../Services/authAPI"; // Path to the Axios service file

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
 const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  if (!email || !password) {
    toast({
      title: "Missing Fields",
      description: "Please enter both Email Address and password.",
      variant: "destructive",
    });
    setIsLoading(false);
    return;
  }

  try {
    const response = await loginUser({
       email,
      password,
    });

    const { user, token } = response.data;
        if (!user?.role) {
          throw new Error('Invalid user role. Cannot continue.');
        }
    login({ user, token }); // still saves user/token to context

    toast({
      title: "Login Successful",
      description: `Welcome, ${user.role}!`,
    });

    // ✅ Role-based routing
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else if (user.role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/"); // fallback
    }

  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed. Check your credentials.";
    toast({
      title: "Login Failed",
      description: message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-university-black">
          Student Portal Login
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registration" className="text-university-black font-medium">
              Email
            </Label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-university-orange focus:ring-university-orange"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-university-black font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-university-orange focus:ring-university-orange"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-university-orange hover:bg-university-orange-dark text-white font-medium rounded-full hover-scale"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Log in</span>
              </div>
            )}
          </Button>

          <div className="text-center space-y-2">
            <Link to={'/forgot-password'} className="text-sm text-university-orange hover:text-university-orange-dark transition-colors">
              Forgot your password?
            </Link>
            <div className="text-sm text-muted-foreground">
              Need help? <a href="#" className="text-university-orange hover:text-university-orange-dark transition-colors">Contact Support</a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
