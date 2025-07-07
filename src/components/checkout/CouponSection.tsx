
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormData } from './types';

interface CouponSectionProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCouponSubmit: (e: React.FormEvent) => void;
  couponApplied: boolean;
  couponError: string;
  discount: number;
}

const CouponSection = ({ 
  formData, 
  onInputChange, 
  onCouponSubmit, 
  couponApplied, 
  couponError, 
  discount 
}: CouponSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-yutime-sand/50">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-yutime-warmGray">Have a coupon code?</span>
      </div>
      
      <form onSubmit={onCouponSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            name="coupon"
            placeholder="Enter code"
            value={formData.coupon}
            onChange={onInputChange}
            className="flex-1 text-sm border-yutime-sand focus:border-yutime-sage"
            disabled={couponApplied}
          />
          <Button
            type="submit"
            variant={couponApplied ? "secondary" : "outline"}
            disabled={couponApplied || !formData.coupon}
            className={`${couponApplied 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "border-2 border-[#2a9d8f] text-[#2a9d8f] bg-transparent hover:bg-[#2a9d8f] hover:text-white"
            } text-sm py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01]`}
          >
            {couponApplied ? "Applied" : "Apply"}
          </Button>
        </div>
        
        {couponError && (
          <div className="text-red-600 text-xs">{couponError}</div>
        )}
        {couponApplied && (
          <div className="text-green-700 text-xs">
            Coupon applied! You saved HKD {discount}
          </div>
        )}
      </form>
    </div>
  );
};

export default CouponSection;
