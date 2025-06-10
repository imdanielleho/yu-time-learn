
import React, { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  
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

  const handleResumeLearning = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = (username: string, password: string) => {
    console.log("Login attempted with:", username, password);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    navigate("/dashboard");
  };

  const handleLoginSignupClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-yutime-white shadow-soft border-b border-yutime-lightGray">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold text-yutime-navy">YŪ<span className="text-yutime-gold">TIME</span></span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex flex-col items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="h-10 w-10 text-yutime-navy hover:bg-yutime-lightGray"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <span className="text-xs text-yutime-coolGray">Menu</span>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleScrollTo('courses')} 
              className="text-lg font-medium text-yutime-navy hover:text-yutime-gold transition-colors px-4 py-2"
            >
              Courses
            </button>
            <button 
              onClick={() => handleScrollTo('testimonials')} 
              className="text-lg font-medium text-yutime-navy hover:text-yutime-gold transition-colors px-4 py-2"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-lg font-medium text-yutime-navy hover:text-yutime-gold transition-colors px-4 py-2 mr-8"
            >
              FAQ
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLoginSignupClick}
                className="bg-yutime-navy hover:bg-yutime-navy/90 text-white py-3 px-6 rounded-xl font-medium text-lg transition-all duration-300 shadow-soft"
              >
                Log In/Sign Up
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleResumeLearning}
                  className="bg-yutime-gold hover:bg-yutime-gold/90 text-yutime-navy py-3 px-6 rounded-xl font-medium text-lg transition-all shadow-warm flex items-center space-x-2"
                >
                  <span>Resume Learning</span>
                  <Play size={18} />
                </button>
              )}
            </div>
          </nav>
          
          {/* Mobile navigation */}
          <div
            className={cn(
              "fixed inset-0 z-50 bg-yutime-white md:hidden transition-transform duration-300 transform",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-20 px-6 border-b border-yutime-lightGray">
                <span className="font-heading text-2xl font-bold text-yutime-navy">YŪ<span className="text-yutime-gold">TIME</span></span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMenu}
                  className="text-yutime-navy"
                >
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex flex-col p-6 space-y-8">
                <button
                  onClick={() => handleScrollTo('courses')}
                  className="text-xl font-medium text-yutime-navy hover:text-yutime-gold text-left py-2"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleScrollTo('testimonials')}
                  className="text-xl font-medium text-yutime-navy hover:text-yutime-gold text-left py-2"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleScrollTo('faq')}
                  className="text-xl font-medium text-yutime-navy hover:text-yutime-gold text-left py-2"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    toggleMenu();
                    handleLoginSignupClick();
                  }}
                  className="bg-yutime-navy text-white py-4 px-6 rounded-xl font-medium text-lg w-full mt-6"
                >
                  Log In/Sign Up
                </button>
                {isLoggedIn && (
                  <button 
                    onClick={() => {
                      handleResumeLearning();
                      toggleMenu();
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-4 px-6 bg-yutime-gold text-yutime-navy rounded-xl font-medium"
                  >
                    <span>Resume Learning</span>
                    <Play size={18} />
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
