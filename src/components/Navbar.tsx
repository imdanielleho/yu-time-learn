
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold text-yutime-navy">YŪ<span className="text-yutime-blue">TIME</span></span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#categories" className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">
            Categories
          </Link>
          <Link to="/#courses" className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">
            Courses
          </Link>
          <Link to="/#testimonials" className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors">
            Testimonials
          </Link>
          <Link to="/join" className="btn-primary">
            Join Now
          </Link>
        </nav>
        
        {/* Mobile navigation */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-white md:hidden transition-transform duration-300 transform",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-6 border-b">
              <span className="font-heading text-2xl font-bold text-yutime-navy">YŪ<span className="text-yutime-blue">TIME</span></span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
              >
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link 
                to="/#categories" 
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link 
                to="/#courses" 
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link 
                to="/#testimonials" 
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
              <Link to="/join" className="btn-primary w-full mt-4" onClick={toggleMenu}>
                Join Now
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
