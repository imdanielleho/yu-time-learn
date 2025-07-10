import React from 'react';
import { Play, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProfileDropdown from './ProfileDropdown';
interface DesktopNavigationProps {
  handleScrollTo: (id: string) => void;
  handleCartClick: () => void;
  itemCount: number;
  handleLoginSignupClick: () => void;
  isLoggedIn: boolean;
  handleResumeLearning: () => void;
  currentPath: string;
  hasPurchasedCourses: boolean;
}
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  handleScrollTo,
  handleCartClick,
  itemCount,
  handleLoginSignupClick,
  isLoggedIn,
  handleResumeLearning,
  currentPath,
  hasPurchasedCourses
}) => <nav className="hidden md:flex items-center justify-between flex-1 ml-8">
    {/* Informational Links - Left Side */}
    <div className="flex items-center space-x-6">
      <button onClick={() => handleScrollTo('courses')} className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">課程</button>
      <button onClick={() => handleScrollTo('testimonials')} className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">成長故事</button>
      <button onClick={() => handleScrollTo('faq')} className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">常見問題</button>
    </div>

    {/* Action Links - Right Side */}
    <div className="flex items-center space-x-3 h-10">
      {isLoggedIn && hasPurchasedCourses && <button onClick={handleResumeLearning} className="bg-[#264653] hover:bg-[#1e3a42] text-white h-10 px-4 py-2 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md flex items-center">
          <Play size={16} className="mr-2" />
          <span>繼續學習</span>
        </button>}
      
      {/* Shopping Cart Button */}
      <div className="relative">
        <Button onClick={handleCartClick} variant="ghost" className="h-10 w-10 p-2 bg-white text-yutime-navy hover:bg-gray-50 hover:text-yutime-blue transition-all relative">
          <ShoppingCart size={18} />
          {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-yutime-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>}
        </Button>
      </div>
      
      {/* Login/Profile Section */}
      {!isLoggedIn ? <button onClick={handleLoginSignupClick} className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white h-10 px-6 py-2 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md flex items-center justify-center">登入/註冊</button> : <ProfileDropdown enableHover />}
    </div>
  </nav>;
export default DesktopNavigation;