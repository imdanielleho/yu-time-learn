
import React from 'react';
import { CheckCircle, Play, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="mb-8">
          <CheckCircle className="mx-auto text-green-500 mb-6" size={80} />
          <h1 className="text-4xl font-bold text-yutime-sage mb-4">
            Thank you for your purchase!
          </h1>
          <p className="text-xl text-yutime-warmGray mb-8">
            Your courses have been added to your account and you can start learning immediately.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-yutime-sage mb-6">What happens next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="text-center">
              <div className="bg-yutime-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Play className="text-yutime-blue" size={24} />
              </div>
              <h3 className="font-semibold text-yutime-sage mb-2">Start Learning</h3>
              <p className="text-sm text-yutime-warmGray">
                Access your courses immediately from your dashboard
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yutime-coral/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="text-yutime-coral" size={24} />
              </div>
              <h3 className="font-semibold text-yutime-sage mb-2">Download Materials</h3>
              <p className="text-sm text-yutime-warmGray">
                Access course materials and resources anytime
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-yutime-sage/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-yutime-sage" size={24} />
              </div>
              <h3 className="font-semibold text-yutime-sage mb-2">Track Progress</h3>
              <p className="text-sm text-yutime-warmGray">
                Monitor your learning journey and earn certificates
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleStartLearning}
            className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-4 text-lg font-medium flex items-center mx-auto"
          >
            <Play className="mr-2" size={20} />
            Start Learning
          </Button>
          
          <p className="text-sm text-yutime-warmGray">
            A confirmation email has been sent to your inbox with your purchase details.
          </p>
        </div>

        <div className="mt-8 p-6 bg-yutime-sand_light rounded-lg">
          <h3 className="font-semibold text-yutime-sage mb-2">Need Help?</h3>
          <p className="text-sm text-yutime-warmGray mb-4">
            Our support team is here to help you get the most out of your courses.
          </p>
          <Button variant="outline" className="border-yutime-blue text-yutime-blue hover:bg-yutime-blue hover:text-white">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
