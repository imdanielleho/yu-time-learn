
import { CouponCode } from './types';

export const validCoupons: CouponCode[] = [
  { code: "WELCOME10", amount: 10 },
];

export const validateCoupon = (
  couponCode: string, 
  isBundleEligible: boolean
): { isValid: boolean; discount: number } => {
  const entered = couponCode.trim();
  const match = validCoupons.find(c =>
    c.code.toLowerCase() === entered.toLowerCase()
  );
  
  return {
    isValid: !!match,
    discount: match?.amount || 0
  };
};

export const calculateTotal = (
  currentTotal: number, 
  discount: number
): number => {
  return Math.max(0, currentTotal - discount);
};
