
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-b from-yutime-sand/50 to-white py-14 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-yutime-indigo leading-tight">
              Learn New Skills at <span className="text-yutime-blue">Your Pace</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
            <div className="pt-2">
              <a 
                href="#pricing" 
                onClick={scrollToPricing} 
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                Enroll Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="relative h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-yutime-gold/10 z-10 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800" 
              alt="Asian seniors learning online" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
