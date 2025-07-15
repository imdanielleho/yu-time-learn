import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const OurLearners = () => {
  const personas = [
    {
      title: "Sarah",
      ageStage: "28 • Working Professional",
      tagline: "I want to level up my skills without disrupting my career",
      description: "Seeking flexible learning that fits around a demanding 9-to-5 schedule"
    },
    {
      title: "Marcus",
      ageStage: "35 • Career Switcher", 
      tagline: "I need practical skills to transition into tech",
      description: "Looking for industry-relevant training to make a successful career change"
    },
    {
      title: "Elena",
      ageStage: "24 • Recent Graduate",
      tagline: "I want to gain real-world experience beyond my degree",
      description: "Needs hands-on learning to bridge the gap between theory and practice"
    }
  ];

  return (
    <section className="py-16 px-4 bg-yutime-neutral/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-dark mb-4">
            Our Learners
          </h2>
          <p className="text-lg text-yutime-textSecondary max-w-2xl mx-auto">
            Every learning journey is unique. Meet the learners we're designed to serve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <Card key={index} className="bg-white border-yutime-neutral/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-yutime-dark mb-1">
                      {persona.title}
                    </h3>
                    <span className="text-sm text-yutime-primary font-medium bg-yutime-primary/10 px-3 py-1 rounded-full">
                      {persona.ageStage}
                    </span>
                  </div>
                  
                  <blockquote className="text-lg font-medium text-yutime-dark italic">
                    "{persona.tagline}"
                  </blockquote>
                  
                  <p className="text-yutime-textSecondary text-sm leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurLearners;