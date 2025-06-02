
import React from 'react';
import { ArrowRight } from 'lucide-react';

const LearningProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Enroll",
      description: "Choose your course and complete a simple registration process."
    },
    {
      number: "02",
      title: "Receive Learning Kit",
      description: "Get access to your digital materials and optional physical learning aids."
    },
    {
      number: "03",
      title: "Watch Live or Replay",
      description: "Join scheduled live sessions or watch recorded lessons at your convenience."
    },
    {
      number: "04",
      title: "Get Certificate",
      description: "Receive your completion certificate after finishing the course requirements."
    }
  ];

  return (
    <section className="py-20 bg-yutime-indigo">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How YŪTIME Works</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our simple 4-step learning process is designed to make education accessible and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl h-full border border-white/20">
                  <div className="text-yutime-gold text-4xl font-bold mb-6">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                  <p className="text-white/80 leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 translate-x-1/2">
                    <ArrowRight size={24} className="text-yutime-gold" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
