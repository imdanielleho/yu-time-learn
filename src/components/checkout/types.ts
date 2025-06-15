
export interface FormData {
  fullName: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  postalCode: string;
  coupon: string;
}

export interface DeleteDialog {
  open: boolean;
  courseId: number | null;
}

export interface CheckoutItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}

export interface CouponCode {
  code: string;
  amount: number;
  bundleOnly?: boolean;
}
