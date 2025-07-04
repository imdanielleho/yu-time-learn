
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
    <div className="bg-white rounded-xl p-4 border border-yutime-stoneDark/50">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-yutime-slate">Have a coupon code?</span>
      </div>
      
      <form onSubmit={onCouponSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            name="coupon"
            placeholder="Enter code"
            value={formData.coupon}
            onChange={onInputChange}
            className="flex-1 text-sm border-yutime-stoneDark focus:border-yutime-navy"
            disabled={couponApplied}
          />
          <Button
            type="submit"
            variant={couponApplied ? "secondary" : "outline"}
            size="sm"
            disabled={couponApplied || !formData.coupon}
            className={`${couponApplied ? "bg-green-50 text-green-700 border-green-200" : "border-yutime-navy/30 text-yutime-navy hover:bg-yutime-navy/5"} text-sm`}
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
