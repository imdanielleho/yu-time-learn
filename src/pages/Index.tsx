
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MainCTAs from '@/components/MainCTAs';
import FeaturedCourses from '@/components/FeaturedCourses';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MainCTAs />
        <div id="courses">
          <FeaturedCourses />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
