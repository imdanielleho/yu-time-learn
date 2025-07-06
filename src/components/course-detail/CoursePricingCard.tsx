
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
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="text-xl font-light" style={{ color: '#2a9d8f' }}>HKD 120</div>
            <div className="text-sm text-gray-500">One-time payment</div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onBuyNow}
              className="py-3 px-6 text-white rounded-xl font-medium text-sm shadow-md transition-all duration-300 min-h-[44px] hover:shadow-lg"
              style={{ backgroundColor: '#2a9d8f' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#238b7a'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a9d8f'}
              data-testid="buynow-btn"
            >
              Get Started
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] py-3 px-3 rounded-xl transition-all duration-300 border-2"
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
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop card */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-xl p-10 border-0">
        <div className="text-center mb-10">
          <div className="text-5xl font-light mb-3" style={{ color: '#2a9d8f' }}>HKD 120</div>
          <div className="text-gray-600 text-lg font-light">One-time investment in yourself</div>
        </div>
        
        <div className="space-y-4 mb-10">
          <div className="flex items-center space-x-3 text-gray-600">
            <Check size={20} style={{ color: '#2a9d8f' }} />
            <span className="font-light">Lifetime access to course materials</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Check size={20} style={{ color: '#2a9d8f' }} />
            <span className="font-light">Learn at your own pace</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Check size={20} style={{ color: '#2a9d8f' }} />
            <span className="font-light">Expert instructor support</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full">
          <Button
            onClick={onBuyNow}
            className="w-full py-6 px-8 text-white rounded-2xl font-medium text-lg shadow-lg transition-all duration-300 hover:shadow-xl min-h-[56px]"
            style={{ backgroundColor: '#2a9d8f' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#238b7a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a9d8f'}
            data-testid="buynow-btn"
          >
            Get Started Today
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="w-full flex items-center justify-center min-h-[56px] py-6 px-8 rounded-2xl transition-all duration-300 border-2 font-medium text-lg"
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
            <ShoppingCart size={22} className="mr-3" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
