
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
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 md:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-gray-900 tracking-tight">
              Learn New Skills at <span className="text-blue-600">Your Own Pace</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
          </div>
          
          <div className="pt-8">
            <a 
              href="#pricing" 
              onClick={scrollToPricing} 
              className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
            >
              Start Learning Today
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24">
          <div className="relative max-w-5xl mx-auto">
            <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
              <img 
                src="https://cdn.elderlifefinancial.com/wp-content/uploads/2023/11/Technology-for-Seniors-To-Stay-in-Touch-With-Family.jpg?strip=all&lossy=1&ssl=1" 
                alt="Senior adult using laptop at home" 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full opacity-60 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
