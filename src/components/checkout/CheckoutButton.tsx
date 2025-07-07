
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
    <form onSubmit={onSubmit}>
      <Button
        type="submit"
        disabled={isDisabled}
        className="bg-[#2a9d8f] hover:bg-[#228b7a] disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:transform-none disabled:shadow-none text-white w-full py-6 text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
            Processing...
          </div>
        ) : (
          `Complete Purchase – HKD ${total}`
        )}
      </Button>
    </form>
  );
};

export default CheckoutButton;
