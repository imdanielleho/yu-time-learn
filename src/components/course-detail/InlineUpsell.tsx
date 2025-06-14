
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InlineUpsellProps {
  courseTitle: string;
  onBuildBundle: () => void;
  onContinue: () => void;
  onClose: () => void;
}

const InlineUpsell = ({
  courseTitle,
  onBuildBundle,
  onContinue,
  onClose
}: InlineUpsellProps) => (
  <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center px-2 py-10">
    <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-yutime-sage mb-4">
          Want to save 30%?
        </h2>
        <div className="bg-yutime-sand_light rounded-lg p-6 mb-6">
          <p className="text-yutime-sage mb-4">
            You're about to purchase <strong>"{courseTitle}"</strong> for HKD 120.
          </p>
          <p className="text-lg font-semibold text-yutime-coral mb-2">
            Add 2 more courses for only HKD 230 more to get a 3-course bundle!
          </p>
          <div className="text-sm text-yutime-warmGray">
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
        </div>
        <div className="space-y-3">
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
    </div>
  </div>
);

export default InlineUpsell;
