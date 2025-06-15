
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';

const useNavbarState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openCart, getItemCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const handleScrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
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
    openCart();
  };

  const itemCount = getItemCount();

  return {
    mobile: {
      isMenuOpen,
      toggleMenu,
      handleScrollTo,
    },
    desktop: {
      handleScrollTo,
      handleCartClick,
      itemCount,
      handleLoginSignupClick,
      isLoggedIn,
      handleResumeLearning,
    },
    loginModal: {
      isOpen: isLoginModalOpen,
      onClose: () => setIsLoginModalOpen(false),
      onLogin: handleLogin,
    },
  };
};

export default useNavbarState;
