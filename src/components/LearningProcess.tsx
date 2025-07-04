
import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Users size={24} className="text-yutime-primary" />,
      title: "Join Our Community",
      description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
    },
    {
      number: "2", 
      icon: <BookOpen size={24} className="text-yutime-primary" />,
      title: "Learn at Your Pace",
      description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
    },
    {
      number: "3",
      icon: <Award size={24} className="text-yutime-primary" />,
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
    <section className="bg-yutime-background-muted section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-yutime-neutral-900 mb-6">How YŪTIME Works</h2>
          <p className="max-w-2xl mx-auto text-yutime-neutral-600 text-xl leading-relaxed">
            Our simple approach is designed to make learning joyful and accessible for everyone.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  {/* Main icon container */}
                  <div className="w-16 h-16 bg-yutime-background border-2 border-yutime-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft relative">
                    {step.icon}
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yutime-primary rounded-full flex items-center justify-center shadow-soft">
                      <span className="text-white text-xs font-bold">{step.number}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yutime-neutral-900">{step.title}</h3>
                <p className="text-yutime-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ready to begin section */}
          <div className="card-elevated p-8 max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="w-12 h-12 bg-yutime-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-yutime-accent rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-yutime-neutral-900 mb-2">Ready to begin?</h3>
              <p className="text-yutime-neutral-600 mb-6">Your journey starts with a single step</p>
            </div>
            <Button 
              onClick={() => scrollToSection('courses')} 
              className="btn-primary w-full"
            >
              Start Learning Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
