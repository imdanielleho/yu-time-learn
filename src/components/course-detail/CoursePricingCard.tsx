
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart }: CoursePricingCardProps) => {
  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-yutime-sage mb-6 text-center">Course Price</h3>
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-yutime-sage mb-2">HKD 120</div>
          <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
          <Button
            onClick={onBuyNow}
            className="flex-1 min-w-0 py-4 px-3 sm:px-6 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-base shadow-md transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-yutime-coral/50"
            data-testid="buynow-btn"
          >
            Buy Now
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="flex items-center justify-center min-h-[48px] min-w-[44px] sm:min-w-[120px] max-w-full py-4 px-0 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-colors flex-shrink focus-visible:ring-2 focus-visible:ring-yutime-coral/50"
            data-testid="addtocart-btn"
            style={{ flexBasis: 0 }}
          >
            <ShoppingCart size={20} />
            <span className="ml-2 text-sm font-semibold truncate">Add to Cart</span>
          </Button>
        </div>

        <div className="text-center text-sm text-yutime-warmGray">
          30-day money-back guarantee
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
