
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            <div className="text-xs text-yutime-text/60">One-time payment</div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onBuyNow}
              className="bg-gradient-to-r from-[#2a9d8f] to-[#26a085] hover:from-[#228b7a] hover:to-[#1e7f6f] text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg min-h-[40px]"
              data-testid="buynow-btn"
            >
              Enroll Now
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

      {/* Desktop card */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
        {/* Course Badge */}
        <div className="flex justify-center mb-6">
          <Badge className="bg-gradient-to-r from-[#2a9d8f] to-[#26a085] text-white px-4 py-2 text-sm font-medium rounded-full">
            Single Course
          </Badge>
        </div>

        {/* Price Section with subtle background */}
        <div className="text-center mb-8 bg-gradient-to-br from-yutime-cream to-yutime-lavender/20 rounded-xl p-6 border border-yutime-lavender/30">
          <div className="text-4xl font-bold mb-2 text-[#2a9d8f]">HKD 120</div>
          <div className="text-yutime-text/70 text-lg">One-time investment</div>
        </div>

        {/* Course Highlights */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center text-yutime-text/80">
            <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
            <span>Lifetime access to course content</span>
          </div>
          <div className="flex items-center text-yutime-text/80">
            <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
            <span>Mobile and desktop friendly</span>
          </div>
          <div className="flex items-center text-yutime-text/80">
            <div className="w-2 h-2 bg-[#2a9d8f] rounded-full mr-3"></div>
            <span>Certificate upon completion</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
          <Button
            onClick={onBuyNow}
            className="bg-gradient-to-r from-[#2a9d8f] to-[#26a085] hover:from-[#228b7a] hover:to-[#1e7f6f] text-white flex-1 min-w-0 py-4 px-3 sm:px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-xl min-h-[48px] focus-visible:ring-2 focus-visible:ring-offset-2"
            data-testid="buynow-btn"
          >
            Enroll Now
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

        {/* Trust Indicators */}
        <div className="text-center space-y-2 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center text-yutime-text/60 text-sm">
            <Check size={16} className="mr-2 text-[#2a9d8f]" />
            30-day money-back guarantee
          </div>
          <div className="flex items-center justify-center text-yutime-text/60 text-sm">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            4.8/5 average rating
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
