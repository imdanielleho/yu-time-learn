
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-yutime-cream py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-medium text-yutime-sage/70 uppercase tracking-wider mb-4 block">
                  Learning Made Simple
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yutime-sage leading-tight">
                Discover Skills at
                <span className="block script-font text-yutime-coral font-normal text-5xl md:text-6xl lg:text-7xl mt-2">
                  Your Own Pace
                </span>
              </h1>
              <p className="text-xl text-yutime-warmGray leading-relaxed max-w-lg">
                Gentle guidance and celebration of every step forward, designed specifically for adults 45+ who want to learn with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-yutime-sage hover:bg-yutime-sage/90 text-white px-10 py-4 text-lg rounded-full shadow-elegant hover-lift font-medium"
              >
                Explore Courses
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <button className="pill-button">
                Watch Preview
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-yutime-warmGray pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-sage rounded-full"></div>
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-coral rounded-full"></div>
                <span>Supportive community</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-yutime-softWhite rounded-3xl p-8 shadow-elegant">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/5d9f65d12a10d4166969add0/1602827328312-9JIXYE4JI8AHG54FKS77/computer+classes+for+seniors+1" 
                  alt="Computer classes for seniors - learning together"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yutime-sunshine text-yutime-sage px-8 py-4 rounded-full shadow-elegant font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yutime-sage rounded-full"></div>
                  <span>Start your journey today</span>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-yutime-lavender rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-12 w-16 h-16 bg-yutime-coral/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
