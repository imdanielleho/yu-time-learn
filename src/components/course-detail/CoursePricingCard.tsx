
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Gift } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onOpenBundle: () => void;
}

const CoursePricingCard = ({
  onBuyNow,
  onAddToCart,
  onOpenBundle,
}: CoursePricingCardProps) => (
  <div className="sticky top-8">
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-yutime-sage mb-6 text-center">Single Course</h3>
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-yutime-sage mb-2">HKD 120</div>
        <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
      </div>
      {/* Responsive layout for CTAs */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row">
        <Button
          onClick={onBuyNow}
          className="w-full py-4 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-base sm:text-lg shadow-md hover:shadow-lg transition-all"
          data-testid="buynow-btn"
        >
          <span className="block sm:hidden">Buy Now – HKD 120</span>
          <span className="hidden sm:block">Buy This Course – HKD 120</span>
        </Button>
        <Button
          onClick={onAddToCart}
          variant="outline"
          className="w-full sm:w-14 min-w-0 p-4 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-all flex-shrink-0"
          data-testid="addtocart-btn"
        >
          <ShoppingCart size={20} />
          <span className="ml-2 text-base sm:hidden">Add to Cart</span>
        </Button>
      </div>
      {/* Enhanced bundle CTA */}
      <div className="mt-8">
        <div className="rounded-2xl bg-yutime-cream border border-yutime-coral/40 flex flex-col items-center gap-0 shadow-none px-6 py-6 relative overflow-hidden">
          <div className="flex flex-col items-center w-full mb-2">
            <div className="flex items-center justify-center mb-3">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-yutime-coral/10 mr-2">
                <Gift className="text-yutime-coral" size={28} />
              </span>
              <span className="text-base sm:text-lg font-extrabold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-3 py-1 rounded-lg">
                Save with a Bundle
              </span>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-semibold text-yutime-sage leading-tight mb-1">
                3 Courses for <span className="text-yutime-coral font-bold">HKD 350</span>
              </div>
              <div className="text-green-700 font-semibold text-base mb-3">
                Save HKD 10
              </div>
            </div>
          </div>
          <Button
            onClick={onOpenBundle}
            className="w-full bg-yutime-coral hover:bg-yutime-coral/90 text-white font-semibold py-3 mt-0 rounded-xl text-base sm:text-lg shadow-md hover:shadow-lg transition-all"
          >
            Choose Bundle &amp; Save
          </Button>
          <div className="w-full mt-5 flex flex-col gap-3">
            <div className="text-center text-yutime-warmGray text-sm font-medium">
              Or enjoy <span className="text-yutime-coral font-semibold">All Courses</span> at a further discounted price!
            </div>
            {/* Example extra bundle, can be easily extended if needed */}
            <Button
              onClick={onOpenBundle}
              variant="outline"
              className="w-full border-yutime-coral text-yutime-coral font-semibold py-3 rounded-xl text-base sm:text-lg hover:bg-yutime-coral/90 hover:text-white transition-all"
            >
              View Full Bundle Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CoursePricingCard;

