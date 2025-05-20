
import React from 'react';
import { BookOpen, Wallet, Award } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Award size={40} className="text-yutime-indigo" />,
      title: "Evidence-Based Health",
      description: "All our health courses are backed by scientific research and taught by certified professionals with years of experience."
    },
    {
      icon: <BookOpen size={40} className="text-yutime-indigo" />,
      title: "Digital Confidence",
      description: "Gain practical tech knowledge and hands-on skills that will help you navigate the digital world with ease."
    },
    {
      icon: <Wallet size={40} className="text-yutime-indigo" />,
      title: "Financial Clarity",
      description: "Learn to manage your finances more effectively with clear, actionable advice from financial experts."
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="card flex flex-col items-center text-center p-6 border border-gray-100">
              <div className="mb-4 p-3 rounded-full bg-yutime-blue/10">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-yutime-indigo">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
