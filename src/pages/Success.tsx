
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
          <h1 className="text-3xl font-bold text-yutime-sage mb-4">
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
            <div className="space-y-4">
              {orderSummary.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b border-yutime-sand last:border-b-0">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-yutime-sage text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-yutime-warmGray">{item.category}</p>
                  </div>
                  <span className="text-yutime-warmGray font-medium">HKD {item.price}</span>
                </div>
              ))}
              {orderSummary.discount > 0 && (
                <div className="flex justify-between items-center py-2 text-green-600">
                  <span className="font-medium">Discount</span>
                  <span>-HKD {orderSummary.discount}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-yutime-sand">
                <span className="text-xl font-bold text-yutime-sage">Total</span>
                <span className="text-xl font-bold text-yutime-coral">HKD {orderSummary.total}</span>
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
          <div className="bg-white rounded-2xl shadow-soft p-4 border border-yutime-sand text-center">
            <HelpCircle className="mx-auto text-yutime-blue mb-3" size={24} />
            <h3 className="font-medium text-yutime-sage mb-2 text-base">Need Help?</h3>
            <p className="text-sm text-yutime-warmGray mb-3">
              Our support team is here to help you get started.
            </p>
            <Button variant="outline" size="sm" className="border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white">
              Contact Support
            </Button>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-4 border border-yutime-sand text-center">
            <ArrowLeft className="mx-auto text-yutime-sage mb-3" size={24} />
            <h3 className="font-medium text-yutime-sage mb-2 text-base">Browse More Courses</h3>
            <p className="text-sm text-yutime-warmGray mb-3">
              Explore our full course catalog to continue learning.
            </p>
            <Link to="/">
              <Button variant="outline" size="sm" className="border-yutime-sage text-yutime-sage hover:bg-yutime-sage hover:text-white">
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
