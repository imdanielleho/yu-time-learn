
import React, { useState } from 'react';
import { Menu, X, Play, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock empty cart state
  const cartItems = []; // This should come from actual cart state
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // We're on home page, scroll directly
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
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

  const handleCartClick = () => {
    if (cartItems.length === 0) {
      setIsCartDropdownOpen(!isCartDropdownOpen);
    } else {
      // Navigate to cart page when cart has items
      console.log("Navigate to cart");
    }
  };

  const handleCartMouseEnter = () => {
    setIsCartDropdownOpen(true);
  };

  const handleCartMouseLeave = () => {
    setIsCartDropdownOpen(false);
  };

  const handleExploreCoursesClick = () => {
    setIsCartDropdownOpen(false);
    handleScrollTo('courses');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-soft">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-heading text-2xl font-bold text-yutime-navy">YŪ<span className="text-yutime-blue">TIME</span></span>
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
              className="text-lg font-medium text-yutime-navy hover:text-yutime-blue transition-colors mr-12"
            >
              FAQ
            </button>
            <div className="flex items-center space-x-3">
              {/* Shopping Cart Button with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <Button
                  onClick={handleCartClick}
                  variant="ghost"
                  className="p-2.5 bg-white text-yutime-navy hover:bg-gray-50 hover:text-yutime-blue transition-all"
                >
                  <ShoppingCart size={18} />
                </Button>
                
                {/* Empty Cart Dropdown */}
                {isCartDropdownOpen && cartItems.length === 0 && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                    <div className="text-center">
                      <ShoppingCart size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600 mb-3">Your cart is empty</p>
                      <Button
                        onClick={handleExploreCoursesClick}
                        className="w-full bg-yutime-blue hover:bg-yutime-blue/90 text-white"
                      >
                        Explore Courses
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleLoginSignupClick}
                className="btn-primary"
              >
                Log In/Sign Up
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleResumeLearning}
                  className="bg-yutime-blue hover:bg-yutime-blue/90 text-white py-2.5 px-5 rounded-md font-medium text-lg transition-all shadow-sm hover:shadow flex items-center space-x-2"
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
                  className="text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
                >
                  Courses
                </button>
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
                
                {/* Mobile Shopping Cart Button */}
                <button
                  onClick={handleCartClick}
                  className="flex items-center space-x-2 text-xl font-medium text-yutime-navy hover:text-yutime-blue text-left"
                >
                  <ShoppingCart size={20} />
                  <span>Shopping Cart</span>
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
                    className="flex items-center justify-center space-x-2 w-full p-2 bg-yutime-blue text-white rounded-md"
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
      
      {/* Overlay to close cart dropdown when clicking outside */}
      {isCartDropdownOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsCartDropdownOpen(false)}
        />
      )}
      
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
