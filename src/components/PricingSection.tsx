
import React from 'react';
import { Check, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  const scrollToCourses = (e: React.MouseEvent) => {
    e.preventDefault();
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="section bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand/30">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart size={20} className="text-yutime-coral" />
            <span className="text-sm font-medium text-yutime-sage tracking-wide uppercase">Choose Your Path</span>
          </div>
          <h2 className="text-yutime-sage mb-6">Find Your Perfect Learning Journey</h2>
          <p className="max-w-2xl mx-auto text-yutime-warmGray leading-relaxed">
            Whether you're taking your first step or ready to dive deep, 
            we have a supportive path that fits your pace and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Single Course Option */}
          <div className="card-warm flex flex-col h-full hover-lift">
            <div className="p-6 border-b border-yutime-sand_dark">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌱</span>
                <h3 className="text-xl font-semibold text-yutime-sage">First Steps</h3>
              </div>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-yutime-sage">HKD 120</span>
                <span className="ml-1 text-yutime-warmGray">/course</span>
              </div>
              <p className="text-yutime-warmGray">Perfect for exploring a new interest or skill that sparks your curiosity</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-4">
                {["Access to one complete course", "All learning materials included", "Supportive community forum", "Certificate of achievement"].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-yutime-sage flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-yutime-warmGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 pt-0">
              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="btn-secondary w-full text-center block"
              >
                Start Exploring
              </a>
            </div>
          </div>

          {/* 3-Courses Bundle Option */}
          <div className="card-warm border-2 border-yutime-coral flex flex-col h-full relative hover-lift transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yutime-coral px-6 py-2 rounded-full text-white font-medium text-sm shadow-warm">
              🌟 Most Popular
            </div>
            
            <div className="p-6 border-b border-yutime-sand_dark">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌿</span>
                <h3 className="text-xl font-semibold text-yutime-sage">Growth Journey</h3>
              </div>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-yutime-sage">HKD 350</span>
                <span className="ml-1 text-yutime-warmGray">/bundle</span>
              </div>
              <p className="text-yutime-warmGray">Ideal for building confidence across multiple areas of your life</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-4">
                {[
                  "Choose any 3 courses",
                  "All materials and resources",
                  "Priority community support",
                  "Certificates for all courses",
                  "Save HKD 10 vs individual courses",
                  "Personal progress tracking"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-yutime-coral flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-yutime-warmGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 pt-0">
              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="btn-primary w-full text-center block"
              >
                Begin Your Journey
              </a>
            </div>
          </div>
          
          {/* Full Bundle Option */}
          <div className="card-warm border border-yutime-lavender flex flex-col h-full relative hover-lift">
            <div className="absolute -top-4 right-4 bg-yutime-lavender px-4 py-2 rounded-full text-white font-medium text-sm shadow-gentle">
              💜 Complete Experience
            </div>
            
            <div className="p-6 border-b border-yutime-sand_dark">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🌳</span>
                <h3 className="text-xl font-semibold text-yutime-sage">Full Flourish</h3>
              </div>
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold text-yutime-sage">HKD 500</span>
                <span className="ml-1 text-yutime-warmGray">/bundle</span>
              </div>
              <p className="text-yutime-warmGray">Complete transformation with personalized support and guidance</p>
            </div>
            
            <div className="p-6 flex-grow">
              <ul className="space-y-4">
                {[
                  "Access to all current courses",
                  "Premium learning materials",
                  "VIP community access",
                  "All achievement certificates",
                  "BONUS: Personal consultation",
                  "Monthly group check-ins"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-yutime-lavender flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-yutime-warmGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 pt-0">
              <Link to="/bundle" className="btn-gentle w-full text-center block">
                Embrace Full Growth
              </Link>
            </div>
          </div>
        </div>
        
        {/* Encouraging message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-yutime-sage/5 px-8 py-4 rounded-2xl border border-yutime-sage/20">
            <span className="text-3xl">✨</span>
            <div className="text-left">
              <p className="text-yutime-sage font-medium">Your investment in yourself pays the best returns</p>
              <p className="text-sm text-yutime-warmGray">30-day happiness guarantee • Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
