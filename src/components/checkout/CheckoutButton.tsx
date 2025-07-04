
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
        className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-6 text-xl font-bold rounded-2xl shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
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
