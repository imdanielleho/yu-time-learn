
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { BUNDLE_TYPE, FIVE_COURSE_BUNDLE } from "./types";

interface BundleDrawerHeaderProps {
  selectedCount: number;
  isMobile: boolean;
  onCancel: () => void;
  onReturnToCart?: () => void; // New prop for cart mode
}

const BundleDrawerHeader: React.FC<BundleDrawerHeaderProps> = ({
  selectedCount,
  isMobile,
  onCancel,
  onReturnToCart,
}) => {
  const progressPercentage = (selectedCount / BUNDLE_TYPE.count) * 100;

  return (
    <div className="border-b p-3">
      <div className="flex items-center justify-between mb-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onReturnToCart || onCancel}
            className="mr-2"
            aria-label={onReturnToCart ? "Return to cart" : "Go back"}
          >
            <ArrowLeft size={18} />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-yutime-sage mb-0.5">
            Build Your Bundle
          </h2>
          <p className="text-sm text-yutime-warmGray">
            Pick 3 for HKD 350 or 5 for HKD 500
          </p>
        </div>
        {!isMobile && onReturnToCart && (
          <Button
            variant="ghost"
            onClick={onReturnToCart}
            className="text-sm text-yutime-blue hover:text-yutime-blue/80"
          >
            <ArrowLeft size={16} className="mr-1" />
            Return to Cart
          </Button>
        )}
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-yutime-coral" />
            <span className="text-base font-semibold text-yutime-sage" aria-live="polite">
              {selectedCount} of {BUNDLE_TYPE.count} selected
            </span>
          </div>
        </div>
        <Progress
          value={progressPercentage}
          className="h-1.5 mb-1"
          aria-label={`Selection progress: ${selectedCount} of ${BUNDLE_TYPE.count} courses selected`}
        />
        <div className="text-center">
          <span className="text-sm font-medium text-yutime-coral/80">
            Save up to HKD {FIVE_COURSE_BUNDLE.savings}!
          </span>
        </div>
      </div>
    </div>
  );
};

export default BundleDrawerHeader;
