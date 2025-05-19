
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-yutime-sand to-white py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-yutime-navy leading-tight">
              Learn New Skills at <span className="text-yutime-blue">Your Pace</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="btn-primary flex items-center justify-center gap-2 group">
                Browse Courses
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
            <div className="pt-4 flex items-center text-yutime-navy">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-yutime-blue/20 border-2 border-white flex items-center justify-center text-sm font-medium">
                    {i}
                  </div>
                ))}
              </div>
              <p className="ml-4 font-medium">Join <span className="font-bold">2,500+</span> active learners</p>
            </div>
          </div>
          <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-card animate-fade-in">
            <div className="absolute inset-0 bg-yutime-yellow/10 z-10 rounded-2xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800" 
              alt="Senior woman using laptop" 
              className="w-full h-full object-cover rounded-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
