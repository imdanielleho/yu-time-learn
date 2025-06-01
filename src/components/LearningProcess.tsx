
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
    <section className="section bg-yutime-indigo text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-4">How YŪTIME Works</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Our simple 4-step learning process is designed to make education accessible and effective for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/10 p-6 rounded-lg h-full">
                <div className="text-yutime-gold text-3xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight size={24} className="text-yutime-gold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
