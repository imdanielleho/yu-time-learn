
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
    <section className="bg-white section-spacing">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h1 className="text-hero font-light text-black leading-none">
              Learn at your
              <br />
              <span className="text-blue-600">own pace</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
              Courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical skills.
            </p>
          </div>
          
          <div className="pt-8">
            <a 
              href="#pricing" 
              onClick={scrollToPricing} 
              className="btn-primary group"
            >
              Start learning
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
