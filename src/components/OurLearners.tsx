import React from 'react';
import { TrendingUp, PlaneTakeoff, Heart } from 'lucide-react';

const OurLearners = () => {
  const personas = [
    {
      title: "Jennifer",
      ageStage: "45–54 • Working Professional",
      tagline: "I'm not ready to be left behind by technology",
      description: "Wants to stay competitive and relevant in her career while adapting to digital changes",
      icon: <TrendingUp size={32} className="text-yutime-coral" />
    },
    {
      title: "Michael",
      ageStage: "55–64 • Nearing Retirement", 
      tagline: "I want to make my transition into retirement meaningful",
      description: "Preparing for the next chapter with new skills and purposeful activities",
      icon: <PlaneTakeoff size={32} className="text-yutime-secondary" />
    },
    {
      title: "Grace",
      ageStage: "65+ • Retired",
      tagline: "I have time now to pursue what I've always wanted to learn",
      description: "Exploring new interests and staying mentally active with flexible, engaging learning",
      icon: <Heart size={32} className="text-yutime-accent" />
    }
  ];

  return (
    <section className="bg-yutime-neutral/30 py-16 md:py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {personas.map((persona, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-card border border-yutime-neutral/20 text-center h-full flex flex-col group hover:shadow-wellness transition-all duration-300">
              <div className="flex-1">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yutime-cream to-yutime-neutral flex items-center justify-center shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                    {persona.icon}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-yutime-primary mb-3 font-heading">
                    {persona.title}
                  </h3>
                  <span className="bg-yutime-secondary/20 text-yutime-secondary px-4 py-2 rounded-full text-base font-semibold border border-yutime-secondary/30">
                    {persona.ageStage}
                  </span>
                </div>
                
                <blockquote className="text-2xl font-medium text-yutime-primary mb-6 italic leading-relaxed">
                  "{persona.tagline}"
                </blockquote>
                
                <p className="text-yutime-text/80 leading-relaxed font-normal text-lg">
                  {persona.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurLearners;