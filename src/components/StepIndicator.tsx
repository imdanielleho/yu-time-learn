
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, stepLabel }) => {
  return (
    <div className="text-center mb-8">
      <p className="text-yutime-warmGray font-medium text-lg">
        Step {currentStep} of {totalSteps}: {stepLabel}
      </p>
    </div>
  );
};

export default StepIndicator;
