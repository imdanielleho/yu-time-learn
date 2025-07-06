
import React from 'react';
import { Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const LearningProcess = () => {
  const steps = [
    {
      number: "1",
      icon: <Users size={28} className="text-white" />,
      title: "Tell us what you need",
      description: "We take a personalized approach to self-assessment, prioritizing how members prefer to receive care."
    },
    {
      number: "2", 
      icon: <BookOpen size={28} className="text-white" />,
      title: "Get connected to care",
      description: "This allows us to structure a plan that best suits each individual member's learning journey."
    },
    {
      number: "3",
      icon: <Award size={28} className="text-white" />,
      title: "Assess and adapt", 
      description: "Track your progress and celebrate achievements as you develop new skills at your own pace."
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-yutime-secondary tracking-wide uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6 max-w-3xl mx-auto">
            Personalized learning care at scale
          </h2>
          <p className="max-w-2xl mx-auto text-yutime-text/70 text-xl leading-relaxed font-light">
            Modern learning provides a robust suite of educational offerings to keep learners engaged, motivated, and growing.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-8 p-8 rounded-2xl hover:bg-yutime-neutral/30 transition-all duration-300">
                  {/* Step indicator */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-12 h-12 bg-yutime-sunshine rounded-full flex items-center justify-center shadow-gentle">
                        <span className="text-yutime-primary text-lg font-bold">{step.number}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl font-semibold mb-3 text-yutime-primary group-hover:text-yutime-secondary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-yutime-text/70 leading-relaxed text-lg font-light max-w-2xl">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Expandable indicator */}
                  <div className="flex-shrink-0 pt-2">
                    <div className="w-6 h-6 border-2 border-yutime-neutral rounded-full flex items-center justify-center group-hover:border-yutime-secondary transition-colors">
                      <div className="w-2 h-2 bg-yutime-neutral rounded-full group-hover:bg-yutime-secondary transition-colors"></div>
                    </div>
                  </div>
                </div>
                
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="ml-14 h-8 w-px bg-yutime-neutral/30"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-yutime-neutral/50 rounded-3xl p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif text-yutime-primary mb-4">
                Ready to begin your journey?
              </h3>
              <p className="text-yutime-text/70 mb-8 text-lg font-light">
                Join thousands of learners who have transformed their lives through personalized education.
              </p>
              <Button 
                onClick={() => scrollToSection('courses')}
                className="bg-yutime-primary hover:bg-yutime-primary/90 text-white px-10 py-4 text-lg rounded-2xl font-medium shadow-soft hover-lift"
              >
                Start Learning Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
