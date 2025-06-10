
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
      <header className="sticky top-0 z-40 w-full bg-yutime-cream shadow-soft">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold text-yutime-forest">YŪ<span className="text-yutime-sage">TIME</span></span>
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
                className="h-8 w-8"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              <span className="text-xs text-gray-600">Menu</span>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleScrollTo('courses')} 
              className="text-lg font-medium text-yutime-forest hover:text-yutime-sage transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => handleScrollTo('testimonials')} 
              className="text-lg font-medium text-yutime-forest hover:text-yutime-sage transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-lg font-medium text-yutime-forest hover:text-yutime-sage transition-colors mr-12"
            >
              FAQ
            </button>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLoginSignupClick}
                className="btn-primary"
              >
                Log In/Sign Up
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleResumeLearning}
                  className="bg-yutime-sage hover:bg-yutime-forest text-white py-2.5 px-5 rounded-md font-medium text-lg transition-all shadow-sm hover:shadow flex items-center space-x-2"
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
              "fixed inset-0 z-50 bg-yutime-cream md:hidden transition-transform duration-300 transform",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between h-16 px-6 border-b">
                <span className="font-heading text-2xl font-bold text-yutime-forest">YŪ<span className="text-yutime-sage">TIME</span></span>
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
                  className="text-xl font-medium text-yutime-forest hover:text-yutime-sage text-left"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleScrollTo('testimonials')}
                  className="text-xl font-medium text-yutime-forest hover:text-yutime-sage text-left"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleScrollTo('faq')}
                  className="text-xl font-medium text-yutime-forest hover:text-yutime-sage text-left"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    toggleMenu();
                    handleLoginSignupClick();
                  }}
                  className="btn-primary w-full mt-4"
                >
                  Log In/Sign Up
                </button>
                {isLoggedIn && (
                  <button 
                    onClick={() => {
                      handleResumeLearning();
                      toggleMenu();
                    }}
                    className="flex items-center justify-center space-x-2 w-full p-2 bg-yutime-sage text-white rounded-md"
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
