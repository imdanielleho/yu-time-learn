
import React from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [{
    number: "1",
    icon: <Users size={28} className="text-yutime-sage" />,
    title: "Join Our Community",
    description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
  }, {
    number: "2",
    icon: <BookOpen size={28} className="text-yutime-sage" />,
    title: "Learn at Your Pace",
    description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
  }, {
    number: "3",
    icon: <Award size={28} className="text-yutime-sage" />,
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
    <section className="bg-yutime-softWhite py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-yutime-sage/70 uppercase tracking-wider mb-4 block">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-sage mb-6">
            How <span className="script-font text-yutime-coral font-normal">YŪTIME</span> Works
          </h2>
          <p className="max-w-2xl mx-auto text-yutime-warmGray text-xl leading-relaxed">
            Our thoughtful approach is designed to make learning joyful and accessible for everyone.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  {/* Main icon container */}
                  <div className="w-20 h-20 bg-yutime-lavender rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft relative group-hover:shadow-elegant transition-all duration-300">
                    {step.icon}
                    {/* Step number */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yutime-sage rounded-full flex items-center justify-center shadow-soft">
                      <span className="text-white text-sm font-semibold">{step.number}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-yutime-sage">{step.title}</h3>
                <p className="text-yutime-warmGray leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ready to begin section */}
          <div className="bg-yutime-cream rounded-3xl p-8 w-fit mx-auto shadow-soft border border-yutime-sand">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yutime-sunshine rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-yutime-sage rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-xl font-semibold text-yutime-sage mb-1">Ready to begin?</h3>
                <p className="text-yutime-warmGray mb-4 text-base">Your journey starts with a single step</p>
                <Button 
                  onClick={() => scrollToSection('courses')} 
                  className="bg-yutime-sage hover:bg-yutime-sage/90 text-white px-8 py-3 text-lg rounded-full font-semibold shadow-elegant hover-lift"
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
