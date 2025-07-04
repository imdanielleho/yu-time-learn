
import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Users size={32} className="text-white" />,
      title: "Join Our Community",
      description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
    },
    {
      number: "2",
      icon: <BookOpen size={32} className="text-white" />,
      title: "Learn at Your Pace",
      description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
    },
    {
      number: "3",
      icon: <Award size={32} className="text-white" />,
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
    <section className="bg-yutime-softWhite py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-sage mb-6">How YŪTIME Works</h2>
          <p className="max-w-2xl mx-auto text-yutime-warmGray text-xl leading-relaxed">
            Our simple approach is designed to make learning joyful and accessible for everyone.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  {/* Main icon container */}
                  <div className="w-20 h-20 bg-yutime-coral rounded-full flex items-center justify-center mx-auto mb-6 shadow-warm relative">
                    {step.icon}
                    {/* Step number in small circle at top-right */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yutime-sage rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <span className="text-white text-sm font-bold">{step.number}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-yutime-sage">{step.title}</h3>
                <p className="text-yutime-warmGray leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ready to begin section - horizontal layout */}
          <div className="bg-yutime-sage/10 rounded-2xl p-6 backdrop-blur-sm w-fit mx-auto">
            <div className="flex items-center gap-6">
              {/* Emoji icon on the left */}
              <div className="flex-shrink-0">
                <span className="text-3xl">🌟</span>
              </div>
              
              {/* Text content on the right */}
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-yutime-sage mb-1">Ready to begin?</h3>
                <p className="text-yutime-warmGray mb-4 text-base">Your journey starts with a single step</p>
                <Button 
                  onClick={() => scrollToSection('courses')} 
                  className="bg-yutime-coral hover:bg-yutime-coral/90 text-white px-8 py-3 text-lg rounded-xl font-bold shadow-warm hover-lift"
                >
                  Start Learning Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
