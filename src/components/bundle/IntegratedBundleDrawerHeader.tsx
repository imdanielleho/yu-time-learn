
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, ShoppingCart, Plus } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";

interface IntegratedBundleDrawerHeaderProps {
  selectedCount: number;
  cartItems: CartItem[];
  bundleDrawerMode: 'standalone' | 'add-to-cart';
  isMobile: boolean;
  onCancel: () => void;
  onReturnToCart: () => void;
}

const IntegratedBundleDrawerHeader: React.FC<IntegratedBundleDrawerHeaderProps> = ({
  selectedCount,
  cartItems,
  bundleDrawerMode,
  isMobile,
  onCancel,
  onReturnToCart,
}) => {
  const cartCount = cartItems.length;
  const newlySelectedCount = selectedCount - cartCount;
  const totalSelected = selectedCount;

  // Calculate bundle pricing
  const getBundlePrice = (count: number) => {
    if (count >= 5) return 500;
    if (count >= 3) return 350;
    return count * 120; // Individual pricing
  };

  const currentPrice = getBundlePrice(totalSelected);
  const individualPrice = totalSelected * 120;
  const savings = individualPrice - currentPrice;

  const getBundleStatus = () => {
    if (totalSelected >= 5) return "5-Course Bundle";
    if (totalSelected >= 3) return "3-Course Bundle";
    return "Individual Courses";
  };

  const getRecommendation = () => {
    if (totalSelected === 4) return "Add 1 more course to unlock 5-course bundle and save HKD 100!";
    if (totalSelected === 2) return "Add 1 more course to unlock 3-course bundle and save HKD 10!";
    if (totalSelected === 1) return "Add 2 more courses to unlock 3-course bundle and save HKD 10!";
    return null;
  };

  return (
    <div className="border-b p-3">
      <div className="flex items-center justify-between mb-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={bundleDrawerMode === 'add-to-cart' ? onReturnToCart : onCancel}
            className="mr-2"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-yutime-sage mb-0.5">
            {bundleDrawerMode === 'add-to-cart' ? 'Add to Cart' : 'Build Your Bundle'}
          </h2>
          <p className="text-sm text-yutime-warmGray">
            3 courses for HKD 350 • 5 courses for HKD 500
          </p>
        </div>
      </div>

      {/* Selection Status */}
      <div className="mb-3">
        {bundleDrawerMode === 'add-to-cart' && cartCount > 0 ? (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-sm">
              <ShoppingCart size={14} className="text-yutime-coral" />
              <span className="text-yutime-sage font-medium">{cartCount} in cart</span>
            </div>
            {newlySelectedCount > 0 && (
              <>
                <Plus size={12} className="text-yutime-warmGray" />
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle size={14} className="text-yutime-coral" />
                  <span className="text-yutime-sage font-medium">{newlySelectedCount} selected</span>
                </div>
              </>
            )}
            <span className="text-sm text-yutime-warmGray">= {totalSelected} total</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-yutime-coral" />
            <span className="text-base font-semibold text-yutime-sage">
              {totalSelected} course{totalSelected !== 1 ? 's' : ''} selected
            </span>
          </div>
        )}

        {/* Pricing Display */}
        <div className="bg-yutime-cream/40 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-yutime-sage">{getBundleStatus()}</span>
            <span className="text-lg font-bold text-yutime-sage">HKD {currentPrice}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-yutime-warmGray">vs individual pricing</span>
              <span className="text-sm font-medium text-yutime-coral">Save HKD {savings}</span>
            </div>
          )}
        </div>

        {/* Recommendation */}
        {getRecommendation() && (
          <div className="bg-yutime-coral/10 border border-yutime-coral/20 rounded-lg p-2">
            <p className="text-sm font-medium text-yutime-sage text-center">
              {getRecommendation()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntegratedBundleDrawerHeader;
