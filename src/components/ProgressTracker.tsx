
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps, stepLabel }) => {
  const progressValue = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: 'rgb(42, 157, 143)' }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium" style={{ color: '#343a40b3' }}>
          {stepLabel}
        </span>
      </div>
      <Progress 
        value={progressValue} 
        className="h-2 bg-gray-200"
      />
      <div className="flex justify-between mt-2 text-xs" style={{ color: '#343a40b3' }}>
        <span>Cart</span>
        <span>Checkout</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
