
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  handleScrollTo: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  toggleMenu,
  handleScrollTo,
}) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="font-heading text-2xl font-bold text-yutime-navy">
            YŪ<span className="text-yutime-blue">TIME</span>
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            <X size={24} />
          </Button>
        </div>
        <nav className="flex flex-col p-6 space-y-6">
          <button
            onClick={() => handleScrollTo('our-learners')}
            className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
          >
            適合對象
          </button>
          <button
            onClick={() => handleScrollTo('how-it-works')}
            className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
          >
            如何開始
          </button>
          <button
            onClick={() => handleScrollTo('faq')}
            className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
          >
            常見問題
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
