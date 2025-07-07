
import React from 'react';
import { CheckCircle, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import StepIndicator from "@/components/StepIndicator";
import CustomerServiceButton from "@/components/CustomerServiceButton";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderSummary = location.state?.orderSummary;

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Step Indicator */}
        <StepIndicator currentStep={3} totalSteps={3} stepLabel="Complete" />

        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-12 border border-gray-200">
            <CheckCircle className="mx-auto text-[#2a9d8f] mb-8" size={64} />
            <h1 className="text-4xl font-bold text-[#264653] mb-6">
              Welcome to your healing journey
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for taking this important step. Your courses have been added to your account and you can start learning immediately.
            </p>
            
            {/* Success Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={handleStartLearning}
                className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg rounded-xl flex items-center justify-center"
              >
                <Play className="mr-2" size={20} />
                Start Learning
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-[#264653] text-[#264653] bg-transparent hover:bg-[#264653] hover:text-white px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
              >
                Download Resources
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {orderSummary && (
          <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 mb-8">
            <h2 className="text-2xl font-bold text-[#264653] mb-6 text-center">Your Purchase Summary</h2>
            <div className="space-y-4">
              {orderSummary.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#264653] text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <span className="text-[#2a9d8f] font-bold text-lg">HKD {item.price}</span>
                </div>
              ))}
              {orderSummary.discount > 0 && (
                <div className="flex justify-between items-center py-3 text-green-600 border-t border-gray-200">
                  <span className="font-semibold">Discount Applied</span>
                  <span className="font-bold">-HKD {orderSummary.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-6 border-t-2 border-[#264653]">
                <span className="text-2xl font-bold text-[#264653]">Total Paid</span>
                <span className="text-2xl font-bold text-[#2a9d8f]">HKD {orderSummary.total}</span>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 text-center">
          <h3 className="text-xl font-semibold text-[#264653] mb-4">What's Next?</h3>
          <div className="text-gray-600 space-y-3">
            <p>• A confirmation email has been sent to your inbox</p>
            <p>• Access your courses anytime from your dashboard</p>
            <p>• Join our community for additional support</p>
            <p>• Questions? Contact us at support@yutime.com</p>
          </div>
        </div>
      </div>

      <CustomerServiceButton />
    </div>
  );
};

export default Success;
