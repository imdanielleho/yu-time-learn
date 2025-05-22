
import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
            className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors"
          >
            FAQ
          </button>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleScrollTo('courses')}
              className="btn-primary"
            >
              Enroll Now
            </button>
            <Link to="/login" className="flex items-center space-x-1 px-4 py-2 text-yutime-indigo hover:text-yutime-blue transition-colors">
              <LogIn size={18} />
              <span>Log In</span>
            </Link>
          </div>
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
              <button
                onClick={() => handleScrollTo('courses')}
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
              >
                Courses
              </button>
              <button
                onClick={() => handleScrollTo('testimonials')}
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleScrollTo('faq')}
                className="text-xl font-medium text-yutime-navy hover:text-yutime-blue"
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  handleScrollTo('courses');
                  toggleMenu();
                }}
                className="btn-primary w-full mt-4"
              >
                Enroll Now
              </button>
              <Link to="/login" className="flex items-center justify-center space-x-2 w-full p-2 border border-yutime-indigo text-yutime-indigo rounded-md" onClick={toggleMenu}>
                <LogIn size={18} />
                <span>Log In</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
