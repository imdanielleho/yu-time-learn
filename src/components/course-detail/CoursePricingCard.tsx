
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Users, Clock } from "lucide-react";

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

      {/* Desktop card - Redesigned */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-6 border border-gray-100 backdrop-blur-sm">
        {/* Price section with subtle background */}
        <div className="bg-gradient-to-br from-[#2a9d8f]/5 to-[#2a9d8f]/10 rounded-xl p-6 mb-6 text-center border border-[#2a9d8f]/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#2a9d8f] fill-current" />
            <span className="text-sm font-medium text-[#2a9d8f]">Featured Course</span>
          </div>
          <div className="text-3xl font-bold mb-1 text-[#2a9d8f]">HKD 120</div>
          <div className="text-gray-600 text-sm">Lifetime access • No subscription</div>
        </div>

        {/* Course highlights */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-[#2a9d8f]" />
            <span>Self-paced learning</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Users className="w-4 h-4 text-[#2a9d8f]" />
            <span>Expert instructor support</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Star className="w-4 h-4 text-[#2a9d8f]" />
            <span>Certificate of completion</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col gap-3 mb-4">
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

        {/* Trust indicators */}
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">30-day money-back guarantee</div>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="text-xs text-gray-500 ml-1">4.9/5 (1,234 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
