
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
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How YŪTIME Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our simple 4-step learning process is designed to make education accessible and effective for everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl h-full hover:border-gray-200 transition-colors">
                <div className="text-gray-400 text-2xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight size={20} className="text-gray-300" />
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
