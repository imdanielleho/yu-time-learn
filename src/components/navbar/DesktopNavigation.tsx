
import React from 'react';
import { Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesktopNavigationProps {
  handleScrollTo: (id: string) => void;
  handleCartClick: () => void;
  itemCount: number;
  handleLoginSignupClick: () => void;
  isLoggedIn: boolean;
  handleResumeLearning: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  handleScrollTo,
  handleCartClick,
  itemCount,
  handleLoginSignupClick,
  isLoggedIn,
  handleResumeLearning,
}) => (
  <nav className="hidden md:flex items-center space-x-4">
    <button 
      onClick={() => handleScrollTo('courses')} 
      className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors"
    >
      Courses
    </button>
    <button 
      onClick={() => handleScrollTo('testimonials')} 
      className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors"
    >
      Testimonials
    </button>
    <button 
      onClick={() => handleScrollTo('faq')} 
      className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors mr-12"
    >
      FAQ
    </button>
    <div className="flex items-center space-x-3">
      {/* Shopping Cart Button */}
      <div className="relative">
        <Button
          onClick={handleCartClick}
          variant="ghost"
          className="p-2.5 bg-white text-yutime-navy hover:bg-gray-50 hover:text-yutime-blue transition-all relative"
        >
          <ShoppingCart size={18} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-yutime-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
      <button 
        onClick={handleLoginSignupClick}
        className="btn-primary"
      >
        Log In/Sign Up
      </button>
      {isLoggedIn && (
        <button 
          onClick={handleResumeLearning}
          className="bg-yutime-blue hover:bg-yutime-blue/90 text-white py-2.5 px-5 rounded-md font-medium text-lg transition-all shadow-sm hover:shadow flex items-center space-x-2"
        >
          <span>Resume Learning</span>
          <Play size={18} />
        </button>
      )}
    </div>
  </nav>
);

export default DesktopNavigation;
