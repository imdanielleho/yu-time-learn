
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
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-teal-700 font-bold text-lg">2</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Payment Details</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="cardNumber" className="mb-3 block text-base font-medium text-slate-700">Card Number</Label>
          <div className="relative">
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={onInputChange}
              required
              className="text-base py-4 pl-12 pr-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="mb-3 block text-base font-medium text-slate-700">Expiry</Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="mb-3 block text-base font-medium text-slate-700">CVV</Label>
            <Input
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
          <div>
            <Label htmlFor="postalCode" className="mb-3 block text-base font-medium text-slate-700">Postal Code</Label>
            <Input
              id="postalCode"
              name="postalCode"
              placeholder="12345"
              value={formData.postalCode}
              onChange={onInputChange}
              required
              className="text-base py-4 px-4 border-slate-300 focus:border-teal-500 focus:ring-teal-500 rounded-xl"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
