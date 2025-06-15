
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { BUNDLE_TYPE, FIVE_COURSE_BUNDLE } from "./types";

interface IntegratedBundleDrawerHeaderProps {
  selectedCount: number;
  bundleDrawerMode: 'standalone' | 'add-to-cart';
  isMobile: boolean;
  onCancel: () => void;
  onReturnToCart: () => void;
}

const IntegratedBundleDrawerHeader: React.FC<IntegratedBundleDrawerHeaderProps> = ({
  selectedCount,
  bundleDrawerMode,
  isMobile,
  onCancel,
  onReturnToCart,
}) => {
  const progressPercentage = bundleDrawerMode === 'add-to-cart' 
    ? (selectedCount / 5) * 100 // Allow selecting up to 5 courses when adding to cart
    : (selectedCount / BUNDLE_TYPE.count) * 100;

  const maxCourses = bundleDrawerMode === 'add-to-cart' ? 5 : BUNDLE_TYPE.count;

  return (
    <div className="border-b p-3">
      <div className="flex items-center justify-between mb-2">
        {(isMobile || bundleDrawerMode === 'add-to-cart') && (
          <Button
            variant="ghost"
            size="icon"
            onClick={bundleDrawerMode === 'add-to-cart' ? onReturnToCart : onCancel}
            className="mr-2"
            aria-label={bundleDrawerMode === 'add-to-cart' ? 'Return to cart' : 'Go back'}
          >
            <ArrowLeft size={18} />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-yutime-sage mb-0.5">
            {bundleDrawerMode === 'add-to-cart' ? 'Add More Courses' : 'Build Your Bundle'}
          </h2>
          <p className="text-sm text-yutime-warmGray">
            {bundleDrawerMode === 'add-to-cart' 
              ? 'Select courses to add to your cart'
              : 'Pick 3 for HKD 350 or 5 for HKD 500'
            }
          </p>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-yutime-coral" />
            <span className="text-base font-semibold text-yutime-sage" aria-live="polite">
              {selectedCount} {bundleDrawerMode === 'add-to-cart' ? 'course' : `of ${maxCourses}`} selected
            </span>
          </div>
        </div>
        {bundleDrawerMode !== 'add-to-cart' && (
          <>
            <Progress
              value={progressPercentage}
              className="h-1.5 mb-1"
              aria-label={`Selection progress: ${selectedCount} of ${maxCourses} courses selected`}
            />
            <div className="text-center">
              <span className="text-sm font-medium text-yutime-coral/80">
                Save up to HKD {FIVE_COURSE_BUNDLE.savings}!
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IntegratedBundleDrawerHeader;
