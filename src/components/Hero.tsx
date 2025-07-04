
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
    <section className="relative bg-yutime-background-soft section-large overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yutime-neutral-900 leading-tight">
                Learning Made
                <span className="block text-yutime-primary">Simple & Joyful</span>
              </h1>
              <p className="text-lg md:text-xl text-yutime-neutral-600 leading-relaxed max-w-xl">
                Discover new skills at your own pace with courses designed specifically for adults 45+. 
                No pressure, just gentle guidance and celebration of every step forward.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('courses')}
                className="btn-primary"
              >
                Explore Courses
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-yutime-neutral-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-primary rounded-full"></div>
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-secondary rounded-full"></div>
                <span>Supportive community</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover-lift">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/5d9f65d12a10d4166969add0/1602827328312-9JIXYE4JI8AHG54FKS77/computer+classes+for+seniors+1" 
                  alt="Computer classes for seniors - learning together"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yutime-background border border-yutime-neutral-200 px-6 py-4 rounded-xl shadow-card">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yutime-accent rounded-full"></div>
                  <span className="text-yutime-neutral-700 font-medium">Start your journey today!</span>
                </div>
              </div>
            </div>
            
            {/* Subtle background decoration */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-yutime-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yutime-secondary/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
