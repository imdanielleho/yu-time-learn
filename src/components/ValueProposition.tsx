
import React from 'react';
import { BookOpen, Wallet, Award } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Award size={32} className="text-yutime-indigo" />,
      title: "Evidence-Based Health",
      description: "All our health courses are backed by scientific research and taught by certified professionals with years of experience."
    },
    {
      icon: <BookOpen size={32} className="text-yutime-indigo" />,
      title: "Digital Confidence",
      description: "Gain practical tech knowledge and hands-on skills that will help you navigate the digital world with ease."
    },
    {
      icon: <Wallet size={32} className="text-yutime-indigo" />,
      title: "Financial Clarity",
      description: "Learn to manage your finances more effectively with clear, actionable advice from financial experts."
    }
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
