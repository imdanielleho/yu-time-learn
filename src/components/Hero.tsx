
import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

const Hero = () => {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-yutime-cream via-yutime-softWhite to-yutime-sand/30 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-yutime-lavender/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-yutime-coral/20 rounded-full blur-xl"></div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center space-x-2 text-yutime-sage">
              <Heart size={20} className="text-yutime-coral" />
              <span className="text-sm font-medium tracking-wide uppercase">Your Learning Journey Starts Here</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yutime-sage leading-tight">
              Discover Your <span className="text-gradient">Potential</span> at Every Stage
            </h1>
            
            <p className="text-xl text-yutime-warmGray leading-relaxed max-w-lg">
              Join a warm, supportive community of learners 45+ who are embracing new skills, 
              staying curious, and celebrating every step of their personal growth journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="#pricing" 
                onClick={scrollToPricing} 
                className="inline-flex items-center justify-center gap-3 bg-yutime-sage hover:bg-yutime-sage/90 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-soft group"
              >
                Begin Your Journey
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button className="inline-flex items-center justify-center gap-3 bg-yutime-coral/10 hover:bg-yutime-coral/20 text-yutime-sage px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 border border-yutime-coral/30 hover:border-yutime-coral/50">
                Explore Courses
              </button>
            </div>
            
            <div className="flex items-center space-x-6 pt-6 text-sm text-yutime-warmGray">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-sunshine rounded-full"></div>
                <span>Learn at your pace</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-coral rounded-full"></div>
                <span>Supportive community</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yutime-lavender rounded-full"></div>
                <span>Celebrate progress</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-warm hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80" 
                alt="Diverse group of mature adults learning together with joy and enthusiasm" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yutime-sage/20 to-transparent"></div>
            </div>
            
            {/* Floating elements for warmth */}
            <div className="absolute -top-4 -right-4 bg-yutime-sunshine text-yutime-sage px-4 py-2 rounded-full text-sm font-medium shadow-soft celebration">
              🌟 Start Today!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-yutime-coral text-white px-4 py-2 rounded-full text-sm font-medium shadow-warm celebration">
              💪 You've Got This!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
