import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CheckoutUpsell from "@/components/checkout/CheckoutUpsell";
import SecureCheckoutHeader from "@/components/checkout/SecureCheckoutHeader";
import CustomerServiceButton from "@/components/CustomerServiceButton";
import { Checkbox } from '@/components/ui/checkbox';

// List of valid coupons.
// Adjust or extend as needed.
const validCoupons = [
  { code: "BUNDLE50", amount: 50, bundleOnly: true },
  { code: "WELCOME10", amount: 10 },
];

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    postalCode: '',
    coupon: ''
  });
  const [showUpsell, setShowUpsell] = useState(true);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Detect if this checkout is for a single course (Buy Now flow)
  const singleCourse = location.state?.singleCourse;
  // Use singleCourse if present, otherwise use cart items
  const checkoutItems = singleCourse ? [singleCourse] : items;
  // Calculate total price for checkout items
  const currentTotal = singleCourse
    ? singleCourse.price
    : getTotalPrice();
  const bundleItem = checkoutItems.length === 3 || checkoutItems.length === 5;
  let discount = 0;
  if (couponApplied) {
    const match = validCoupons.find(c =>
      c.code.toLowerCase() === formData.coupon.toLowerCase() &&
      (!c.bundleOnly || bundleItem)
    );
    if (match) discount = match.amount;
  }
  const total = Math.max(0, currentTotal - discount);

  // Determine if we should show the form
  const shouldShowForm = checkoutItems.length > 1 || !showUpsell;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'coupon' && couponApplied) {
      setCouponApplied(false);
      setCouponError('');
    }
  };

  const handleCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = formData.coupon.trim();
    const match = validCoupons.find(c =>
      c.code.toLowerCase() === entered.toLowerCase() &&
      (!c.bundleOnly || bundleItem)
    );
    if (match) {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  const handleUpsellContinue = () => setShowUpsell(false);
  const handleBuildBundle = () => {
    setShowUpsell(false);
    navigate('/', { state: { openBundle: true } });
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yutime-sage mb-4">Your cart is empty</h1>
          <Link to="/" className="text-yutime-blue hover:underline">
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Secure checkout header */}
      <SecureCheckoutHeader />

      <div className="w-full max-w-lg px-4 py-4">
        {/* Main Title/Header */}
        <h1 className="text-2xl font-bold text-yutime-sage mb-2 text-center">Checkout</h1>

        {/* Order Summary */}
        <section className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-yutime-sage">Your Order</h2>
            <Button
              variant="outline"
              className="text-yutime-blue px-3 py-1 text-base hover:bg-yutime-blue/10"
              onClick={() => navigate("/")}
            >
              Edit Cart
            </Button>
          </div>
          <div className="space-y-3 mb-3">
            {checkoutItems.map((item: any) => (
              <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded border"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-yutime-sage text-base truncate">{item.title}</h4>
                  <p className="text-xs text-yutime-warmGray">{item.category}</p>
                </div>
                <span className="font-semibold text-yutime-sage text-base">HKD {item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center font-bold text-yutime-sage text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>HKD {currentTotal}</span>
          </div>
        </section>

        {/* Upsell Offer - only show for single course purchases */}
        {showUpsell && checkoutItems.length === 1 && (
          <CheckoutUpsell
            courseTitle={checkoutItems[0].title}
            onBuildBundle={handleBuildBundle}
            onContinue={handleUpsellContinue}
          />
        )}

        {/* Main Form - show for bundles immediately, or after upsell is dismissed */}
        {shouldShowForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 space-y-5 border border-gray-100">
            {/* Buyer Information */}
            <section>
              <h2 className="text-lg font-semibold text-yutime-sage mb-2">Buyer Information</h2>
              <div>
                <Label htmlFor="fullName" className="mb-1 block text-base">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="text-base py-3"
                  autoComplete="name"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="email" className="mb-1 block text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="text-base py-3"
                  autoComplete="email"
                />
              </div>
            </section>
            {/* Payment Details */}
            <section>
              <h2 className="text-lg font-semibold text-yutime-sage mb-2">Payment Details</h2>
              <div>
                <Label htmlFor="cardNumber" className="mb-1 block text-base">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="text-base py-3"
                  inputMode="numeric"
                  autoComplete="cc-number"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <Label htmlFor="expiryDate" className="mb-1 block text-base">Expiry</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="text-base py-3"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv" className="mb-1 block text-base">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    className="text-base py-3"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="postalCode" className="mb-1 block text-base">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="e.g. 999077"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  className="text-base py-3"
                  inputMode="text"
                  autoComplete="postal-code"
                />
              </div>
              {/* Coupon code */}
              <div className="mt-4">
                <form className="flex gap-2 items-center" onSubmit={handleCoupon}>
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Coupon code"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    className="text-base py-3 flex-1"
                    disabled={couponApplied}
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={couponApplied || !formData.coupon}
                    className="py-2 px-4"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </Button>
                </form>
                {couponError && (
                  <div className="text-red-600 text-sm mt-1">{couponError}</div>
                )}
                {couponApplied && (
                  <div className="text-green-700 text-sm mt-1">
                    Coupon applied! {discount > 0 ? <>Discount: HKD {discount}</> : null}
                  </div>
                )}
              </div>
              {/* Updated Total if coupon */}
              {couponApplied && (
                <div className="flex justify-between items-center font-bold text-yutime-sage text-lg mt-4 border-t pt-2">
                  <span>New Total</span>
                  <span>HKD {total}</span>
                </div>
              )}
            </section>
            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={checked => setAgreed(Boolean(checked))}
                className="mt-1"
                required
              />
              <label htmlFor="agree" className="text-yutime-sage text-base select-none cursor-pointer">
                I agree to the <a href="#" className="text-yutime-blue hover:underline">Terms of Service</a>
              </label>
            </div>
            {/* Complete Purchase Button */}
            <Button
              type="submit"
              disabled={
                isProcessing ||
                !formData.fullName ||
                !formData.email ||
                !formData.cardNumber ||
                !formData.expiryDate ||
                !formData.cvv ||
                !formData.postalCode ||
                !agreed
              }
              className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold mt-2"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              ) : null}
              {isProcessing
                ? 'Processing...'
                : `Complete Purchase – HKD ${couponApplied ? total : currentTotal}`}
            </Button>
          </form>
        )}
      </div>
      {/* Floating contact button */}
      <CustomerServiceButton />
    </div>
  );
};

export default Checkout;
