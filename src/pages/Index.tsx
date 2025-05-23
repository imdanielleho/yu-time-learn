
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import MainCTAs from '@/components/MainCTAs';
import FeaturedCourses from '@/components/FeaturedCourses';
import Trending from '@/components/Trending';
import LearningProcess from '@/components/LearningProcess';
import PricingSection from '@/components/PricingSection';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ValueProposition />
        <MainCTAs />
        <Trending />
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
    </div>
  );
};

export default Index;
