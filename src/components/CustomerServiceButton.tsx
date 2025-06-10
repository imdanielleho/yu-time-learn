
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const CustomerServiceButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  // TODO: Replace with actual authentication state
  const isLoggedIn = false; // This should come from your auth context/state

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleWeChatClick = () => {
    // In a real app, this would open WeChat or show QR code
    alert('WeChat contact: your-wechat-id');
  };

  return (
    <div className={`fixed z-50 ${
      isMobile 
        ? isLoggedIn 
          ? 'bottom-24 right-6' // Above mobile navigation when logged in
          : 'bottom-20 right-6'  // Normal position when not logged in
        : 'bottom-6 right-6'     // Normal position for desktop
    }`}>
      {isExpanded && (
        <div className="mb-3 bg-white rounded-lg shadow-lg p-3 min-w-[200px]">
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
              className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-green-50 transition-colors"
            >
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <HelpCircle size={14} className="text-white" />
              </div>
              <span className="text-sm">WhatsApp</span>
            </button>
            <button
              onClick={handleWeChatClick}
              className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-green-50 transition-colors"
            >
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <HelpCircle size={14} className="text-white" />
              </div>
              <span className="text-sm">WeChat</span>
            </button>
          </div>
        </div>
      )}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-yutime-blue hover:bg-yutime-blue/90 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all flex-shrink-0"
      >
        <HelpCircle size={24} />
      </Button>
    </div>
  );
};

export default CustomerServiceButton;
