
import React from 'react';
import { NavbarLogo, DesktopNavigation, MobileMenuButton, MobileMenu, useNavbarState } from './navbar';
import LoginModal from './LoginModal';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const navbar = useNavbarState();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-soft">
        <div className="container flex h-16 items-center justify-between">
          <NavbarLogo />
          <MobileMenuButton
            isMenuOpen={navbar.mobile.isMenuOpen}
            toggleMenu={navbar.mobile.toggleMenu}
          />
          <DesktopNavigation
            handleScrollTo={navbar.desktop.handleScrollTo}
            handleCartClick={navbar.desktop.handleCartClick}
            itemCount={navbar.desktop.itemCount}
            handleLoginSignupClick={navbar.desktop.handleLoginSignupClick}
            isLoggedIn={navbar.desktop.isLoggedIn}
            hasPurchasedCourses={navbar.desktop.hasPurchasedCourses}
            handleResumeLearning={navbar.desktop.handleResumeLearning}
            currentPath={navbar.desktop.currentPath}
          />
          <MobileMenu
            isMenuOpen={navbar.mobile.isMenuOpen}
            toggleMenu={navbar.mobile.toggleMenu}
            handleScrollTo={navbar.mobile.handleScrollTo}
          />
        </div>
      </header>
      <LoginModal 
        isOpen={navbar.loginModal.isOpen}
        onClose={navbar.loginModal.onClose}
        onLogin={navbar.loginModal.onLogin}
      />
      <CartDrawer />
    </>
  );
};

export default Navbar;
