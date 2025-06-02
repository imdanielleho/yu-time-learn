
import React from 'react';
import { BookOpen, Wallet, Award } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Award size={32} className="text-yutime-indigo" />,
      title: "Evidence-Based Health",
      description: "All our health courses are backed by scientific research and taught by certified professionals."
    },
    {
      icon: <BookOpen size={32} className="text-yutime-indigo" />,
      title: "Digital Confidence",
      description: "Gain practical tech knowledge and hands-on skills that help you navigate the digital world with ease."
    },
    {
      icon: <Wallet size={32} className="text-yutime-indigo" />,
      title: "Financial Clarity",
      description: "Learn to manage your finances more effectively with clear, actionable advice from experts."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
