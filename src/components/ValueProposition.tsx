
import React from 'react';
import { Heart, BookOpen, Sparkles } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Heart size={32} className="text-yutime-gold" />,
      title: "Evidence-Based Wellness",
      description: "Discover health and wellness practices backed by science and delivered with warmth. Every course is designed to support your journey to feeling your best."
    },
    {
      icon: <BookOpen size={32} className="text-yutime-navy" />,
      title: "Digital Confidence",
      description: "Build tech skills at your own pace in a supportive environment. No judgment, just gentle guidance and celebration of every small victory."
    },
    {
      icon: <Sparkles size={32} className="text-yutime-slate" />,
      title: "Financial Empowerment",
      description: "Take control of your financial future with clear, compassionate guidance. Learn practical skills that bring peace of mind and confidence."
    }
  ];

  return (
    <section className="bg-yutime-white py-20 md:py-28">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-navy mb-8">
            Your Growth, Your Way
          </h2>
          <p className="text-xl text-yutime-coolGray max-w-2xl mx-auto leading-relaxed">
            We believe learning should feel joyful, not overwhelming. Each step forward is worth celebrating.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
          {values.map((value, index) => (
            <div key={index} className="text-center space-y-8 group">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-2xl bg-yutime-lightGray hover:bg-yutime-lightGray/60 flex items-center justify-center shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-yutime-navy font-heading">{value.title}</h3>
              <p className="text-yutime-coolGray leading-relaxed text-lg">{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Encouraging message */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-3 bg-yutime-lightGray px-8 py-4 rounded-full border border-yutime-navy/10">
            <span className="text-2xl">🌱</span>
            <span className="text-yutime-navy font-medium text-lg">Every expert was once a beginner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
