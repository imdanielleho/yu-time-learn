
import React from "react";
import { Button } from "@/components/ui/button";

interface CheckoutUpsellProps {
  courseTitle: string;
  onBuildBundle: () => void;
  onContinue: () => void;
}

const CheckoutUpsell = ({
  courseTitle,
  onBuildBundle,
  onContinue,
}: CheckoutUpsellProps) => (
  <div className="w-full flex flex-col items-center bg-yutime-sand_light rounded-xl border border-yutime-sage/20 p-4 mb-6 shadow-sm max-w-md mx-auto">
    <h3 className="text-lg font-bold text-yutime-sage mb-1 text-center">Bundle Offer</h3>
    <div className="text-center text-yutime-coral font-semibold mb-2 text-base">
      Get <span className="font-bold">3 courses for HKD 350</span>
      <span className="text-green-700 font-normal ml-1">(Save HKD 10)</span>
    </div>
    <div className="flex flex-col gap-2 w-full mt-1">
      <Button
        onClick={onBuildBundle}
        className="w-full bg-yutime-blue hover:bg-yutime-blue/90 text-white py-2 text-base font-medium"
      >
        Add Bundle
      </Button>
      <Button
        onClick={onContinue}
        variant="outline"
        className="w-full border-yutime-warmGray text-yutime-warmGray hover:bg-gray-50 py-2 text-base"
      >
        Continue with Single Course
      </Button>
    </div>
  </div>
);

export default CheckoutUpsell;
