
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Gift } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onOpenBundle: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart, onOpenBundle }: CoursePricingCardProps) => {
  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-yutime-sage mb-6 text-center">Single Course</h3>
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-yutime-sage mb-2">HKD 120</div>
          <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
        </div>
        {/* Responsive layout for CTAs */}
        <div className="flex flex-col gap-4 mb-8 sm:flex-row">
          <Button
            onClick={onBuyNow}
            className="w-full py-4 px-6 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-lg shadow-md transition-colors min-h-[44px]"
            data-testid="buynow-btn"
          >
            Buy This Course – HKD 120
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="w-full sm:w-auto flex-shrink-0 py-4 px-4 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-colors flex items-center justify-center min-h-[44px]"
            data-testid="addtocart-btn"
          >
            <ShoppingCart size={24} />
            <span className="ml-2 text-base">Add to Cart</span>
          </Button>
        </div>
        {/* Bundle CTA as prominent section */}
        <div className="mt-6">
          <div className="rounded-2xl bg-yutime-cream p-6 border border-yutime-coral/40 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="text-yutime-coral" size={24} />
              <span className="text-base font-semibold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-3 py-1 rounded-lg">
                Save with a bundle
              </span>
            </div>
            <div className="text-yutime-sage font-semibold text-base leading-relaxed text-center">
              Pick 3 for <span className="text-yutime-coral font-bold">HKD350</span> or 5 for <span className="text-yutime-coral font-bold">HKD500</span>
            </div>
            <Button
              onClick={onOpenBundle}
              variant="secondary"
              className="bg-yutime-coral/90 hover:bg-yutime-coral text-white font-medium py-4 px-6 rounded-xl text-base w-full min-h-[44px] transition-colors"
            >
              Choose Bundle &amp; Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
