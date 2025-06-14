
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
  <div className="w-full flex flex-col items-center bg-yutime-sand_light rounded-xl border border-yutime-sage/20 p-6 mb-6 shadow-md">
    <h3 className="text-xl font-bold text-yutime-sage mb-2 text-center">
      Want to save 30%?
    </h3>
    <p className="text-yutime-sage mb-3">
      You're about to purchase <strong>"{courseTitle}"</strong> for HKD 120.
    </p>
    <div className="text-lg font-semibold text-yutime-coral mb-2 text-center">
      Add 2 more courses for only HKD 230 more to get a 3-course bundle!
    </div>
    <div className="text-sm text-yutime-warmGray mb-5 space-y-1 w-full max-w-md">
      <div className="flex justify-between">
        <span>3 individual courses:</span>
        <span className="line-through">HKD 360</span>
      </div>
      <div className="flex justify-between font-bold text-yutime-sage">
        <span>Bundle price:</span>
        <span>HKD 350</span>
      </div>
      <div className="flex justify-between text-green-600 font-medium">
        <span>You save:</span>
        <span>HKD 10</span>
      </div>
    </div>
    <div className="flex flex-col gap-3 w-full">
      <Button
        onClick={onBuildBundle}
        className="w-full bg-yutime-blue hover:bg-yutime-blue/90 text-white py-3 text-lg font-medium"
      >
        Yes, Build My Bundle
      </Button>
      <Button
        onClick={onContinue}
        variant="outline"
        className="w-full border-yutime-warmGray text-yutime-warmGray hover:bg-gray-50 py-3"
      >
        No Thanks, Continue with Single Course
      </Button>
    </div>
  </div>
);

export default CheckoutUpsell;
