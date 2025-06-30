
import React from 'react';
import { CheckCircle, Play, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand_light">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Indicator */}
        <StepIndicator currentStep={3} totalSteps={3} stepLabel="Complete" />

        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
          <h1 className="text-4xl font-bold text-yutime-sage mb-4">
            Thank you for your purchase!
          </h1>
          <p className="text-xl text-yutime-warmGray">
            Your courses have been added to your account and you can start learning immediately.
          </p>
        </div>

        {/* Order Summary */}
        {orderSummary && (
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand mb-8">
            <h2 className="text-2xl font-bold text-yutime-sage mb-4">Order Summary</h2>
            <div className="space-y-3">
              {orderSummary.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-yutime-sand last:border-b-0">
                  <span className="font-medium text-yutime-sage">{item.title}</span>
                  <span className="text-yutime-warmGray">${item.price}</span>
                </div>
              ))}
              {orderSummary.discount > 0 && (
                <div className="flex justify-between items-center py-2 text-green-600">
                  <span className="font-medium">Discount</span>
                  <span>-${orderSummary.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-yutime-sand">
                <span className="text-xl font-bold text-yutime-sage">Total</span>
                <span className="text-xl font-bold text-yutime-coral">${orderSummary.total}</span>
              </div>
            </div>
          </div>
        )}

        {/* Start Learning Button */}
        <div className="text-center mb-8">
          <Button
            onClick={handleStartLearning}
            className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-4 text-lg font-medium flex items-center mx-auto"
          >
            <Play className="mr-2" size={20} />
            Start Learning
          </Button>
        </div>

        {/* Help or Return Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand text-center">
            <HelpCircle className="mx-auto text-yutime-blue mb-4" size={48} />
            <h3 className="font-semibold text-yutime-sage mb-2">Need Help?</h3>
            <p className="text-sm text-yutime-warmGray mb-4">
              Our support team is here to help you get started.
            </p>
            <Button variant="outline" className="border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white">
              Contact Support
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand text-center">
            <ArrowLeft className="mx-auto text-yutime-sage mb-4" size={48} />
            <h3 className="font-semibold text-yutime-sage mb-2">Browse More Courses</h3>
            <p className="text-sm text-yutime-warmGray mb-4">
              Explore our full course catalog to continue learning.
            </p>
            <Link to="/">
              <Button variant="outline" className="border-yutime-sage text-yutime-sage hover:bg-yutime-sage hover:text-white">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-yutime-warmGray">
            A confirmation email has been sent to your inbox with your purchase details.
          </p>
        </div>
      </div>

      <CustomerServiceButton />
    </div>
  );
};

export default Success;
