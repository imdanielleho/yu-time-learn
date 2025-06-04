
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to YŪTIME!",
    description: "We're excited to help you learn new skills at your own pace. Let's take a quick tour of the platform.",
  },
  {
    title: "Explore Your Dashboard",
    description: "Your dashboard shows your learning progress, enrolled courses, and achievements. This is your personal learning hub.",
  },
  {
    title: "Browse Courses",
    description: "Discover a wide variety of courses designed specifically for adults 45+. From technology to wellness, we have something for everyone.",
  },
  {
    title: "Track Your Progress",
    description: "Monitor your learning journey with detailed progress tracking, completion certificates, and learning streaks.",
  },
  {
    title: "You're All Set!",
    description: "You're ready to start your learning journey. Remember, you can always revisit this tour from the help section.",
  },
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingTour = ({ isOpen, onClose }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('yutime-onboarding-completed', 'true');
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('yutime-onboarding-completed', 'true');
    onClose();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleSkip()}>
      <DialogContent className="sm:max-w-lg">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="absolute -top-2 -right-2 h-8 w-8"
          >
            <X size={16} />
          </Button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yutime-navy mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">
              {currentStepData.description}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-yutime-blue'
                      : index < currentStep
                      ? 'bg-yutime-blue/50'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>

            <span className="text-sm text-gray-500">
              {currentStep + 1} of {onboardingSteps.length}
            </span>

            <Button
              onClick={handleNext}
              className="bg-yutime-blue hover:bg-yutime-blue/90 flex items-center gap-2"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={handleSkip}
              className="text-gray-500 text-sm"
            >
              Skip tour
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTour;
