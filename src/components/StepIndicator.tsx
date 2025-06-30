
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepLabel }) => {
  const steps = [
    { number: 1, label: 'Cart' },
    { number: 2, label: 'Checkout' },
    { number: 3, label: 'Complete' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-yutime-sand mb-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4 md:space-x-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                  ${step.number < currentStep 
                    ? 'bg-green-500 text-white' 
                    : step.number === currentStep
                    ? 'bg-yutime-coral text-white'
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step.number < currentStep ? (
                    <Check size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`
                  text-xs mt-2 font-medium
                  ${step.number === currentStep 
                    ? 'text-yutime-coral' 
                    : step.number < currentStep
                    ? 'text-green-600'
                    : 'text-gray-500'
                  }
                `}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  hidden md:block w-12 h-0.5 transition-all
                  ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-yutime-warmGray font-medium">
          Step {currentStep} of {totalSteps}: {stepLabel}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
