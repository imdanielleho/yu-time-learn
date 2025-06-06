
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, Book, LogIn } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HomeMobileNavigationProps {
  onLoginClick: () => void;
}

const HomeMobileNavigation = ({ onLoginClick }: HomeMobileNavigationProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="grid grid-cols-3 h-16">
        <button
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={() => scrollToSection('hero')}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={() => scrollToSection('courses')}
        >
          <Book className="h-5 w-5" />
          <span className="text-xs font-medium">Courses</span>
        </button>
        
        <button
          className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-yutime-blue transition-colors"
          onClick={onLoginClick}
        >
          <LogIn className="h-5 w-5" />
          <span className="text-xs font-medium">Login</span>
        </button>
      </div>
    </div>
  );
};

export default HomeMobileNavigation;
