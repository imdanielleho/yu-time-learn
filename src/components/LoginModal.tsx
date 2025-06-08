
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      onLogin(email, password);
    } else {
      // Handle signup logic
      console.log("Signup attempted with:", { email, firstName, lastName, password });
      onLogin(email, password); // For demo, treat signup as login
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  const handleTabSwitch = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    resetForm();
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
    // TODO: Implement forgot password functionality
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md mx-auto px-6 py-8 my-4 sm:my-8 max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-display font-semibold mb-8 text-gray-900">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'signup' && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-6 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-6 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-6 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
          />
          
          <div className="space-y-3">
            <Input
              type="password"
              placeholder={activeTab === 'signup' ? "Create a Password" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-6 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
            />
            {activeTab === 'login' && (
              <div className="text-right">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-blue-600 text-sm font-medium hover:text-blue-700"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Button>
              </div>
            )}
          </div>
          
          {activeTab === 'signup' && (
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-6 rounded-xl border-gray-200 focus:border-blue-600 focus:ring-blue-600"
            />
          )}
          
          <Button
            type="submit"
            className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {activeTab === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center text-gray-500 my-6">or continue with</div>
        
        <div className="flex justify-center gap-4 my-6">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-50 hover:bg-gray-100 border-gray-200">
            <Twitter className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-50 hover:bg-gray-100 border-gray-200">
            <Facebook className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 bg-gray-50 hover:bg-gray-100 border-gray-200">
            <Linkedin className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        
        <div className="text-center border-t border-gray-200 pt-6 mt-6">
          <p className="text-gray-600">
            {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 text-blue-600 font-semibold hover:text-blue-700"
              onClick={() => handleTabSwitch(activeTab === 'login' ? 'signup' : 'login')}
            >
              {activeTab === 'login' ? 'Sign Up' : 'Login'}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
