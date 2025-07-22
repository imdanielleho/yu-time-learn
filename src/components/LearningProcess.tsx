import React from 'react';
import { Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
const LearningProcess = () => {
  const steps = [{
    number: "1",
    icon: <Users size={40} className="text-yutime-primary" />,
    title: "選擇課程",
    description: "根據你的階段與興趣選課"
  }, {
    number: "2",
    icon: <BookOpen size={40} className="text-yutime-secondary" />,
    title: "按照你的節奏學",
    description: "影片短、可回放，手機隨時可看"
  }, {
    number: "3",
    icon: <Award size={40} className="text-yutime-accent" />,
    title: "Assess and adapt",
    description: "Track your progress and celebrate achievements as you develop new skills at your own pace."
  }];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="how-it-works" className="bg-yutime-neutral/30 py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-base font-medium text-yutime-secondary tracking-wide uppercase mb-4">
            如何開始
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6 max-w-3xl mx-auto">
            Personalized learning care at scale
          </h2>
          <p className="max-w-2xl mx-auto text-yutime-text/70 text-lg leading-relaxed font-light">
            Modern learning provides a robust suite of educational offerings to keep learners engaged, motivated, and growing.
          </p>
        </div>
        
        {/* Vertical Column Layout with integrated step numbers and larger icons */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => <div key={index}>
                <div className="bg-white rounded-3xl p-8 shadow-card border border-yutime-neutral/20 text-center h-full flex flex-col">
                  
                  {/* Integrated step number and icon design */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      {/* Larger icon background */}
                      <div className="w-20 h-20 bg-yutime-neutral/30 rounded-2xl flex items-center justify-center">
                        {step.icon}
                      </div>
                      {/* Smaller, integrated step number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yutime-sunshine rounded-full flex items-center justify-center shadow-soft border-2 border-white">
                        <span className="text-yutime-primary text-sm font-bold">{step.number}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-yutime-primary">
                      {step.title}
                    </h3>
                    <p className="text-yutime-text/70 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-2xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/40">
              <h3 className="text-2xl font-serif text-yutime-primary mb-4">準備好開始了嗎？</h3>
              <p className="text-yutime-text/70 mb-8 text-lg font-light">
                Join thousands of learners who have transformed their lives through personalized education.
              </p>
              <Button onClick={() => scrollToSection('courses')} className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white px-10 py-4 text-lg rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                Start Learning Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default LearningProcess;