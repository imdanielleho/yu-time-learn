
import React from 'react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps, stepLabel }) => {
  const steps = ['Cart', 'Checkout', 'Complete'];
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-yutime-secondary -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {/* Step circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex flex-col items-center z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-yutime-secondary text-white' 
                    : isCurrent 
                    ? 'bg-yutime-secondary text-white ring-4 ring-yutime-secondary/20' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                isCurrent ? 'text-yutime-secondary' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
