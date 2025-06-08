
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
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container flex h-18 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold text-gray-900">YŪ<span className="text-blue-600">TIME</span></span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="h-10 w-10"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleScrollTo('courses')} 
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Courses
            </button>
            <button 
              onClick={() => handleScrollTo('testimonials')} 
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              FAQ
            </button>
            <div className="flex items-center space-x-4 ml-8">
              <button 
                onClick={handleLoginSignupClick}
                className="btn-secondary"
              >
                Log In / Sign Up
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleResumeLearning}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Resume Learning</span>
                  <Play size={16} />
                </button>
              )}
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
              <div className="flex items-center justify-between h-18 px-6 border-b border-gray-100">
                <span className="font-display text-2xl font-bold text-gray-900">YŪ<span className="text-blue-600">TIME</span></span>
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
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left transition-colors duration-200"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleScrollTo('testimonials')}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left transition-colors duration-200"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleScrollTo('faq')}
                  className="text-lg font-medium text-gray-700 hover:text-blue-600 text-left transition-colors duration-200"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    toggleMenu();
                    handleLoginSignupClick();
                  }}
                  className="btn-primary w-full mt-8"
                >
                  Log In / Sign Up
                </button>
                {isLoggedIn && (
                  <button 
                    onClick={() => {
                      handleResumeLearning();
                      toggleMenu();
                    }}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <span>Resume Learning</span>
                    <Play size={16} />
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
