
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);
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

  const handleDeleteCourse = (courseId: number) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteCourse = () => {
    if (courseToDelete !== null) {
      removeFromCart(courseToDelete);
      
      // Reset coupon if bundle status changes
      if (couponApplied) {
        const newItemCount = items.length - 1;
        const stillBundle = newItemCount === 3 || newItemCount === 5;
        const currentCoupon = validCoupons.find(c =>
          c.code.toLowerCase() === formData.coupon.toLowerCase()
        );
        
        if (currentCoupon?.bundleOnly && !stillBundle) {
          setCouponApplied(false);
          setCouponError('Coupon no longer valid - bundle requirement not met');
        }
      }
      
      // If no items left, redirect to home
      if (items.length <= 1) {
        navigate('/', { state: { message: 'All items removed from checkout' } });
      }
    }
    
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-yutime-sand/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-yutime-sage to-yutime-sage/80 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-sm">1</span>
                  </div>
                  <h2 className="text-xl font-semibold text-yutime-sage">Contact Information</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="mb-2 block text-base text-yutime-sage font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="text-base py-3 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block text-base text-yutime-sage font-medium">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-base py-3 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-yutime-sand/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-yutime-sage to-yutime-sage/80 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold text-sm">2</span>
                  </div>
                  <h2 className="text-xl font-semibold text-yutime-sage">Payment Details</h2>
                  <div className="flex items-center gap-2 ml-auto">
                    <Lock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-yutime-warmGray font-medium">SSL Secured</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="mb-2 block text-base text-yutime-sage font-medium">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 pl-12 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yutime-warmGray" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="expiryDate" className="mb-2 block text-base text-yutime-sage font-medium">Expiry</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="mb-2 block text-base text-yutime-sage font-medium">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="mb-2 block text-base text-yutime-sage font-medium">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="12345"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-yutime-sand/40 focus:border-yutime-sage focus:ring-yutime-sage/20 transition-all duration-200"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-yutime-sand/50">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={checked => setAgreed(Boolean(checked))}
                    className="mt-1 border-yutime-sage/40 data-[state=checked]:bg-yutime-sage data-[state=checked]:border-yutime-sage"
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
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-yutime-sand/50">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-yutime-sage">Order Summary</h2>
                    <div className="px-3 py-1 bg-yutime-sage/10 rounded-full">
                      <span className="text-sm font-medium text-yutime-sage">{checkoutItems.length} {checkoutItems.length === 1 ? 'Course' : 'Courses'}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {checkoutItems.map((item: any) => (
                      <div key={item.id} className="group relative flex items-center gap-4 p-4 bg-gradient-to-r from-yutime-sand_light/50 to-yutime-sand_light/30 rounded-xl border border-yutime-sand/30 hover:shadow-sm transition-all duration-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-yutime-sand/50 shadow-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-yutime-sage text-base mb-1 line-clamp-2">{item.title}</h4>
                          <p className="text-sm text-yutime-warmGray">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-yutime-sage text-lg">HKD {item.price}</span>
                          {!singleCourse && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCourse(item.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-600 hover:bg-red-50 p-2"
                              title="Remove course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 py-4 border-t border-yutime-sand/50">
                    <div className="flex justify-between items-center text-base">
                      <span className="text-yutime-warmGray font-medium">Subtotal</span>
                      <span className="text-yutime-sage font-semibold">HKD {currentTotal}</span>
                    </div>
                    {couponApplied && discount > 0 && (
                      <div className="flex justify-between items-center text-base">
                        <span className="text-green-600 font-medium">Discount ({formData.coupon})</span>
                        <span className="text-green-600 font-semibold">-HKD {discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center font-bold text-xl text-yutime-sage pt-3 border-t border-yutime-sand/50">
                      <span>Total</span>
                      <span className="bg-yutime-sage/10 px-3 py-1 rounded-lg">HKD {total}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="bg-gradient-to-br from-yutime-sunshine/15 via-yutime-coral/10 to-yutime-sunshine/10 backdrop-blur-sm rounded-2xl p-6 border border-yutime-sunshine/30 shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yutime-sunshine to-yutime-coral rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold">%</span>
                    </div>
                    <h3 className="font-semibold text-yutime-sage text-lg">Save More</h3>
                  </div>
                  
                  <form onSubmit={handleCoupon} className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        name="coupon"
                        placeholder="Enter coupon code"
                        value={formData.coupon}
                        onChange={handleInputChange}
                        className="flex-1 border-yutime-sunshine/40 focus:border-yutime-sunshine focus:ring-yutime-sunshine/20 transition-all duration-200"
                        disabled={couponApplied}
                      />
                      <Button
                        type="submit"
                        variant={couponApplied ? "secondary" : "default"}
                        disabled={couponApplied || !formData.coupon}
                        className={couponApplied ? 
                          "bg-green-100 text-green-700 hover:bg-green-200 shadow-sm" : 
                          "bg-gradient-to-r from-yutime-sunshine to-yutime-coral hover:from-yutime-sunshine/90 hover:to-yutime-coral/90 text-white shadow-sm"
                        }
                      >
                        {couponApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>
                    
                    {couponError && (
                      <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded-lg">{couponError}</div>
                    )}
                    {couponApplied && (
                      <div className="text-green-700 text-sm font-medium bg-green-50 p-3 rounded-lg">
                        🎉 Coupon applied successfully! You saved HKD {discount}
                      </div>
                    )}
                  </form>
                </div>

                {/* Security Badges */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-4 border border-yutime-sand/50">
                  <div className="flex items-center justify-center gap-6 text-sm text-yutime-warmGray">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <span className="font-medium">SSL Secured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Safe Payment</span>
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
                    className="w-full bg-gradient-to-r from-yutime-coral to-yutime-coral/90 hover:from-yutime-coral/90 hover:to-yutime-coral/80 text-white py-6 text-xl font-bold rounded-2xl shadow-warm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:hover:scale-100"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="w-5 h-5" />
                        <span>Complete Purchase – HKD {total}</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-yutime-sage">Remove Course</DialogTitle>
            <DialogDescription className="text-yutime-warmGray">
              Are you sure you want to remove this course from your order? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-yutime-sand text-yutime-sage hover:bg-yutime-sand/20"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteCourse}
              className="bg-red-500 hover:bg-red-600 text-white"
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
