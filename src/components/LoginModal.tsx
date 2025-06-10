
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
      <DialogContent className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-3 sm:px-6 lg:px-8 my-2 sm:my-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-3 sm:mb-6">
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex mb-3 sm:mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleTabSwitch('login')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-yutime-navy shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'signup'
                ? 'bg-white text-yutime-navy shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-4">
          {activeTab === 'signup' && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-2 sm:py-3"
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-2 sm:py-3"
              />
            </div>
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 sm:py-3"
          />
          
          <div className="space-y-1 sm:space-y-2">
            <Input
              type="password"
              placeholder={activeTab === 'signup' ? "Create a Password" : "Your password..."}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 sm:py-3"
            />
            {activeTab === 'login' && (
              <div className="text-right">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-yutime-blue text-sm font-medium"
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
              className="w-full py-2 sm:py-3"
            />
          )}
          
          <Button
            type="submit"
            className="w-full py-3 sm:py-4 text-base sm:text-lg bg-yutime-blue hover:bg-yutime-blue/90"
          >
            {activeTab === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center text-gray-500 my-2 text-sm">or use a social network</div>
        
        <div className="flex justify-center gap-3 my-2">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </Button>
        </div>
        
        <div className="text-center border-t border-gray-200 pt-3 mt-3">
          <p className="text-sm">
            {activeTab === 'login' ? "Not a member yet?" : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="p-0 text-yutime-blue font-semibold text-sm"
              onClick={() => handleTabSwitch(activeTab === 'login' ? 'signup' : 'login')}
            >
              {activeTab === 'login' ? 'Sign Up' : 'Login'}
            </Button>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
