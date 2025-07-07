
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
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
      <div className="space-y-6">
        <div>
          <Label htmlFor="cardNumber" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Card Number*</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={onInputChange}
              required
              className="text-base py-4 pl-12 pr-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <Label htmlFor="expiryDate" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Expiry*</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">CVV*</Label>
            <Input
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="mb-3 block text-sm font-medium text-gray-700 uppercase tracking-wide">Postal Code*</Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder="12345"
              value={formData.postalCode}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-[#2a9d8f] focus:ring-0 bg-gray-50"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
