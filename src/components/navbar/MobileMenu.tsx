
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
          <img 
            src="/lovable-uploads/6c5f0bde-8821-4750-a50d-52c7232fe54c.png" 
            alt="YŪTIME" 
            className="h-8 w-auto"
          />
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
            onClick={() => handleScrollTo('testimonials')}
            className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleScrollTo('faq')}
            className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
          >
            FAQ
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
