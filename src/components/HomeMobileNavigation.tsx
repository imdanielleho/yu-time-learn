
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Book, LogIn, Play } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import MobileMoreMenu from '@/components/navbar/MobileMoreMenu';

interface HomeMobileNavigationProps {
  onLoginClick: () => void;
  onResumeLearningClick?: () => void;
}

const HomeMobileNavigation = ({ onLoginClick, onResumeLearningClick }: HomeMobileNavigationProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { openCart, getItemCount } = useCart();
  const { isLoggedIn } = useAuth();

  if (!isMobile) return null;

  const isOnCourseDetailPage = location.pathname.startsWith('/courses/');

  const handleHomeClick = () => {
    if (isOnCourseDetailPage) {
      navigate('/');
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      const element = document.getElementById('hero');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCoursesClick = () => {
    if (isOnCourseDetailPage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('courses');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('courses');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCartClick = () => {
    openCart();
  };

  const itemCount = getItemCount();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className={`h-16 ${isLoggedIn ? 'grid grid-cols-5' : 'grid grid-cols-4'}`}>
        <button
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={handleHomeClick}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={handleCoursesClick}
        >
          <Book className="h-5 w-5" />
          <span className="text-xs font-medium">Courses</span>
        </button>

        {isLoggedIn && (
          <button
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
            onClick={onResumeLearningClick}
          >
            <Play className="h-5 w-5" />
            <span className="text-xs font-medium">Resume</span>
          </button>
        )}

        <button
          className="relative flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={handleCartClick}
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 right-3 bg-yutime-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center px-1 leading-none">
              {itemCount}
            </span>
          )}
          <span className="text-xs font-medium">Cart</span>
        </button>

        {!isLoggedIn ? (
          <button
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
            onClick={onLoginClick}
          >
            <LogIn className="h-5 w-5" />
            <span className="text-xs font-medium">Login</span>
          </button>
        ) : (
          <MobileMoreMenu />
        )}
      </div>
    </div>
  );
};

export default HomeMobileNavigation;
