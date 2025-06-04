
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-medium text-black">YŪTIME</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleScrollTo('courses')} 
              className="text-lg font-normal text-black hover:text-gray-600 transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => handleScrollTo('testimonials')} 
              className="text-lg font-normal text-black hover:text-gray-600 transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleScrollTo('faq')} 
              className="text-lg font-normal text-black hover:text-gray-600 transition-colors"
            >
              FAQ
            </button>
            <div className="flex items-center space-x-4 ml-8">
              <button 
                onClick={handleLoginSignupClick}
                className="text-lg font-normal text-black hover:text-gray-600 transition-colors"
              >
                Sign in
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleResumeLearning}
                  className="btn-primary"
                >
                  Resume Learning
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
              <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
                <span className="text-2xl font-medium text-black">YŪTIME</span>
                <button 
                  onClick={toggleMenu}
                  className="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col p-8 space-y-8">
                <button
                  onClick={() => handleScrollTo('courses')}
                  className="text-2xl font-normal text-black hover:text-gray-600 text-left"
                >
                  Courses
                </button>
                <button
                  onClick={() => handleScrollTo('testimonials')}
                  className="text-2xl font-normal text-black hover:text-gray-600 text-left"
                >
                  Testimonials
                </button>
                <button
                  onClick={() => handleScrollTo('faq')}
                  className="text-2xl font-normal text-black hover:text-gray-600 text-left"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => {
                    toggleMenu();
                    handleLoginSignupClick();
                  }}
                  className="text-2xl font-normal text-black hover:text-gray-600 text-left"
                >
                  Sign in
                </button>
                {isLoggedIn && (
                  <button 
                    onClick={() => {
                      handleResumeLearning();
                      toggleMenu();
                    }}
                    className="btn-primary w-full"
                  >
                    Resume Learning
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
