
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import SecureCheckoutHeader from "@/components/checkout/SecureCheckoutHeader";
import ContactInformation from "@/components/checkout/ContactInformation";
import PaymentDetails from "@/components/checkout/PaymentDetails";
import TermsAgreement from "@/components/checkout/TermsAgreement";
import OrderSummary from "@/components/checkout/OrderSummary";
import CouponSection from "@/components/checkout/CouponSection";
import CheckoutButton from "@/components/checkout/CheckoutButton";
import DeleteCourseDialog from "@/components/checkout/DeleteCourseDialog";
import CustomerServiceButton from "@/components/CustomerServiceButton";
import StepIndicator from "@/components/StepIndicator";
import { validateCoupon, calculateTotal } from "@/components/checkout/utils";
import { FormData, DeleteDialog } from "@/components/checkout/types";

const Checkout = () => {
  const { items, getTotalPrice, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    postalCode: '',
    coupon: ''
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialog>({
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
    const validation = validateCoupon(formData.coupon, bundleItem);
    discount = validation.discount;
  }
  const total = calculateTotal(currentTotal, discount);

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
    const validation = validateCoupon(formData.coupon, bundleItem);
    if (validation.isValid) {
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
        const validation = validateCoupon(formData.coupon, false);
        if (!validation.isValid) {
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
      navigate('/success', { 
        state: { 
          orderSummary: {
            items: checkoutItems,
            total: total,
            discount: discount
          }
        }
      });
    }, 2000);
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link to="/" className="text-gray-700 hover:text-gray-900 hover:underline">
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SecureCheckoutHeader />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Step Indicator */}
        <StepIndicator currentStep={2} totalSteps={3} stepLabel="Checkout" />

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Complete Your Purchase</h1>
          <p className="text-gray-600 font-light">Secure checkout with instant access</p>
        </div>

        {/* Main Checkout Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-3 space-y-6">
            <ContactInformation 
              formData={formData}
              onInputChange={handleInputChange}
            />

            <PaymentDetails 
              formData={formData}
              onInputChange={handleInputChange}
            />

            <TermsAgreement 
              agreed={agreed}
              onAgreedChange={setAgreed}
            />
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-6">
              <OrderSummary
                items={items}
                showDeleteButtons={showDeleteButtons}
                onEditToggle={handleEditToggle}
                onDeleteCourse={handleDeleteCourse}
                singleCourse={singleCourse}
                currentTotal={currentTotal}
                discount={discount}
                total={total}
                couponApplied={couponApplied}
                couponCode={formData.coupon}
              />

              <CouponSection
                formData={formData}
                onInputChange={handleInputChange}
                onCouponSubmit={handleCoupon}
                couponApplied={couponApplied}
                couponError={couponError}
                discount={discount}
              />

              <CheckoutButton
                isProcessing={isProcessing}
                formData={formData}
                agreed={agreed}
                total={total}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteCourseDialog
        deleteDialog={deleteDialog}
        onOpenChange={(open) => setDeleteDialog({ open, courseId: null })}
        onConfirm={confirmDeleteCourse}
      />

      <CustomerServiceButton />
    </div>
  );
};

export default Checkout;
