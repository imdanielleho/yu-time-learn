
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';

const CustomerServiceButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false; // This should come from your auth context/state

  // Check if we're on a course detail page
  const isCourseDetailPage = location.pathname.startsWith('/courses/');

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleWeChatClick = () => {
    // In a real app, this would open WeChat or show QR code
    alert('WeChat contact: your-wechat-id');
  };

  // Calculate bottom position based on context
  const getBottomPosition = () => {
    if (isMobile) {
      if (isCourseDetailPage) {
        // On course detail pages, position above the sticky pricing card
        return isLoggedIn ? 'bottom-32' : 'bottom-28';
      }
      // Normal mobile position
      return isLoggedIn ? 'bottom-24' : 'bottom-20';
    }
    // Desktop position
    return 'bottom-6';
  };

  return (
    <div className={`fixed z-50 right-6 ${getBottomPosition()}`}>
      {isExpanded && (
        <div className="mb-3 bg-white rounded-xl shadow-lg p-4 min-w-[180px] border border-gray-200">
          <div className="flex justify-end items-center mb-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsExpanded(false)}
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
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-yutime-blue hover:bg-yutime-blue/90 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all flex-shrink-0 p-0"
      >
        <HelpCircle size={24} />
      </Button>
    </div>
  );
};

export default CustomerServiceButton;
