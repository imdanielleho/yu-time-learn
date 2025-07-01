
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Settings } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    toggleMenu();
    navigate('/settings');
  };

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
          {isLoggedIn && user && (
            <>
              <div className="pb-4 border-b border-gray-200">
                <p className="text-lg font-medium text-yutime-navy">
                  Hello, {user.name}
                </p>
                <p className="text-sm text-yutime-warmGray">{user.email}</p>
              </div>
              <button
                onClick={handleSettingsClick}
                className="flex items-center text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
              >
                <Settings className="mr-3" size={20} />
                Settings
              </button>
            </>
          )}
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
