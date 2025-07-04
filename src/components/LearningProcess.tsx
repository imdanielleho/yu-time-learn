
import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Users size={32} className="text-white " />,
      title: "Join Our Community",
      description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
    },
    {
      number: "2", 
      icon: <BookOpen size={32} className="text-white " />,
      title: "Learn at Your Pace",
      description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
    },
    {
      number: "3",
      icon: <Award size={32} className="text-white " />,
      title: "Celebrate Achievements", 
      description: "Every small step forward is a victory worth celebrating. Track your progress and feel proud of how far you've come on your learning journey."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
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
          
          {/* Ready to begin section - reduced width */}
          <div className="text-center animate-fade-in max-w-md mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
                <span>🌟</span>
                <span>✨</span>
                <span>🎯</span>
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Your Learning Journey Awaits
                </h3>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  Take the first step towards discovering new skills and rediscovering the joy of learning
                </p>
              </div>
              
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-4 text-lg rounded-xl font-bold shadow-warm hover-lift"
              >
                Start Learning Today
              </Button>
            </div>
            
            {/* Subtle decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yutime-sunshine/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yutime-coral/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
