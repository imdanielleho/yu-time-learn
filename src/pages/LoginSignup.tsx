import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Twitter, Apple } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [activeTab, setActiveTab] = useState("login");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login functionality
    console.log("Login attempted with:", loginData);
    toast({
      title: "Login Successful",
      description: "Welcome back to YŪTIME!",
    });
    // In a real app, you would authenticate with your backend
    navigate("/dashboard");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords match
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Demo signup functionality
    console.log("Signup attempted with:", signupData);
    toast({
      title: "Account Created",
      description: "Welcome to YŪTIME!",
    });
    // In a real app, you would register with your backend
    navigate("/dashboard");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    toast({
      title: `${provider} Login`,
      description: "This feature is coming soon!",
    });
  };

  const switchToSignup = () => {
    setActiveTab("signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container max-w-md mx-auto py-12 px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yutime-navy">
            YŪ<span className="text-yutime-blue">TIME</span>
          </h1>
          <p className="mt-2 text-gray-600">Learn at your own pace</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username or Email</Label>
                  <Input 
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                    className="py-5"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button 
                      variant="link" 
                      className="p-0 text-yutime-blue font-medium text-sm"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your password..."
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    className="py-5"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-5 text-lg bg-yutime-blue hover:bg-yutime-blue/90"
                >
                  Login
                </Button>
              </form>
              
              <div className="text-center text-gray-500 my-4">or use a social network</div>
        
              <div className="flex justify-center gap-4 my-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Twitter")}
                >
                  <Twitter className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <Apple className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
              
              <div className="text-center border-t border-gray-200 pt-4 mt-4">
                <p>
                  Not a member yet?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-yutime-blue font-semibold"
                    onClick={switchToSignup}
                  >
                    Sign Up
                  </Button>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    required
                    className="py-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    className="py-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input 
                    id="signupPassword"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                    className="py-5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className="py-5"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-5 text-lg bg-yutime-blue hover:bg-yutime-blue/90"
                >
                  Create Account
                </Button>
              </form>
              
              <div className="text-center text-gray-500 my-4">or use a social network</div>
              
              <div className="flex justify-center gap-4 my-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Twitter")}
                >
                  <Twitter className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="h-5 w-5 text-gray-600" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-12 w-12 bg-gray-200 hover:bg-gray-300 border-0"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <Apple className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
