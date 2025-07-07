
import React from 'react';
import { CheckCircle, Play, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={3} totalSteps={3} stepLabel="Complete" />

        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Thank you for your purchase!
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your courses have been added to your account and you can start learning immediately. 
            A confirmation email has been sent to your inbox.
          </p>
        </div>

        {/* Order Summary */}
        {orderSummary && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>
            <div className="space-y-6">
              {orderSummary.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-6 py-4 border-b border-slate-100 last:border-b-0">
                  <img 
                    src={item.image || "/placeholder.svg"} 
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-600">{item.category}</p>
                  </div>
                  <span className="text-slate-800 font-bold text-xl">HKD {item.price}</span>
                </div>
              ))}
              
              <div className="border-t border-slate-200 pt-6">
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between items-center py-2 text-green-600">
                    <span className="font-medium text-lg">Discount Applied</span>
                    <span className="font-bold text-lg">-HKD {orderSummary.discount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4">
                  <span className="text-2xl font-bold text-slate-800">Total Paid</span>
                  <span className="text-3xl font-bold text-teal-600">HKD {orderSummary.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleStartLearning}
            className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl rounded-2xl"
          >
            <Play className="mr-3" size={24} />
            Start Learning Now
          </Button>
          
          <div className="flex items-center justify-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Lifetime Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Certificate Included</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-12 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Help Getting Started?</h3>
          <p className="text-slate-600 mb-4">
            Have questions? Our support team is here to help you succeed.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
            <span>📧 support@yutime.com</span>
            <span>📞 +852 3900-4403</span>
          </div>
        </div>
      </div>

      <CustomerServiceButton />
    </div>
  );
};

export default Success;
