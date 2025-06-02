
import React from 'react';
import { BookOpen, Wallet, Award } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Award size={32} className="text-gray-700" />,
      title: "Evidence-Based Health",
      description: "All our health courses are backed by scientific research and taught by certified professionals with years of experience."
    },
    {
      icon: <BookOpen size={32} className="text-gray-700" />,
      title: "Digital Confidence",
      description: "Gain practical tech knowledge and hands-on skills that will help you navigate the digital world with ease."
    },
    {
      icon: <Wallet size={32} className="text-gray-700" />,
      title: "Financial Clarity",
      description: "Learn to manage your finances more effectively with clear, actionable advice from financial experts."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-100">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
