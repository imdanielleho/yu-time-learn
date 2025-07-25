
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialLoginButtons from './SocialLoginButtons';

type ModalScreen = 'login' | 'signup';

interface LoginSignupTabsProps {
  activeScreen: ModalScreen;
  email: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onScreenSwitch: (screen: ModalScreen) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

const LoginSignupTabs = ({
  activeScreen,
  email,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onScreenSwitch,
  onSubmit,
  onForgotPassword
}: LoginSignupTabsProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-2 sm:mb-6">
          {activeScreen === 'login' ? 'Login' : 'Sign Up'}
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex mb-2 sm:mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onScreenSwitch('login')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeScreen === 'login'
              ? 'bg-white text-yutime-navy shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => onScreenSwitch('signup')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeScreen === 'signup'
              ? 'bg-white text-yutime-navy shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-2 sm:space-y-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full py-2 sm:py-3 bg-white"
        />
        
        <div className="space-y-1 sm:space-y-2">
          <Input
            type="password"
            placeholder={activeScreen === 'signup' ? "Create a Password" : "Your password..."}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="w-full py-2 sm:py-3 bg-white"
          />
          {activeScreen === 'login' && (
            <div className="text-right">
              <Button
                type="button"
                variant="link"
                className="p-0 text-yutime-blue text-sm font-medium"
                onClick={onForgotPassword}
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
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
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
      
      <SocialLoginButtons />
      
      <div className="text-center border-t border-gray-200 pt-2 mt-2">
        <p className="text-sm">
          {activeScreen === 'login' ? "Not a member yet?" : "Already have an account?"}{" "}
          <Button
            variant="link"
            className="p-0 text-yutime-blue font-semibold text-sm"
            onClick={() => onScreenSwitch(activeScreen === 'login' ? 'signup' : 'login')}
          >
            {activeScreen === 'login' ? 'Sign Up' : 'Login'}
          </Button>
          .
        </p>
      </div>
    </>
  );
};

export default LoginSignupTabs;
