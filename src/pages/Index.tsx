import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import FeaturedCourses from '@/components/FeaturedCourses';
import LearningProcess from '@/components/LearningProcess';
import OurLearners from '@/components/OurLearners';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import LoginModal from '@/components/LoginModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const isMobile = useIsMobile();
  const { login, logout, isLoggedIn, hasPurchasedCourses } = useAuth();
  const navigate = useNavigate();

  // Effect to handle redirect after login
  useEffect(() => {
    if (shouldRedirect && isLoggedIn && hasPurchasedCourses) {
      console.log("Index redirecting to dashboard via useEffect");
      navigate("/dashboard");
      setShouldRedirect(false);
    }
  }, [shouldRedirect, isLoggedIn, hasPurchasedCourses, navigate]);

  const handleLogin = (email: string, password: string) => {
    console.log("Index handleLogin called");
    login(email, password);
    setIsLoginModalOpen(false);
    setShouldRedirect(true); // Trigger redirect check via useEffect
  };

  const handleLogout = () => {
    logout();
  };

  const handleResumeLearning = () => {
    // Since the button only shows when user has courses, go directly to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" style={{ paddingBottom: isMobile ? '0' : '0' }}>
        <div id="hero">
          <Hero />
        </div>
        <div id="courses">
          <FeaturedCourses />
        </div>
        <div id="our-learners">
          <OurLearners />
        </div>
        <ValueProposition />
        <div id="how-it-works">
          <LearningProcess />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
      <CustomerServiceButton />
      <HomeMobileNavigation 
        onLoginClick={() => setIsLoginModalOpen(true)}
        onResumeLearningClick={handleResumeLearning}
      />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
