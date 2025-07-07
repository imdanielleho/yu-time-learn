
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
        className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-400 disabled:hover:bg-slate-400 disabled:transform-none disabled:shadow-none text-white w-full py-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
            Processing Payment...
          </div>
        ) : (
          `Complete Purchase – HKD ${total}`
        )}
      </Button>
    </form>
  );
};

export default CheckoutButton;
