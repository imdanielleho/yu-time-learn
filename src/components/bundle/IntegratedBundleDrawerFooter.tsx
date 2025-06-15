
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingCart } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";

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
  const cartCount = cartItems.length;
  const newlySelectedCount = selectedCount - cartCount;
  
  // Bundle pricing logic
  const getBundlePrice = (count: number) => {
    if (count >= 5) return 500;
    if (count >= 3) return 350;
    return count * 120;
  };

  const currentPrice = getBundlePrice(selectedCount);
  const individualPrice = selectedCount * 120;
  const savings = individualPrice - currentPrice;

  const canProceedToCheckout = selectedCount >= 3;
  const isOptimalBundle = selectedCount === 3 || selectedCount === 5;

  return (
    <div className="border-t bg-white">
      {/* Bundle Summary */}
      {selectedCount > 0 && (
        <div className="px-4 py-4 bg-yutime-cream/30 border-b border-yutime-sage/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-yutime-sage">
                {selectedCount} Course{selectedCount > 1 ? 's' : ''} Selected
              </p>
              <p className="text-sm text-yutime-warmGray">
                {selectedCount >= 5 ? '5-Course Bundle' : 
                 selectedCount >= 3 ? '3-Course Bundle' : 
                 'Individual Pricing'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-yutime-sage">HKD {currentPrice}</p>
              {savings > 0 && (
                <p className="text-sm font-medium text-yutime-coral">Save HKD {savings}</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Primary Actions */}
      <div className="px-4 pt-4">
        {bundleDrawerMode === 'add-to-cart' ? (
          <Button
            onClick={onAddSelectedToCart}
            disabled={newlySelectedCount === 0}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ShoppingCart className="mr-2" size={20} />
            {newlySelectedCount === 0 
              ? 'No new courses selected' 
              : `Add ${newlySelectedCount} Course${newlySelectedCount > 1 ? 's' : ''} to Cart`
            }
          </Button>
        ) : (
          <Button
            onClick={onProceedToCheckout}
            disabled={!canProceedToCheckout}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white py-4 text-lg font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {canProceedToCheckout 
              ? 'Proceed to Checkout' 
              : `Select ${3 - selectedCount} More Course${3 - selectedCount > 1 ? 's' : ''} (Min 3 for Bundle)`
            }
          </Button>
        )}
      </div>
      
      {/* 5-Course Bundle Promotion */}
      {selectedCount < 5 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between p-3 bg-yutime-cream/40 rounded-lg border border-yutime-coral/30">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-yutime-coral" />
              <span className="text-sm font-medium text-yutime-sage">
                Get all 5 courses for HKD 500 — save HKD 100!
              </span>
            </div>
            <Button
              onClick={onFiveCourseBundle}
              size="sm"
              variant="outline"
              className="border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:!text-white font-medium"
            >
              Get All 5
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
};

export default IntegratedBundleDrawerFooter;
