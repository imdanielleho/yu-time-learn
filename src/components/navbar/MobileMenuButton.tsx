
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, toggleMenu }) => (
  <div className="md:hidden">
    <div className="flex flex-col items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="h-8 w-8"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      <span className="text-xs text-gray-600">Menu</span>
    </div>
  </div>
);

export default MobileMenuButton;
