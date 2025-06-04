
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
    <section className="bg-white py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Learn New Skills at <span className="text-yutime-blue">Your Pace</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
            <div className="pt-4">
              <a 
                href="#pricing" 
                onClick={scrollToPricing} 
                className="inline-flex items-center justify-center gap-3 bg-yutime-indigo hover:bg-yutime-indigo/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all group"
              >
                Enroll Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src="https://cdn.elderlifefinancial.com/wp-content/uploads/2023/11/Technology-for-Seniors-To-Stay-in-Touch-With-Family.jpg?strip=all&lossy=1&ssl=1" 
                alt="Senior adult using laptop at home" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
