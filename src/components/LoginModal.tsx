import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, ArrowLeft } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

type ModalScreen = 'login' | 'signup' | 'forgot-password' | 'reset-confirmation';

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const navigate = useNavigate();
  const [activeScreen, setActiveScreen] = useState<ModalScreen>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeScreen === 'login') {
      onLogin(email, password);
    } else if (activeScreen === 'signup') {
      // Handle signup logic
      console.log("Signup attempted with:", { email, firstName, lastName, password });
      onLogin(email, password); // For demo, treat signup as login
    }
    onClose();
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetEmailError("");
    
    // Simple email validation
    if (!resetEmail || !resetEmail.includes('@')) {
      setResetEmailError("Please enter a valid email address");
      return;
    }
    
    // Mock validation - in real app, this would check against registered users
    if (resetEmail === "notregistered@example.com") {
      setResetEmailError("This email is not registered");
      return;
    }
    
    // Show confirmation screen
    setActiveScreen('reset-confirmation');
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setResetEmail("");
    setResetEmailError("");
  };

  const handleScreenSwitch = (screen: ModalScreen) => {
    setActiveScreen(screen);
    if (screen === 'login' || screen === 'signup') {
      resetForm();
    }
  };

  const handleForgotPassword = () => {
    setActiveScreen('forgot-password');
  };

  const handleBackToLogin = () => {
    setActiveScreen('login');
    setResetEmail("");
    setResetEmailError("");
  };

  const renderLoginSignupTabs = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-2 sm:mb-6">
          {activeScreen === 'login' ? 'Login' : 'Sign Up'}
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex mb-2 sm:mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => handleScreenSwitch('login')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeScreen === 'login'
              ? 'bg-white text-yutime-navy shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => handleScreenSwitch('signup')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeScreen === 'signup'
              ? 'bg-white text-yutime-navy shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        {activeScreen === 'signup' && (
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <Input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-2 sm:py-3 bg-white"
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-2 sm:py-3 bg-white"
            />
          </div>
        )}
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-2 sm:py-3 bg-white"
        />
        
        <div className="space-y-1 sm:space-y-2">
          <Input
            type="password"
            placeholder={activeScreen === 'signup' ? "Create a Password" : "Your password..."}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 sm:py-3 bg-white"
          />
          {activeScreen === 'login' && (
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
        
        {activeScreen === 'signup' && (
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-2 sm:py-3 bg-white"
          />
        )}
        
        <div className={activeScreen === 'signup' ? 'pt-6' : 'pt-2'}>
          <Button
            type="submit"
            className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white w-full py-3 sm:py-4 text-base sm:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md"
          >
            {activeScreen === 'login' ? 'Login' : 'Create Account'}
          </Button>
        </div>
      </form>
      
      <div className="text-center text-gray-500 my-1 text-sm">or use a social network</div>
      
      <div className="flex justify-center gap-3 my-1">
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 hover:bg-gray-300 border-0">
          <img 
            src="/lovable-uploads/da91191a-545c-444d-be93-957fa4a3864e.png" 
            alt="Apple" 
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
        </Button>
      </div>
      
      <div className="text-center border-t border-gray-200 pt-2 mt-2">
        <p className="text-sm">
          {activeScreen === 'login' ? "Not a member yet?" : "Already have an account?"}{" "}
          <Button
            variant="link"
            className="p-0 text-yutime-blue font-semibold text-sm"
            onClick={() => handleScreenSwitch(activeScreen === 'login' ? 'signup' : 'login')}
          >
            {activeScreen === 'login' ? 'Sign Up' : 'Login'}
          </Button>
          .
        </p>
      </div>
    </>
  );

  const renderForgotPasswordScreen = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-2 sm:mb-6">
          Reset Your Password
        </DialogTitle>
      </DialogHeader>
      
      <div className="text-center text-gray-600 mb-6 text-sm">
        Please enter the email address you used to register.
      </div>

      <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="w-full py-2 sm:py-3 bg-white"
          />
          {resetEmailError && (
            <div className="text-red-500 text-sm mt-1">{resetEmailError}</div>
          )}
        </div>
        
        <Button
          type="submit"
          className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white w-full py-3 sm:py-4 text-base sm:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md"
        >
          Send Reset Link
        </Button>
      </form>
      
      <div className="text-center border-t border-gray-200 pt-4 mt-6">
        <Button
          variant="link"
          className="p-0 text-yutime-blue font-semibold text-sm flex items-center justify-center gap-2"
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </>
  );

  const renderResetConfirmationScreen = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-2 sm:mb-6">
          📧 Check Your Email
        </DialogTitle>
      </DialogHeader>
      
      <div className="text-center text-gray-600 mb-8 text-sm">
        A password reset link has been sent to your inbox. Follow the instructions to set a new password.
      </div>
      
      <div className="text-center">
        <Button
          variant="link"
          className="p-0 text-yutime-blue font-semibold text-sm flex items-center justify-center gap-2"
          onClick={handleBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </>
  );

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case 'login':
      case 'signup':
        return renderLoginSignupTabs();
      case 'forgot-password':
        return renderForgotPasswordScreen();
      case 'reset-confirmation':
        return renderResetConfirmationScreen();
      default:
        return renderLoginSignupTabs();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto px-3 sm:px-6 lg:px-8 my-2 sm:my-8 max-h-[80vh] overflow-y-auto bg-white">
        {renderCurrentScreen()}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
