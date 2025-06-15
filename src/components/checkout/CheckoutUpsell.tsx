
import React from "react";
import { Button } from "@/components/ui/button";

interface CheckoutUpsellProps {
  courseTitle: string;
  onBuildBundle: () => void;
  onContinue: () => void;
}

const CheckoutUpsell = ({
  courseTitle,
  onBuildBundle,
  onContinue,
}: CheckoutUpsellProps) => (
  <div className="w-full flex flex-col items-center max-w-lg mx-auto">
    <div className="relative w-full bg-gradient-to-br from-yutime-softWhite via-white to-yutime-cream rounded-3xl border border-yutime-sand_dark/30 p-8 shadow-card hover-lift transition-all duration-500 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yutime-coral/10 to-yutime-sunshine/10 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yutime-sage/10 to-yutime-lavender/10 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yutime-coral to-yutime-sunshine text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-warm">
          <span className="text-lg">🎯</span>
          <span>Bundle Offer</span>
        </div>

        {/* Main heading */}
        <h3 className="text-2xl font-bold text-yutime-sage mb-3 leading-tight">
          Complete Your Learning Journey
        </h3>

        {/* Description */}
        <p className="text-yutime-warmGray mb-6 leading-relaxed">
          You're about to purchase <span className="font-semibold text-yutime-sage">"{courseTitle}"</span>. 
          Why not maximize your learning with our complete bundle?
        </p>

        {/* Pricing section */}
        <div className="bg-gradient-to-r from-yutime-sage/5 to-yutime-coral/5 rounded-2xl p-6 mb-8 border border-yutime-sage/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-yutime-sage mb-2">
              3 Courses for HKD 350
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <span className="text-yutime-warmGray line-through">HKD 360</span>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Save HKD 10
              </div>
            </div>
            <div className="text-sm text-yutime-warmGray mt-2">
              That's only HKD 117 per course!
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-yutime-sage">
            <div className="w-2 h-2 bg-yutime-coral rounded-full"></div>
            <span>Complete curriculum</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-yutime-sage">
            <div className="w-2 h-2 bg-yutime-sunshine rounded-full"></div>
            <span>Lifetime access</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-yutime-sage">
            <div className="w-2 h-2 bg-yutime-lavender rounded-full"></div>
            <span>Expert support</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-yutime-sage">
            <div className="w-2 h-2 bg-yutime-sage rounded-full"></div>
            <span>Money-back guarantee</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={onBuildBundle}
            className="w-full bg-gradient-to-r from-yutime-sage to-yutime-sage/90 hover:from-yutime-sage/90 hover:to-yutime-sage text-white py-4 text-lg font-semibold rounded-2xl shadow-soft transition-all duration-300 hover:shadow-card hover:scale-[1.02] transform"
          >
            <span className="mr-2">🚀</span>
            Build My Bundle
          </Button>
          <Button
            onClick={onContinue}
            variant="ghost"
            className="w-full text-yutime-warmGray hover:text-yutime-sage hover:bg-yutime-sage/5 py-3 text-base transition-all duration-200"
          >
            Continue with Single Course
          </Button>
        </div>

        {/* Trust indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-yutime-warmGray/80">
          <span>🔒</span>
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutUpsell;
