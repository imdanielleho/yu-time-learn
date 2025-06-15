
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Gift, HelpCircle, X } from "lucide-react";

interface CoursePricingCardProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onOpenBundle: () => void;
}

const CoursePricingCard = ({ onBuyNow, onAddToCart, onOpenBundle }: CoursePricingCardProps) => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleWeChatClick = () => {
    // In a real app, this would open WeChat or show QR code
    alert('WeChat contact: your-wechat-id');
  };

  return (
    <div className="sticky top-8 max-[991px]:fixed max-[991px]:bottom-0 max-[991px]:left-0 max-[991px]:right-0 max-[991px]:top-auto max-[991px]:z-40">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 max-[991px]:rounded-t-xl max-[991px]:rounded-b-none max-[991px]:p-4 max-[991px]:shadow-2xl max-[991px]:border-t max-[991px]:border-x-0 max-[991px]:border-b-0">
        {/* Chat popup - appears above the card */}
        {isChatExpanded && (
          <div className="absolute bottom-full right-4 mb-3 bg-white rounded-xl shadow-lg p-4 min-w-[180px] border border-gray-200 z-50">
            <div className="flex justify-end items-center mb-3">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsChatExpanded(false)}
              >
                <X size={14} />
              </Button>
            </div>
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">W</span>
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>
              <button
                onClick={handleWeChatClick}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">微</span>
                </div>
                <span className="text-sm font-medium">WeChat</span>
              </button>
            </div>
          </div>
        )}

        {/* Desktop version - full content */}
        <div className="max-[991px]:hidden">
          <h3 className="text-2xl font-bold text-yutime-sage mb-6 text-center">Single Course</h3>
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-yutime-sage mb-2">HKD 120</div>
            <div className="text-yutime-warmGray text-lg">One-time investment in yourself</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full">
            <Button
              onClick={onBuyNow}
              className="flex-1 min-w-0 py-4 px-6 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-xl font-medium text-base shadow-md transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-yutime-coral/50"
              data-testid="buynow-btn"
            >
              Buy This Course – HKD 120
            </Button>
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="flex items-center justify-center min-h-[48px] min-w-[44px] sm:min-w-[120px] max-w-full py-4 px-0 rounded-xl border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-colors flex-shrink focus-visible:ring-2 focus-visible:ring-yutime-coral/50"
              data-testid="addtocart-btn"
              style={{ flexBasis: 0 }}
            >
              <ShoppingCart size={20} />
              <span className="ml-2 text-sm font-semibold truncate">Cart</span>
            </Button>
          </div>
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
          
          {/* Desktop chat button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setIsChatExpanded(!isChatExpanded)}
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <HelpCircle size={16} />
              <span className="text-sm">Need Help?</span>
            </Button>
          </div>
        </div>

        {/* Mobile version - compact sticky bottom */}
        <div className="min-[992px]:hidden">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="text-lg font-bold text-yutime-sage">HKD 120</div>
              <div className="text-xs text-yutime-warmGray">Single Course</div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={onAddToCart}
                variant="outline"
                size="sm"
                className="flex items-center justify-center p-2 rounded-lg border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-colors relative z-10"
                data-testid="addtocart-btn-mobile"
              >
                <ShoppingCart size={16} />
              </Button>
              <Button
                onClick={onBuyNow}
                size="sm"
                className="px-4 py-2 text-white bg-yutime-coral hover:bg-yutime-coral/90 rounded-lg font-medium text-sm transition-colors relative z-10"
                data-testid="buynow-btn-mobile"
              >
                Buy Now
              </Button>
              <Button
                onClick={onOpenBundle}
                variant="outline"
                size="sm"
                className="px-3 py-2 rounded-lg border-yutime-coral text-yutime-coral hover:bg-yutime-coral hover:text-white transition-colors text-xs font-medium relative z-10 touch-manipulation"
              >
                Bundle
              </Button>
            </div>
          </div>
          
          {/* Mobile chat button row */}
          <div className="flex justify-center pt-2 border-t border-gray-100">
            <Button
              onClick={() => setIsChatExpanded(!isChatExpanded)}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors relative z-10"
            >
              <HelpCircle size={16} />
              <span className="text-sm">Need Help?</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingCard;
