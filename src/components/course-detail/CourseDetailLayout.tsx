
import React from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const CourseDetailLayout = ({ children, isMobile, isLoggedIn, onLoginClick }: LayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
    <CustomerServiceButton />
    {isMobile && !isLoggedIn && (
      <HomeMobileNavigation onLoginClick={onLoginClick} />
    )}
    {isMobile && isLoggedIn && <BottomNavigation />}
  </div>
);

export default CourseDetailLayout;
