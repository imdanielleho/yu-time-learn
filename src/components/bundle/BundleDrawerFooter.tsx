
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { BUNDLE_TYPE } from "./types";

interface BundleDrawerFooterProps {
  selectedCount: number;
  isMobile: boolean;
  onProceedToCheckout: () => void;
  onFiveCourseBundle: () => void;
  onClearSelection: () => void;
  onCancel: () => void;
}

const BundleDrawerFooter: React.FC<BundleDrawerFooterProps> = ({
  selectedCount,
  isMobile,
  onProceedToCheckout,
  onFiveCourseBundle,
  onClearSelection,
  onCancel,
}) => {
  return (
    <div className="border-t bg-white">
      {/* Section 1: Bundle Summary - Clean, prominent display */}
      {selectedCount > 0 && (
        <div className="px-4 py-4 bg-yutime-cream/30 border-b border-yutime-sage/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-yutime-sage">
                {selectedCount} Course{selectedCount > 1 ? 's' : ''} Selected
              </p>
              <p className="text-sm text-yutime-warmGray">
                {selectedCount === BUNDLE_TYPE.count ? 'Bundle ready for checkout' : `${BUNDLE_TYPE.count - selectedCount} more needed`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-yutime-sage">HKD {BUNDLE_TYPE.price}</p>
              <p className="text-sm font-medium text-yutime-coral">Save HKD {BUNDLE_TYPE.savings}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Section 2: Primary Action Zone - Make checkout button stand out */}
      <div className="px-4 pt-4">
        <Button
          onClick={onProceedToCheckout}
          disabled={selectedCount !== BUNDLE_TYPE.count}
          className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label={selectedCount === BUNDLE_TYPE.count ? 'Proceed to checkout' : `Select ${BUNDLE_TYPE.count - selectedCount} more courses to proceed`}
        >
          {selectedCount === BUNDLE_TYPE.count 
            ? 'Proceed to Checkout' 
            : `Select ${BUNDLE_TYPE.count - selectedCount} More Course${BUNDLE_TYPE.count - selectedCount > 1 ? 's' : ''}`
          }
        </Button>
      </div>
      
      {/* Section 3: Condensed Secondary CTA - 5-course bundle */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between p-3 bg-yutime-cream/40 rounded-lg border border-yutime-coral/30">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-yutime-coral" />
            <span className="text-sm font-medium text-yutime-sage">
              Get all 5 courses for HKD 500 — you save HKD 100!
            </span>
          </div>
          <Button
            onClick={onFiveCourseBundle}
            size="sm"
            variant="outline"
            className="border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:!text-white font-medium"
          >
            Get Bundle
          </Button>
        </div>
      </div>
      
      {/* Section 4: Utility Actions - Clear/Cancel buttons in a subtle row */}
      <div className="px-4 pb-4">
        <div className="flex gap-3 pt-2">
          {selectedCount > 0 && (
            <Button
              onClick={onClearSelection}
              variant="ghost"
              className="flex-1 text-gray-600 hover:text-yutime-sage text-sm py-2 h-10"
            >
              Clear Selection
            </Button>
          )}
          <Button
            onClick={onCancel}
            variant="ghost"
            className="flex-1 text-gray-600 hover:text-yutime-sage text-sm py-2 h-10"
          >
            {isMobile ? 'Close' : 'Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BundleDrawerFooter;
