
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import FeaturedCourses from '@/components/FeaturedCourses';
import LearningProcess from '@/components/LearningProcess';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CustomerServiceButton from '@/components/CustomerServiceButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ValueProposition />
        <div id="courses">
          <FeaturedCourses />
        </div>
        <LearningProcess />
        <PricingSection />
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="faq">
          <FAQ />
        </div>
      </main>
      <Footer />
      <CustomerServiceButton />
    </div>
  );
};

export default Index;
