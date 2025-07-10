
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
    <section className="relative bg-gradient-to-br from-yutime-neutral via-white to-yutime-cream py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="space-y-6 md:space-y-10 animate-fade-in">
            <div className="space-y-4 md:space-y-8">
              <div className="space-y-2">
                <p className="text-sm font-medium text-yutime-secondary tracking-wide uppercase">
                  重新定義熟齡學習體驗
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-yutime-primary leading-[1.1]">
                  Built for accuracy,
                  <span className="block text-yutime-secondary italic font-light">designed for</span>
                  <span className="block text-yutime-primary">your every day</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-yutime-text/70 leading-relaxed max-w-lg font-light">
                打造懂你節奏的成長空間，陪你穩健轉型、從容退休、優雅生活。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                免費體驗課程
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('how-it-works')}
                className="border-2 border-[#264653] text-[#264653] bg-transparent hover:bg-[#264653] hover:text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01]"
              >
                了解怎麼上課
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 md:space-x-8 text-sm text-yutime-text/60">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-yutime-secondary rounded-full"></div>
                <span>自主節奏學習</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-yutime-accent rounded-full"></div>
                <span>互助支持社群</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up mt-6 lg:mt-0">
            <div className="relative z-10">
              <div className="relative">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/5d9f65d12a10d4166969add0/1602827328312-9JIXYE4JI8AHG54FKS77/computer+classes+for+seniors+1" 
                  alt="Computer classes for seniors - learning together"
                  className="w-full h-auto rounded-2xl md:rounded-3xl shadow-wellness"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-24 md:w-32 h-24 md:h-32 bg-yutime-lavender/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 md:-bottom-8 -left-6 md:-left-8 w-20 md:w-24 h-20 md:h-24 bg-yutime-sunshine/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-bl from-yutime-secondary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-tr from-yutime-accent/5 to-transparent rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;
