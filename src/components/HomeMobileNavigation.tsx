
import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, BookOpen, LogIn } from 'lucide-react';
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

  const navigateToCourses = () => {
    window.location.href = '/courses';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
      <div className="flex items-center justify-around px-4 py-3">
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-xs"
          onClick={() => scrollToSection('hero')}
        >
          <Home size={20} />
          <span>Home</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-xs"
          onClick={navigateToCourses}
        >
          <BookOpen size={20} />
          <span>Courses</span>
        </Button>
        
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 text-xs"
          onClick={onLoginClick}
        >
          <LogIn size={20} />
          <span>Login</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeMobileNavigation;
