
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'hover' | 'scroll' | 'wait';
  actionText?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: "Welcome to YŪTIME!",
    description: "Let's take an interactive tour of your learning platform. We'll guide you through the key features step by step.",
    position: 'bottom'
  },
  {
    id: 'dashboard-stats',
    title: "Your Learning Dashboard",
    description: "These cards show your progress at a glance. Click on any card to see more details.",
    target: '[data-tour="stats-cards"]',
    position: 'bottom',
    action: 'click',
    actionText: "Try clicking on the 'Enrolled Courses' card"
  },
  {
    id: 'sidebar-nav',
    title: "Navigate Your Learning",
    description: "Use the sidebar to access different sections. Click on 'My Courses' to see your enrolled courses.",
    target: '[data-tour="sidebar-nav"]',
    position: 'right',
    action: 'click',
    actionText: "Click on 'My Courses' in the sidebar"
  },
  {
    id: 'course-progress',
    title: "Track Your Progress",
    description: "Here you can see your current courses and continue where you left off. Try clicking 'Continue Learning' on any course.",
    target: '[data-tour="course-cards"]',
    position: 'top',
    action: 'click',
    actionText: "Click 'Continue Learning' on any course"
  },
  {
    id: 'explore-courses',
    title: "Discover New Courses",
    description: "Browse all available courses in the Courses section. Click on 'Courses' in the sidebar to explore.",
    target: '[data-tour="courses-nav"]',
    position: 'right',
    action: 'click',
    actionText: "Click on 'Courses' to explore new learning opportunities"
  },
  {
    id: 'complete',
    title: "You're All Set!",
    description: "Great job! You've learned how to navigate YŪTIME. Start exploring courses and continue your learning journey!",
    position: 'bottom'
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingTour = ({ isOpen, onClose }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isWaitingForAction, setIsWaitingForAction] = useState(false);

  const currentStepData = onboardingSteps[currentStep];

  useEffect(() => {
    if (!isOpen) return;

    const updateTargetElement = () => {
      if (currentStepData.target) {
        const element = document.querySelector(currentStepData.target) as HTMLElement;
        setTargetElement(element);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
          
          let top = rect.top + scrollTop;
          let left = rect.left + scrollLeft;
          
          // Adjust position based on target position
          switch (currentStepData.position) {
            case 'top':
              top = rect.top + scrollTop - 120;
              left = rect.left + scrollLeft + rect.width / 2 - 200;
              break;
            case 'bottom':
              top = rect.bottom + scrollTop + 20;
              left = rect.left + scrollLeft + rect.width / 2 - 200;
              break;
            case 'left':
              top = rect.top + scrollTop + rect.height / 2 - 60;
              left = rect.left + scrollLeft - 420;
              break;
            case 'right':
              top = rect.top + scrollTop + rect.height / 2 - 60;
              left = rect.right + scrollLeft + 20;
              break;
          }
          
          setTooltipPosition({ top, left });
          
          // Scroll element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setTargetElement(null);
        setTooltipPosition({ 
          top: window.innerHeight / 2 - 150, 
          left: window.innerWidth / 2 - 200 
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateTargetElement, 100);
    
    // Set up action detection
    if (currentStepData.action && currentStepData.target) {
      setIsWaitingForAction(true);
      
      const element = document.querySelector(currentStepData.target);
      if (element) {
        const handleAction = () => {
          setIsWaitingForAction(false);
          setTimeout(() => handleNext(), 500);
        };
        
        element.addEventListener(currentStepData.action, handleAction);
        
        return () => {
          clearTimeout(timer);
          element.removeEventListener(currentStepData.action, handleAction);
        };
      }
    }
    
    return () => clearTimeout(timer);
  }, [currentStep, isOpen, currentStepData]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsWaitingForAction(false);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsWaitingForAction(false);
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

  if (!isOpen) return null;

  return (
    <>
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={handleSkip}
      />
      
      {/* Spotlight for target element */}
      {targetElement && (
        <div 
          className="fixed z-50 pointer-events-none transition-all duration-300"
          style={{
            top: targetElement.getBoundingClientRect().top - 8,
            left: targetElement.getBoundingClientRect().left - 8,
            width: targetElement.offsetWidth + 16,
            height: targetElement.offsetHeight + 16,
            boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.5)',
            borderRadius: '8px',
          }}
        />
      )}
      
      {/* Tutorial tooltip */}
      <div 
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-96 transition-all duration-300"
        style={{
          top: tooltipPosition.top,
          left: Math.max(20, Math.min(tooltipPosition.left, window.innerWidth - 420)),
        }}
      >
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkip}
            className="absolute -top-2 -right-2 h-8 w-8"
          >
            <X size={16} />
          </Button>
          
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-yutime-blue" />
              <h3 className="text-lg font-bold text-yutime-navy">
                {currentStepData.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              {currentStepData.description}
            </p>
          </div>

          {isWaitingForAction && currentStepData.actionText && (
            <div className="mb-4 p-3 bg-yutime-blue/10 rounded-lg">
              <p className="text-sm text-yutime-blue font-medium">
                {currentStepData.actionText}
              </p>
            </div>
          )}

          <div className="flex justify-center mb-4">
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

            {!isWaitingForAction && (
              <Button
                onClick={handleNext}
                className="bg-yutime-blue hover:bg-yutime-blue/90 flex items-center gap-2"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight size={16} />
              </Button>
            )}
            
            {isWaitingForAction && (
              <Button
                variant="outline"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                Skip Step
                <ArrowRight size={16} />
              </Button>
            )}
          </div>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={handleSkip}
              className="text-gray-500 text-sm"
            >
              Skip tutorial
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
