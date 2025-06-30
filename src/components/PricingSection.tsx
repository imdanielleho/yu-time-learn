
import React from 'react';
import { Check, Heart } from 'lucide-react';

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
            <span className="text-sm font-medium text-yutime-sage tracking-wide uppercase">Simple Pricing</span>
          </div>
          <h2 className="text-yutime-sage mb-6">Invest in Your Growth</h2>
          <p className="max-w-2xl mx-auto text-yutime-warmGray leading-relaxed">
            Each course is thoughtfully designed to give you practical skills and confidence.
            Choose the courses that spark your interest and learn at your own pace.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {/* Single Course Option */}
          <div className="card-warm flex flex-col h-full hover-lift border-2 border-yutime-coral">
            <div className="p-8 border-b border-yutime-sand_dark text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-3xl">🌱</span>
                <h3 className="text-2xl font-semibold text-yutime-sage">Per Course</h3>
              </div>
              <div className="flex items-baseline justify-center mb-4">
                <span className="text-4xl font-bold text-yutime-sage">HKD 120</span>
              </div>
              <p className="text-yutime-warmGray">Perfect for exploring new skills that spark your curiosity</p>
            </div>
            
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                {[
                  "Complete course with all materials", 
                  "Lifetime access to content", 
                  "Supportive community forum", 
                  "Certificate of achievement",
                  "30-day money-back guarantee",
                  "Mobile and desktop access"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-yutime-coral flex-shrink-0 mr-3 mt-0.5" />
                    <span className="text-yutime-warmGray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 pt-0">
              <a 
                href="#courses" 
                onClick={scrollToCourses}
                className="btn-primary w-full text-center block"
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
        
        {/* Encouraging message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-yutime-sage/5 px-8 py-4 rounded-2xl border border-yutime-sage/20">
            <span className="text-3xl">✨</span>
            <div className="text-left">
              <p className="text-yutime-sage font-medium">Your investment in yourself pays the best returns</p>
              <p className="text-sm text-yutime-warmGray">Start with any course that interests you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
