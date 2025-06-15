
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
}: CoursePricingCardProps) => {
  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-yutime-sage mb-6 text-center">
          Single Course
        </h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-yutime-sage mb-2">
            HKD 120
          </div>
          <div className="text-yutime-warmGray text-lg">
            One-time investment in yourself
          </div>
        </div>
        {/* Responsive layout for CTAs */}
        <div className="flex flex-col gap-3 mb-7 sm:flex-row">
          <Button
            onClick={onBuyNow}
            className="w-full min-h-[44px] py-4 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-semibold text-lg sm:text-xl shadow-none"
            data-testid="buynow-btn"
            style={{ fontSize: "18px" }}
          >
            <span className="block sm:hidden">Buy Now – HKD 120</span>
            <span className="hidden sm:block">Buy This Course – HKD 120</span>
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="w-full sm:w-auto min-h-[44px] min-w-[44px] p-0 rounded-xl border-yutime-coral text-yutime-coral font-semibold text-lg flex items-center justify-center"
            style={{ fontSize: "18px" }}
            data-testid="addtocart-btn"
            aria-label="Add to Cart"
          >
            <span className="flex items-center px-4 py-2">
              <ShoppingCart size={24} className="mr-3" />
              <span className="text-lg">Add to Cart</span>
            </span>
          </Button>
        </div>
        {/* Bundle CTA as prominent section */}
        <div className="mt-6">
          <div className="rounded-2xl bg-yutime-cream p-5 border border-yutime-coral/40 flex flex-col items-center gap-3 shadow-none">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="text-yutime-coral" size={24} />
              <span className="text-sm font-bold text-yutime-coral uppercase tracking-wide bg-yutime-coral/10 px-4 py-1 rounded-lg" style={{ fontSize: "16px" }}>
                Save with a bundle
              </span>
            </div>
            <div className="text-yutime-sage font-semibold text-lg leading-tight text-center">
              3 or 5 Courses for{" "}
              <span className="text-yutime-coral font-bold">HKD 350–500</span>
              <br />
              <span className="text-yutime-sage text-base">
                Save more with a bigger bundle
              </span>
            </div>
            <Button
              onClick={onOpenBundle}
              variant="secondary"
              className="bg-yutime-coral/90 hover:bg-yutime-coral text-white font-semibold py-4 rounded-xl text-lg w-full min-h-[44px]"
              style={{ fontSize: "18px" }}
              aria-label="Choose Bundle & Save"
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
