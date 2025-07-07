
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
    <section className="relative bg-gradient-to-br from-yutime-neutral via-white to-yutime-cream py-24 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-yutime-secondary tracking-wide uppercase">
                  Learning Made Simple
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-yutime-primary leading-[1.1]">
                  Built for accuracy,
                  <span className="block text-yutime-secondary italic font-light">designed for</span>
                  <span className="block text-yutime-primary">your every day</span>
                </h1>
              </div>
              <p className="text-xl text-yutime-text/70 leading-relaxed max-w-lg font-light">
                Discover new skills at your own pace with courses designed specifically for adults 45+. 
                No pressure, just gentle guidance and celebration of every step forward.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white px-10 py-4 text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Start Learning Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-[#2a9d8f] text-[#2a9d8f] bg-transparent hover:bg-[#2a9d8f] hover:text-white px-10 py-4 text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01]"
              >
                How It Works
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-yutime-text/60">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yutime-secondary rounded-full"></div>
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yutime-accent rounded-full"></div>
                <span>Supportive community</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative z-10">
              <div className="relative">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/5d9f65d12a10d4166969add0/1602827328312-9JIXYE4JI8AHG54FKS77/computer+classes+for+seniors+1" 
                  alt="Computer classes for seniors - learning together"
                  className="w-full h-auto rounded-3xl shadow-wellness"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yutime-lavender/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yutime-sunshine/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-yutime-secondary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yutime-accent/5 to-transparent rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;
