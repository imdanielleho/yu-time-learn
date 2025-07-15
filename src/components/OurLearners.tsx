import React from 'react';
import { Briefcase, RefreshCw, GraduationCap } from 'lucide-react';

const OurLearners = () => {
  const personas = [
    {
      title: "Sarah",
      ageStage: "28 • Working Professional",
      tagline: "I want to level up my skills without disrupting my career",
      description: "Seeking flexible learning that fits around a demanding 9-to-5 schedule",
      icon: <Briefcase size={32} className="text-yutime-coral" />
    },
    {
      title: "Marcus",
      ageStage: "35 • Career Switcher", 
      tagline: "I need practical skills to transition into tech",
      description: "Looking for industry-relevant training to make a successful career change",
      icon: <RefreshCw size={32} className="text-yutime-secondary" />
    },
    {
      title: "Elena",
      ageStage: "24 • Recent Graduate",
      tagline: "I want to gain real-world experience beyond my degree",
      description: "Needs hands-on learning to bridge the gap between theory and practice",
      icon: <GraduationCap size={32} className="text-yutime-accent" />
    }
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-base font-medium text-yutime-secondary tracking-wide uppercase mb-4">
            Our Learners
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6">
            Every Journey is Unique
          </h2>
          <p className="text-yutime-text/70 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Meet the learners we're designed to serve, each with their own goals and aspirations.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-yutime-coral/20 via-yutime-secondary/20 to-yutime-accent/20"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {personas.map((persona, index) => (
              <div key={index} className="relative bg-yutime-softWhite/50 rounded-2xl p-6 md:p-8 border border-yutime-neutral/10 group hover:bg-yutime-softWhite transition-all duration-300">
                {/* Timeline dot */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 md:block hidden">
                  <div className="w-8 h-8 rounded-full bg-white border-4 border-yutime-secondary shadow-soft group-hover:border-yutime-accent transition-colors duration-300"></div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yutime-cream to-yutime-neutral flex items-center justify-center shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                      {persona.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-yutime-primary font-heading">
                      {persona.title}
                    </h3>
                    <span className="inline-block bg-yutime-secondary/15 text-yutime-secondary px-3 py-1 rounded-full text-sm font-semibold">
                      {persona.ageStage}
                    </span>
                  </div>
                  
                  <blockquote className="text-lg font-medium text-yutime-primary italic leading-relaxed px-2">
                    "{persona.tagline}"
                  </blockquote>
                  
                  <p className="text-yutime-text/70 leading-relaxed font-light">
                    {persona.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom encouragement */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yutime-accent/10 to-yutime-coral/10 px-6 py-3 rounded-full border border-yutime-accent/20">
            <span className="text-2xl">✨</span>
            <span className="text-yutime-primary font-medium">Learning has no expiration date</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLearners;