
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ResetConfirmationScreenProps {
  onBackToLogin: () => void;
}

const ResetConfirmationScreen = ({ onBackToLogin }: ResetConfirmationScreenProps) => {
  return (
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
          onClick={onBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </>
  );
};

export default ResetConfirmationScreen;
