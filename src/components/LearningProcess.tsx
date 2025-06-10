
import React from 'react';
import { Users, Clock, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Users size={32} className="text-yutime-gold" />,
      title: "Join Our Community",
      description: "Become part of a supportive learning community where everyone encourages each other's growth and celebrates every achievement together."
    },
    {
      number: "2", 
      icon: <Clock size={32} className="text-yutime-gold" />,
      title: "Learn at Your Pace",
      description: "Take your time to absorb each lesson. Our flexible schedule means you can learn when it's convenient for you, without any pressure."
    },
    {
      number: "3",
      icon: <Sparkles size={32} className="text-yutime-gold" />,
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
                  <div className="w-20 h-20 bg-yutime-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm">
                    <span className="text-yutime-indigo text-2xl font-bold">{step.number}</span>
                  </div>
                  <div className="flex justify-center mb-6">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Ready to begin section */}
          <div className="text-center bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex justify-center mb-4">
              <Sparkles size={40} className="text-yutime-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ready to begin?</h3>
            <p className="text-white/80 mb-6 text-lg">
              Join thousands of learners who have transformed their lives through our courses.
            </p>
            <Button 
              onClick={() => scrollToSection('courses')}
              className="bg-yutime-gold hover:bg-yutime-gold/90 text-yutime-indigo px-8 py-3 text-lg rounded-xl font-bold shadow-warm hover-lift"
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
