
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface ForgotPasswordScreenProps {
  resetEmail: string;
  resetEmailError: string;
  onResetEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToLogin: () => void;
}

const ForgotPasswordScreen = ({
  resetEmail,
  resetEmailError,
  onResetEmailChange,
  onSubmit,
  onBackToLogin
}: ForgotPasswordScreenProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl font-normal mb-2 sm:mb-6">
          Reset Your Password
        </DialogTitle>
      </DialogHeader>
      
      <div className="text-center text-gray-600 mb-6 text-sm">
        Please enter the email address you used to register.
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => onResetEmailChange(e.target.value)}
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
          onClick={onBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
