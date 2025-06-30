
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import FeaturedCourses from '@/components/FeaturedCourses';
import LearningProcess from '@/components/LearningProcess';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';
import HomeMobileNavigation from '@/components/HomeMobileNavigation';
import LoginModal from '@/components/LoginModal';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    setIsLoginModalOpen(false);
    // TODO: Implement actual login logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1" style={{ paddingBottom: isMobile ? '80px' : '0' }}>
        <div id="hero">
          <Hero />
        </div>
        <ValueProposition />
        <div id="courses">
          <FeaturedCourses />
        </div>
        <LearningProcess />
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
      <CustomerServiceButton />
      <HomeMobileNavigation onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Index;
