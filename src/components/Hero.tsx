
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
    <section className="bg-white py-20 md:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Learn New Skills at <span className="text-yutime-blue">Your Pace</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
            enjoy life more, and develop practical everyday skills.
          </p>
          <div className="pt-4">
            <a 
              href="#pricing" 
              onClick={scrollToPricing} 
              className="inline-flex items-center justify-center gap-3 bg-yutime-indigo hover:bg-yutime-indigo/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all group"
            >
              Start Learning Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
