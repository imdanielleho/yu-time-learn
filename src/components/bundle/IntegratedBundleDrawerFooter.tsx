
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { BUNDLE_TYPE } from "./types";
import { CartItem } from "@/contexts/CartContext";
import { courses as allCourses } from "@/data/courses";

interface IntegratedBundleDrawerFooterProps {
  selectedCount: number;
  cartItems: CartItem[];
  bundleDrawerMode: 'standalone' | 'add-to-cart';
  isMobile: boolean;
  onProceedToCheckout: () => void;
  onFiveCourseBundle: () => void;
  onClearSelection: () => void;
  onCancel: () => void;
  onAddSelectedToCart: () => void;
}

const IntegratedBundleDrawerFooter: React.FC<IntegratedBundleDrawerFooterProps> = ({
  selectedCount,
  cartItems,
  bundleDrawerMode,
  isMobile,
  onProceedToCheckout,
  onFiveCourseBundle,
  onClearSelection,
  onCancel,
  onAddSelectedToCart,
}) => {
  // Calculate pricing based on mode
  const currentCartTotal = cartItems.reduce((total, item) => total + item.price, 0);
  const selectedCoursesPrice = selectedCount * 120; // Regular price per course
  const newTotal = currentCartTotal + selectedCoursesPrice;

  // Check if current selection would make a bundle
  const totalCoursesAfterSelection = cartItems.length + selectedCount;
  const wouldMakeBundle = totalCoursesAfterSelection >= 3;
  const bundlePrice = totalCoursesAfterSelection >= 5 ? 500 : 350;
  const bundleSavings = totalCoursesAfterSelection >= 5 ? 100 : 10;

  if (bundleDrawerMode === 'add-to-cart') {
    return (
      <div className="border-t bg-white">
        {/* Cart Preview Section */}
        {selectedCount > 0 && (
          <div className="px-4 py-4 bg-yutime-cream/30 border-b border-yutime-sage/10">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-yutime-warmGray">Current cart:</span>
                <span className="text-yutime-sage font-medium">HKD {currentCartTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-yutime-warmGray">Selected courses:</span>
                <span className="text-yutime-sage font-medium">HKD {selectedCoursesPrice}</span>
              </div>
              <div className="border-t border-yutime-sage/20 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yutime-sage">New Total:</span>
                  <span className="text-xl font-bold text-yutime-sage">HKD {newTotal}</span>
                </div>
                {wouldMakeBundle && (
                  <p className="text-sm text-yutime-coral font-medium mt-1">
                    💡 Bundle eligible! Switch to bundle for HKD {bundlePrice} (save HKD {bundleSavings})
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Primary Action */}
        <div className="px-4 pt-4">
          <Button
            onClick={onAddSelectedToCart}
            disabled={selectedCount === 0}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {selectedCount === 0 
              ? 'Select Courses to Add' 
              : `Add ${selectedCount} Course${selectedCount > 1 ? 's' : ''} to Cart`
            }
          </Button>
        </div>
        
        {/* Bundle CTA */}
        {selectedCount > 0 && totalCoursesAfterSelection >= 3 && (
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between p-3 bg-yutime-cream/40 rounded-lg border border-yutime-coral/30">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-yutime-coral" />
                <span className="text-sm font-medium text-yutime-sage">
                  Create bundle instead? Save HKD {bundleSavings}!
                </span>
              </div>
              <Button
                onClick={totalCoursesAfterSelection >= 5 ? onFiveCourseBundle : onProceedToCheckout}
                size="sm"
                variant="outline"
                className="border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:!text-white font-medium"
              >
                Create Bundle
              </Button>
            </div>
          </div>
        )}
        
        {/* Utility Actions */}
        <div className="px-4 pb-4">
          <div className="flex gap-3 pt-2">
            {selectedCount > 0 && (
              <Button
                onClick={onClearSelection}
                variant="ghost"
                className="flex-1 text-gray-600 hover:bg-yutime-sage hover:text-white text-sm py-2 h-10 transition-all duration-200"
              >
                Clear Selection
              </Button>
            )}
            <Button
              onClick={onCancel}
              variant="ghost"
              className="flex-1 text-gray-600 hover:bg-yutime-sage hover:text-white text-sm py-2 h-10 transition-all duration-200"
            >
              {isMobile ? 'Close' : 'Cancel'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Original standalone bundle mode footer
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
              className="flex-1 text-gray-600 hover:bg-yutime-sage hover:text-white text-sm py-2 h-10 transition-all duration-200"
            >
              Clear Selection
            </Button>
          )}
          <Button
            onClick={onCancel}
            variant="ghost"
            className="flex-1 text-gray-600 hover:bg-yutime-sage hover:text-white text-sm py-2 h-10 transition-all duration-200"
          >
            {isMobile ? 'Close' : 'Cancel'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegratedBundleDrawerFooter;
