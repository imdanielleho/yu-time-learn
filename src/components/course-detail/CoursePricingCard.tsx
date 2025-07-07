
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
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-[#2a9d8f]">HKD 120</div>
            <div className="text-xs text-gray-500">One-time payment</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onBuyNow}
              className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md min-h-[40px]"
              data-testid="buynow-btn"
            >
              Buy Now
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="border-2 border-[#2a9d8f] text-[#2a9d8f] bg-transparent hover:bg-[#2a9d8f] hover:text-white flex items-center justify-center min-h-[40px] min-w-[40px] py-2 px-2 rounded-lg transition-all duration-300 transform hover:scale-[1.01]"
              data-testid="addtocart-btn"
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop card - Simplified */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-sm">
        {/* Price section - simplified */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-center border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-[#2a9d8f]">Single Course</span>
          </div>
          <div className="text-3xl font-bold mb-1 text-[#2a9d8f]">HKD 120</div>
          <div className="text-gray-600 text-sm">Lifetime access • No subscription</div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={onBuyNow}
            className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white w-full py-4 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-xl min-h-[52px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a9d8f]"
            data-testid="buynow-btn"
          >
            Enroll Now
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="border-2 border-[#2a9d8f] text-[#2a9d8f] bg-transparent hover:bg-[#2a9d8f] hover:text-white w-full py-4 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.01] min-h-[52px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2a9d8f] flex items-center justify-center gap-2"
            data-testid="addtocart-btn"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
