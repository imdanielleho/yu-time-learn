
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart }: CoursePricingCardProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 lg:sticky lg:top-8 lg:left-auto lg:right-auto lg:bottom-auto lg:z-auto">
      {/* Mobile compact bar */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-yutime-primary">HKD 120</div>
            <div className="text-xs text-yutime-text/60">One-time payment</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onBuyNow}
              className="py-2 px-4 text-white rounded-lg font-medium text-sm shadow-sm transition-colors min-h-[40px]"
              style={{ backgroundColor: '#2a9d8f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#238b7a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a9d8f'}
              data-testid="buynow-btn"
            >
              Buy Now
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="flex items-center justify-center min-h-[40px] min-w-[40px] py-2 px-2 rounded-lg transition-colors"
              style={{ borderColor: '#2a9d8f', color: '#2a9d8f' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a9d8f';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2a9d8f';
              }}
              data-testid="addtocart-btn"
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop card - keep existing design */}
      <div className="hidden lg:block bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-yutime-primary mb-6 text-center">Course Price</h3>
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-yutime-primary mb-2">HKD 120</div>
          <div className="text-yutime-text/70 text-lg">One-time investment in yourself</div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
          <Button
            onClick={onBuyNow}
            className="flex-1 min-w-0 py-4 px-3 sm:px-6 text-white rounded-xl font-medium text-base shadow-md transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ backgroundColor: '#2a9d8f', focusRingColor: '#2a9d8f' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#238b7a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a9d8f'}
            data-testid="buynow-btn"
          >
            Buy Now
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="flex items-center justify-center min-h-[48px] min-w-[44px] sm:min-w-[48px] max-w-full py-4 px-3 rounded-xl transition-colors flex-shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderColor: '#2a9d8f', color: '#2a9d8f', focusRingColor: '#2a9d8f' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2a9d8f';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#2a9d8f';
            }}
            data-testid="addtocart-btn"
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
