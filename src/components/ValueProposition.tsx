
import React from 'react';
import { Heart, BookOpen, Sparkles } from 'lucide-react';

const ValueProposition = () => {
  const values = [
    {
      icon: <Heart size={32} className="text-yutime-coral" />,
      title: "Evidence-Based Wellness",
      description: "Discover health and wellness practices backed by science and delivered with warmth. Every course is designed to support your journey to feeling your best."
    },
    {
      icon: <BookOpen size={32} className="text-yutime-sage" />,
      title: "Digital Confidence",
      description: "Build tech skills at your own pace in a supportive environment. No judgment, just gentle guidance and celebration of every small victory."
    },
    {
      icon: <Sparkles size={32} className="text-yutime-lavender" />,
      title: "Financial Empowerment",
      description: "Take control of your financial future with clear, compassionate guidance. Learn practical skills that bring peace of mind and confidence."
    }
  ];

  return (
    <section className="bg-yutime-softWhite py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-sage mb-6">
            Your Growth, Your Way
          </h2>
          <p className="text-lg text-yutime-warmGray max-w-2xl mx-auto leading-relaxed">
            We believe learning should feel joyful, not overwhelming. Each step forward is worth celebrating.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => (
            <div key={index} className="text-center space-y-6 group">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yutime-cream to-yutime-sand flex items-center justify-center shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-yutime-sage font-heading">{value.title}</h3>
              <p className="text-yutime-warmGray leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
        
        {/* Encouraging message */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yutime-sage/10 to-yutime-coral/10 px-6 py-3 rounded-full border border-yutime-sage/20">
            <span className="text-2xl">🌱</span>
            <span className="text-yutime-sage font-medium">Every expert was once a beginner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
