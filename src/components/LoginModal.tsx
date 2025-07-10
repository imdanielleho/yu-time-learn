
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginSignupTabs from "./login/LoginSignupTabs";
import ForgotPasswordScreen from "./login/ForgotPasswordScreen";
import ResetConfirmationScreen from "./login/ResetConfirmationScreen";

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

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case 'login':
      case 'signup':
        return (
          <LoginSignupTabs
            activeScreen={activeScreen}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            firstName={firstName}
            lastName={lastName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onScreenSwitch={handleScreenSwitch}
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            resetEmail={resetEmail}
            resetEmailError={resetEmailError}
            onResetEmailChange={setResetEmail}
            onSubmit={handleForgotPasswordSubmit}
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'reset-confirmation':
        return (
          <ResetConfirmationScreen
            onBackToLogin={handleBackToLogin}
          />
        );
      default:
        return (
          <LoginSignupTabs
            activeScreen="login"
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            firstName={firstName}
            lastName={lastName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onScreenSwitch={handleScreenSwitch}
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
          />
        );
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
