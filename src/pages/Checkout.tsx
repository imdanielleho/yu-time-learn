
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import CheckoutUpsell from "@/components/checkout/CheckoutUpsell";

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
  });
  const [showUpsell, setShowUpsell] = useState(true);

  // Detect if this checkout is for a single course (Buy Now flow)
  const singleCourse = location.state?.singleCourse;
  // Use singleCourse if present, otherwise use cart items
  const checkoutItems = singleCourse ? [singleCourse] : items;
  // Calculate total price for checkout items
  const total = singleCourse
    ? singleCourse.price
    : getTotalPrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
      <div className="w-full max-w-lg px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-yutime-blue hover:text-yutime-blue/80 mb-4 text-base"
        >
          &larr; Back to Courses
        </Link>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-xl font-bold text-yutime-sage mb-4 text-center">Order Summary</h2>
          <div className="space-y-3 mb-5">
            {checkoutItems.map((item: any) => (
              <div key={item.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-yutime-sage text-sm">{item.title}</h4>
                  <p className="text-xs text-yutime-warmGray">{item.category}</p>
                </div>
                <span className="font-semibold text-yutime-sage text-sm">HKD {item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-yutime-sage pt-2 border-t">
            <span>Total</span>
            <span>HKD {total}</span>
          </div>
          <div className="mt-4 p-3 bg-yutime-sand_light rounded text-sm text-yutime-sage">
            <ul className="space-y-1">
              <li>• Lifetime access to course materials</li>
              <li>• Certificate of completion</li>
            </ul>
          </div>
        </div>

        {/* Upsell Offer */}
        {showUpsell && checkoutItems.length === 1 && (
          <CheckoutUpsell
            courseTitle={checkoutItems[0].title}
            onBuildBundle={handleBuildBundle}
            onContinue={handleUpsellContinue}
          />
        )}

        {/* Minimal Form */}
        {!showUpsell && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-5 space-y-5">
            <h2 className="text-lg font-bold text-yutime-sage mb-2 text-center">Payment Details</h2>
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
            <div>
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
            <div className="flex gap-4">
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
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold mt-2"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              ) : null}
              {isProcessing ? 'Processing...' : `Complete Purchase - HKD ${total}`}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Checkout;

