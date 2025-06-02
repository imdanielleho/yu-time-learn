
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CustomerServiceButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleWeChatClick = () => {
    // In a real app, this would open WeChat or show QR code
    alert('WeChat contact: your-wechat-id');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-3 bg-white rounded-lg shadow-lg p-3 min-w-[200px]">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-sm">Contact Us</span>
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
                <MessageCircle size={14} className="text-white" />
              </div>
              <span className="text-sm">WhatsApp</span>
            </button>
            <button
              onClick={handleWeChatClick}
              className="w-full flex items-center space-x-2 p-2 rounded-md hover:bg-green-50 transition-colors"
            >
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <MessageCircle size={14} className="text-white" />
              </div>
              <span className="text-sm">WeChat</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
          Need help? Click to contact me.
        </div>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-yutime-blue hover:bg-yutime-blue/90 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all flex-shrink-0"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default CustomerServiceButton;
