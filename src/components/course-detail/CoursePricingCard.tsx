
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
      {/* Minimal bundle CTA */}
      <div className="mt-6">
        <div className="rounded-2xl bg-yutime-cream p-4 border border-yutime-coral/40 flex flex-col items-center gap-3 shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="text-yutime-coral" size={20} />
            <span className="text-sm font-semibold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-2 py-0.5 rounded-lg">
              Save with a bundle
            </span>
          </div>
          <div className="text-yutime-sage font-semibold text-base leading-tight text-center">
            3 Courses for <span className="text-yutime-coral font-bold">HKD 350</span> <br />
            <span className="text-green-700 text-sm">Save HKD 10</span>
          </div>
          <Button
            onClick={onOpenBundle}
            variant="secondary"
            className="bg-yutime-coral/90 hover:bg-yutime-coral text-white font-medium py-2 rounded-xl text-base w-full"
          >
            Choose Bundle &amp; Save
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default CoursePricingCard;
