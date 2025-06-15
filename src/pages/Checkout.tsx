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
import { ShieldCheck, CreditCard, Lock, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// List of valid coupons.
const validCoupons = [
  { code: "BUNDLE50", amount: 50, bundleOnly: true },
  { code: "WELCOME10", amount: 10 },
];

const Checkout = () => {
  const { items, getTotalPrice, clearCart, removeFromCart } = useCart();
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
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; courseId: number | null }>({
    open: false,
    courseId: null
  });

  // Detect if this checkout is for a single course (Buy Now flow)
  const singleCourse = location.state?.singleCourse;
  const checkoutItems = singleCourse ? [singleCourse] : items;
  const currentTotal = singleCourse ? singleCourse.price : getTotalPrice();
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

  const handleEditToggle = () => {
    setShowDeleteButtons(!showDeleteButtons);
  };

  const handleDeleteCourse = (courseId: number) => {
    setDeleteDialog({ open: true, courseId });
  };

  const confirmDeleteCourse = () => {
    if (deleteDialog.courseId && !singleCourse) {
      removeFromCart(deleteDialog.courseId);
      
      // Reset coupon if bundle status changes
      const newItemCount = items.length - 1;
      const wasBundleEligible = bundleItem;
      const willBeBundleEligible = newItemCount === 3 || newItemCount === 5;
      
      if (wasBundleEligible && !willBeBundleEligible && couponApplied) {
        const appliedCoupon = validCoupons.find(c => 
          c.code.toLowerCase() === formData.coupon.toLowerCase()
        );
        if (appliedCoupon?.bundleOnly) {
          setCouponApplied(false);
          setCouponError('');
          setFormData(prev => ({ ...prev, coupon: '' }));
        }
      }
      
      // If no items left, redirect to home
      if (newItemCount === 0) {
        navigate('/', { state: { message: 'All items removed from cart' } });
      }
    }
    setDeleteDialog({ open: false, courseId: null });
    setShowDeleteButtons(false);
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
    <div className="min-h-screen bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand_light">
      <SecureCheckoutHeader />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yutime-sage mb-2">Complete Your Purchase</h1>
          <p className="text-yutime-warmGray">Secure checkout with instant access</p>
        </div>

        {/* Upsell Offer - only show for single course purchases */}
        {showUpsell && checkoutItems.length === 1 && (
          <div className="mb-8 flex justify-center">
            <CheckoutUpsell
              courseTitle={checkoutItems[0].title}
              onBuildBundle={handleBuildBundle}
              onContinue={handleUpsellContinue}
            />
          </div>
        )}

        {/* Main Checkout Layout */}
        {shouldShowForm && (
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-yutime-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-yutime-sage font-semibold">1</span>
                  </div>
                  <h2 className="text-xl font-semibold text-yutime-sage">Contact Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="mb-2 block text-base text-yutime-sage">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block text-base text-yutime-sage">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-yutime-sage/10 rounded-full flex items-center justify-center">
                    <span className="text-yutime-sage font-semibold">2</span>
                  </div>
                  <h2 className="text-xl font-semibold text-yutime-sage">Payment Details</h2>
                  <div className="flex items-center gap-2 ml-auto">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-yutime-warmGray">Secured by SSL</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="mb-2 block text-base text-yutime-sage">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 pl-12 border-yutime-sand focus:border-yutime-sage"
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yutime-warmGray" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="mb-2 block text-base text-yutime-sage">Expiry</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="mb-2 block text-base text-yutime-sage">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="mb-2 block text-base text-yutime-sage">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="12345"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand focus:border-yutime-sage"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={checked => setAgreed(Boolean(checked))}
                    className="mt-1"
                    required
                  />
                  <div className="flex-1">
                    <label htmlFor="agree" className="text-yutime-sage text-base select-none cursor-pointer leading-relaxed">
                      I agree to the <a href="#" className="text-yutime-blue hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-yutime-blue hover:underline font-medium">Privacy Policy</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-yutime-sage">Order Summary</h2>
                    {!singleCourse && checkoutItems.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className={`transition-all duration-200 ${
                          showDeleteButtons 
                            ? "bg-yutime-sage text-white border-yutime-sage hover:bg-yutime-sage/90" 
                            : "text-yutime-blue border-yutime-blue/20 hover:bg-yutime-blue/5"
                        }`}
                        onClick={handleEditToggle}
                      >
                        {showDeleteButtons ? "Done" : "Edit"}
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {checkoutItems.map((item: any) => (
                      <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${
                        showDeleteButtons ? "bg-red-50 border border-red-100" : "bg-yutime-sand_light"
                      }`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-yutime-sand"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-yutime-sage text-base mb-1 line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-yutime-warmGray">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-yutime-sage text-lg">HKD {item.price}</span>
                          {!singleCourse && showDeleteButtons && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 transition-all duration-200"
                              aria-label={`Remove ${item.title} from cart`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 py-4 border-t border-yutime-sand">
                    <div className="flex justify-between items-center text-base">
                      <span className="text-yutime-warmGray">Subtotal</span>
                      <span className="text-yutime-sage">HKD {currentTotal}</span>
                    </div>
                    {couponApplied && discount > 0 && (
                      <div className="flex justify-between items-center text-base">
                        <span className="text-green-600">Discount ({formData.coupon})</span>
                        <span className="text-green-600">-HKD {discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center font-bold text-xl text-yutime-sage pt-2 border-t border-yutime-sand">
                      <span>Total</span>
                      <span>HKD {total}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="bg-white rounded-xl p-4 border border-yutime-sand/50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-yutime-warmGray">Have a coupon code?</span>
                  </div>
                  
                  <form onSubmit={handleCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        name="coupon"
                        placeholder="Enter code"
                        value={formData.coupon}
                        onChange={handleInputChange}
                        className="flex-1 text-sm border-yutime-sand focus:border-yutime-sage"
                        disabled={couponApplied}
                      />
                      <Button
                        type="submit"
                        variant={couponApplied ? "secondary" : "outline"}
                        size="sm"
                        disabled={couponApplied || !formData.coupon}
                        className={`${couponApplied ? "bg-green-50 text-green-700 border-green-200" : "border-yutime-sage/30 text-yutime-sage hover:bg-yutime-sage/5"} text-sm`}
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

                {/* Security Badges */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand">
                  <div className="flex items-center justify-center gap-6 text-sm text-yutime-warmGray">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span>SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-600" />
                      <span>Safe Payment</span>
                    </div>
                  </div>
                </div>

                {/* Complete Purchase Button */}
                <form onSubmit={handleSubmit}>
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
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, courseId: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this course from your order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialog({ open: false, courseId: null })}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteCourse}
            >
              Remove Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CustomerServiceButton />
    </div>
  );
};

export default Checkout;
