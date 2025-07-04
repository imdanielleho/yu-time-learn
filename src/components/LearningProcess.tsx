
import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [{
    number: "1",
    icon: <Users size={32} className="text-white " />,
    title: "Join Our Community",
    description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
  }, {
    number: "2",
    icon: <BookOpen size={32} className="text-white " />,
    title: "Learn at Your Pace",
    description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
  }, {
    number: "3",
    icon: <Award size={32} className="text-white " />,
    title: "Celebrate Achievements",
    description: "Every small step forward is a victory worth celebrating. Track your progress and feel proud of how far you've come on your learning journey."
  }];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-yutime-indigo py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How YŪTIME Works</h2>
          <p className="max-w-2xl mx-auto text-white/80 text-xl leading-relaxed">
            Our simple approach is designed to make learning joyful and accessible for everyone.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  {/* Main icon container */}
                  <div className="w-20 h-20 bg-yutime-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm relative">
                    {step.icon}
                    {/* Step number in small circle at top-right */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yutime-indigo rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-white text-sm font-bold">{step.number}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Redesigned ready to begin section */}
          <div className="text-center relative animate-fade-in">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Learning Journey Awaits
              </h3>
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                Take the first step towards discovering new skills and connecting with a community that celebrates every achievement. 🌟
              </p>
              <Button 
                onClick={() => scrollToSection('courses')} 
                className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-10 py-4 text-lg rounded-xl font-semibold shadow-warm hover-lift transform transition-all duration-300 hover:scale-105"
              >
                Begin Your Journey
              </Button>
            </div>
            
            {/* Subtle decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-yutime-sunshine/20 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yutime-coral/20 rounded-full blur-2xl opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
