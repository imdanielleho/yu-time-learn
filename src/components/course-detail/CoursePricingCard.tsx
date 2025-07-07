
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
            <div className="text-lg font-bold text-[#2a9d8f]">HKD 120</div>
            <div className="text-xs text-yutime-text/60">One-time payment</div>
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

      {/* Desktop card - redesigned */}
      <div className="hidden lg:block bg-gradient-to-br from-white to-yutime-neutral/30 rounded-2xl shadow-wellness p-8 border border-yutime-neutral/40 backdrop-blur-sm">
        {/* Price section with accent background */}
        <div className="bg-gradient-to-r from-yutime-secondary/5 to-yutime-accent/5 rounded-xl p-6 mb-8 text-center border border-yutime-secondary/10">
          <div className="text-4xl font-bold mb-2 text-[#2a9d8f]">HKD 120</div>
          <div className="text-yutime-text/70 text-lg">One-time investment in yourself</div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
          <Button
            onClick={onBuyNow}
            className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white flex-1 min-w-0 py-4 px-3 sm:px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg min-h-[48px] focus-visible:ring-2 focus-visible:ring-offset-2"
            data-testid="buynow-btn"
          >
            Buy Now
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="border-2 border-[#2a9d8f] text-[#2a9d8f] bg-transparent hover:bg-[#2a9d8f] hover:text-white flex items-center justify-center min-h-[48px] min-w-[44px] sm:min-w-[48px] max-w-full py-4 px-3 rounded-xl transition-all duration-300 transform hover:scale-[1.01] flex-shrink-0 focus-visible:ring-2 focus-visible:ring-offset-2"
            data-testid="addtocart-btn"
          >
            <ShoppingCart size={20} />
          </Button>
        </div>
        
        {/* Additional features with subtle accents */}
        <div className="space-y-3 text-sm text-yutime-text/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yutime-secondary rounded-full"></div>
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yutime-accent rounded-full"></div>
            <span>Certificate of completion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yutime-sunshine rounded-full"></div>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
