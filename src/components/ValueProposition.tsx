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
    <section className="bg-yutime-softWhite py-16 md:py-24 relative">
      {/* Top curved separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-16 md:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-yutime-neutral/30" opacity="0.5"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-yutime-neutral/30"></path>
        </svg>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-32 left-12 opacity-20">
        <div className="w-6 h-6 bg-yutime-coral rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-32 right-16 opacity-15">
        <div className="w-8 h-8 border-2 border-yutime-accent rounded-full"></div>
      </div>
      
      <div className="container relative z-10">
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
