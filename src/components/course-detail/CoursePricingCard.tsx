
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Gift } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onOpenBundle: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart, onOpenBundle }: CoursePricingCardProps) => (
  <div className="sticky top-8">
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-yutime-sage mb-6 text-center">Single Course</h3>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-yutime-sage mb-2">HKD 120</div>
        <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button 
          onClick={onBuyNow}
          className="flex-1 min-w-0 py-4 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-lg shadow-md hover:shadow-lg transition-all"
          data-testid="buynow-btn"
        >
          Buy This Course – HKD 120
        </Button>
        <Button 
          onClick={onAddToCart}
          variant="outline"
          className="w-14 min-w-0 p-4 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-all flex-shrink-0"
          data-testid="addtocart-btn"
        >
          <ShoppingCart size={20} />
        </Button>
      </div>
      <div className="mt-6">
        <div className="rounded-2xl bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-orange-50 p-5 border border-yutime-coral/40 shadow-md flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="text-yutime-coral" size={20} />
            <span className="text-sm font-semibold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-2 py-0.5 rounded-lg">
              Save with a Bundle
            </span>
          </div>
          <div className="text-yutime-sage font-semibold text-lg leading-tight">
            Get <span className="text-yutime-coral">3 courses for HKD 350</span> or <span className="text-yutime-lavender">5 for HKD 500</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={onOpenBundle}
              variant="secondary"
              className="bg-yutime-coral/90 hover:bg-yutime-coral text-white font-medium py-2 rounded-xl"
            >
              Choose a Bundle &amp; Save
            </Button>
            <div className="text-xs text-yutime-warmGray text-center mt-1">
              <span className="font-bold">Most Popular</span> · Save up to HKD 100 vs individual prices!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CoursePricingCard;
