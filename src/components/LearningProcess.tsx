
import React from 'react';
import { Users, BookOpen, Award, Heart } from 'lucide-react';

const LearningProcess = () => {
  const steps = [
    {
      icon: <Users size={32} className="text-yutime-coral" />,
      title: "Join Our Community",
      description: "Connect with like-minded learners in a supportive, judgment-free environment where everyone celebrates each other's progress."
    },
    {
      icon: <BookOpen size={32} className="text-yutime-richBrown" />,
      title: "Learn at Your Pace",
      description: "Access bite-sized lessons designed specifically for adults 45+. No rushing, no pressure - just steady, comfortable progress."
    },
    {
      icon: <Award size={32} className="text-yutime-sunshine" />,
      title: "Celebrate Achievements",
      description: "Every milestone matters! We recognize your dedication and celebrate each step forward in your learning journey."
    }
  ];

  return (
    <section className="bg-gradient-to-br from-yutime-coral/5 via-yutime-warmCream to-yutime-lightCoral/10 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Heart size={20} className="text-yutime-coral" />
            <span className="text-sm font-medium tracking-wide uppercase text-yutime-coral">How YŪTIME Works</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-yutime-coral mb-6">
            Your Learning Journey, Simplified
          </h2>
          <p className="text-lg text-yutime-richBrown max-w-2xl mx-auto leading-relaxed">
            We've created a warm, welcoming path to help you discover new skills and build confidence at every step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-6 group">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yutime-warmCream to-white flex items-center justify-center shadow-warm group-hover:shadow-card transition-all duration-300 hover-lift border border-yutime-coral/20">
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yutime-coral text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-yutime-coral font-heading">{step.title}</h3>
              <p className="text-yutime-richBrown leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Encouraging call-to-action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-yutime-coral/20 shadow-soft">
            <span className="text-3xl">🌟</span>
            <div className="text-left">
              <p className="text-yutime-coral font-semibold text-lg">Ready to begin?</p>
              <p className="text-yutime-richBrown text-sm">Your journey starts with a single step</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningProcess;
