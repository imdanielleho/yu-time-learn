
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from 'lucide-react';
import { FormData } from './types';

interface PaymentDetailsProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentDetails = ({ formData, onInputChange }: PaymentDetailsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-yutime-lavender/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-yutime-lavender rounded-full flex items-center justify-center">
          <span className="text-yutime-charcoal font-semibold">2</span>
        </div>
        <h2 className="text-xl font-semibold text-yutime-primary">Payment Details</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="mb-2 block text-base text-yutime-charcoal">Card Number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={onInputChange}
              required
              className="text-base py-3 pl-12 border-yutime-lavender/50 focus:border-yutime-secondary focus:ring-yutime-secondary/30"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yutime-charcoal/60" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="mb-2 block text-base text-yutime-charcoal">Expiry</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={onInputChange}
              required
              className="text-base py-3 border-yutime-lavender/50 focus:border-yutime-secondary focus:ring-yutime-secondary/30"
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="mb-2 block text-base text-yutime-charcoal">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={onInputChange}
              required
              className="text-base py-3 border-yutime-lavender/50 focus:border-yutime-secondary focus:ring-yutime-secondary/30"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="mb-2 block text-base text-yutime-charcoal">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder="12345"
              value={formData.postalCode}
              onChange={onInputChange}
              required
              className="text-base py-3 border-yutime-lavender/50 focus:border-yutime-secondary focus:ring-yutime-secondary/30"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
