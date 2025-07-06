
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart }: CoursePricingCardProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 lg:sticky lg:top-8 lg:left-auto lg:right-auto lg:bottom-auto lg:z-auto">
      {/* Mobile compact bar */}
      <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="text-2xl font-light text-gray-900">HKD 120</div>
            <div className="text-sm text-gray-500">One-time payment</div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onBuyNow}
              className="py-3 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-sm transition-all duration-300 min-h-[44px]"
              data-testid="buynow-btn"
            >
              Get Started
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] py-3 px-3 rounded-full transition-all duration-300 border border-gray-300 text-gray-700 hover:bg-gray-50"
              data-testid="addtocart-btn"
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop card */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-4xl font-light text-gray-900 mb-2">HKD 120</div>
          <div className="text-gray-600 font-light">One-time investment in yourself</div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start space-x-3 text-gray-700">
            <Check size={20} className="text-gray-900 mt-0.5 flex-shrink-0" />
            <span className="font-light leading-relaxed">Lifetime access to course materials</span>
          </div>
          <div className="flex items-start space-x-3 text-gray-700">
            <Check size={20} className="text-gray-900 mt-0.5 flex-shrink-0" />
            <span className="font-light leading-relaxed">Learn at your own pace</span>
          </div>
          <div className="flex items-start space-x-3 text-gray-700">
            <Check size={20} className="text-gray-900 mt-0.5 flex-shrink-0" />
            <span className="font-light leading-relaxed">Expert instructor support</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          <Button
            onClick={onBuyNow}
            className="w-full py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium text-base transition-all duration-300 min-h-[52px]"
            data-testid="buynow-btn"
          >
            Get Started Today
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="w-full flex items-center justify-center min-h-[52px] py-4 px-6 rounded-full transition-all duration-300 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-base"
            data-testid="addtocart-btn"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
