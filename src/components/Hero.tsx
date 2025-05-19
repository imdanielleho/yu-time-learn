
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-yutime-white py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-yutime-purple/10 text-yutime-purple font-medium mb-2">
              Learning designed for adults 45+
            </div>
            <h1 className="text-yutime-charcoal leading-tight">
              Learn New Skills at <span className="text-yutime-purple relative">Your Pace
                <svg className="absolute bottom-1 left-0 w-full h-2 text-yutime-purple/20" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,8 150,0 200,8 L200,8 L0,8 Z" fill="currentColor"></path>
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-yutime-grey max-w-lg">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/#courses" className="btn-primary flex items-center justify-center gap-2 group">
                Browse Courses
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="pt-4 flex items-center text-yutime-charcoal">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-yutime-purple/30 to-yutime-purple/10 border-2 border-white flex items-center justify-center text-sm font-medium shadow-sm">
                    {i}
                  </div>
                ))}
              </div>
              <p className="ml-4 font-medium">Join <span className="font-bold">2,500+</span> active learners</p>
            </div>
          </div>
          <div className="relative h-80 md:h-96 lg:h-[500px] animate-fade-in">
            <div className="absolute inset-0 z-10 rounded-2xl overflow-hidden transform rotate-3 shadow-xl hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-yutime-purple/20 to-yutime-gold/20 z-10 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800" 
                alt="Senior woman using laptop" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-yutime-gold/20 z-0"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-yutime-coral/20 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
