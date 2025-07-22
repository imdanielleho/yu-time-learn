import React from 'react';
import { Heart, BookOpen, Sparkles } from 'lucide-react';

const ValueProposition = () => {
  const values = [{
    icon: <Heart size={32} className="text-yutime-coral" />,
    title: "Evidence-Based Wellness",
    description: "Discover health and wellness practices backed by science and delivered with warmth. Every course is designed to support your journey to feeling your best."
  }, {
    icon: <BookOpen size={32} className="text-yutime-secondary" />,
    title: "Digital Confidence", 
    description: "Build tech skills at your own pace in a supportive environment. No judgment, just gentle guidance and celebration of every small victory."
  }, {
    icon: <Sparkles size={32} className="text-yutime-accent" />,
    title: "每堂課都是「用得上的知識」",
    description: "從生活常見場景出發，內容實用、精簡、有解法"
  }];
  
  return (
    <section className="bg-yutime-softWhite py-16 md:py-24">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif text-yutime-primary mb-6">
              Your Growth, Your Way
            </h2>
            <p className="text-lg text-yutime-text/70 max-w-2xl mx-auto leading-relaxed font-light">專為熟齡設計，簡單學會、有感成長</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => <div key={index} className="text-center space-y-6 group">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yutime-cream to-yutime-neutral flex items-center justify-center shadow-soft group-hover:shadow-warm transition-all duration-300 hover-lift">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-yutime-primary font-heading">{value.title}</h3>
              <p className="text-yutime-text/70 leading-relaxed font-light">{value.description}</p>
            </div>)}
          </div>
          
          {/* Encouraging message */}
          <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yutime-secondary/10 to-yutime-accent/10 px-6 py-3 rounded-full border border-yutime-secondary/20">
            <span className="text-2xl">🌱</span>
            <span className="text-yutime-primary font-medium">Every expert was once a beginner</span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ValueProposition;
