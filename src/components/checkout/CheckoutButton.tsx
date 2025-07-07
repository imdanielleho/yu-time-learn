
import React from "react";
import { Button } from "@/components/ui/button";
import { FormData } from './types';

interface CheckoutButtonProps {
  isProcessing: boolean;
  formData: FormData;
  agreed: boolean;
  total: number;
  onSubmit: (e: React.FormEvent) => void;
}

const CheckoutButton = ({ isProcessing, formData, agreed, total, onSubmit }: CheckoutButtonProps) => {
  const isDisabled = isProcessing ||
    !formData.fullName ||
    !formData.email ||
    !formData.cardNumber ||
    !formData.expiryDate ||
    !formData.cvv ||
    !formData.postalCode ||
    !agreed;

  return (
    <div className="flex gap-4 justify-center">
      <form onSubmit={onSubmit} className="flex gap-4">
        <Button
          type="submit"
          disabled={isDisabled}
          className="bg-[#264653] hover:bg-[#1e3a42] disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:transform-none disabled:shadow-none text-white px-8 py-4 text-base font-medium rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              Processing...
            </div>
          ) : (
            'Schedule A Call'
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 px-8 py-4 text-base font-medium rounded-full transition-all duration-300"
        >
          Sign Up Now
        </Button>
      </form>
    </div>
  );
};

export default CheckoutButton;
