
import React from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import { Link } from "react-router-dom";
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import BottomNavigation from '@/components/BottomNavigation';

interface NotFoundProps {
  isMobile: boolean;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

const CourseNotFound = ({ isMobile, isLoggedIn, onLoginClick }: NotFoundProps) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Link to="/" className="text-yutime-blue hover:underline">
          Return to homepage
        </Link>
      </div>
    </main>
    <Footer />
    <CustomerServiceButton />
    {isMobile && !isLoggedIn && (
      <HomeMobileNavigation onLoginClick={onLoginClick} />
    )}
    {isMobile && isLoggedIn && <BottomNavigation />}
  </div>
);

export default CourseNotFound;
