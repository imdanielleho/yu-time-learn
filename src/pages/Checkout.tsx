
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    couponCode: ''
  });

  const total = getTotalPrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 2000);
  };

  if (items.length === 0) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl py-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-yutime-blue hover:text-yutime-blue/80 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Courses</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-yutime-sage mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Information */}
              <div>
                <h2 className="text-lg font-semibold text-yutime-sage mb-4">Billing Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-yutime-sage mb-4 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div>
                <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
                <Input
                  id="couponCode"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  value={formData.couponCode}
                  onChange={handleInputChange}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-medium flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <Lock className="mr-2" size={20} />
                )}
                {isProcessing ? 'Processing...' : `Complete Purchase - HKD ${total}`}
              </Button>
            </form>

            <p className="text-sm text-yutime-warmGray text-center mt-4">
              <Lock className="inline mr-1" size={14} />
              Your payment information is secure and encrypted
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-yutime-sage mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-yutime-sage text-sm">{item.title}</h4>
                    <p className="text-xs text-yutime-warmGray">{item.category}</p>
                  </div>
                  <span className="font-medium text-yutime-sage">HKD {item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-yutime-warmGray">Subtotal:</span>
                <span className="text-yutime-sage">HKD {total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yutime-warmGray">Tax:</span>
                <span className="text-yutime-sage">HKD 0</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-yutime-sage pt-2 border-t">
                <span>Total:</span>
                <span>HKD {total}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yutime-sand_light rounded-lg">
              <h3 className="font-medium text-yutime-sage mb-2">What's Included:</h3>
              <ul className="text-sm text-yutime-warmGray space-y-1">
                <li>• Lifetime access to all course materials</li>
                <li>• Mobile and desktop compatibility</li>
                <li>• Certificate of completion</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
