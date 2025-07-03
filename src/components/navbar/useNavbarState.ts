
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const useNavbarState = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openCart, getItemCount } = useCart();
  const { isLoggedIn, hasPurchasedCourses, login, logout } = useAuth();

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
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    // Since the button only shows when user has courses, go directly to dashboard
    navigate("/dashboard");
  };

  const handleLogin = (username: string, password: string) => {
    login(username, password);
    setIsLoginModalOpen(false);
    navigate("/dashboard");
  };

  const handleLoginSignupClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCartClick = () => {
    openCart();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const itemCount = getItemCount();

  return {
    mobile: {
      isMenuOpen,
      toggleMenu,
      handleScrollTo,
      isLoggedIn,
      handleLogout,
      handleResumeLearning,
    },
    desktop: {
      handleScrollTo,
      handleCartClick,
      itemCount,
      handleLoginSignupClick,
      isLoggedIn,
      hasPurchasedCourses,
      handleResumeLearning,
      currentPath: location.pathname,
    },
    loginModal: {
      isOpen: isLoginModalOpen,
      onClose: () => setIsLoginModalOpen(false),
      onLogin: handleLogin,
    },
  };
};

export default useNavbarState;
