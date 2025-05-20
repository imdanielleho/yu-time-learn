
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-yutime-sand/50 to-white py-14 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-yutime-navy leading-tight">
              Learn New Skills at <span className="text-yutime-blue">Your Pace</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-lg">
              Join YŪTIME and discover courses designed for adults 45+ who want to stay mentally active, 
              enjoy life more, and develop practical everyday skills.
            </p>
            <div className="pt-2">
              <Link to="/#courses" className="btn-primary inline-flex items-center justify-center gap-2 group">
                Explore Courses
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="pt-4 flex items-center text-yutime-navy">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-yutime-blue/20 border border-white flex items-center justify-center text-sm font-medium">
                    {i}
                  </div>
                ))}
              </div>
              <p className="ml-3 text-sm font-medium">Join <span className="font-bold">2,500+</span> active learners</p>
            </div>
          </div>
          <div className="relative h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md">
            <div className="absolute inset-0 bg-yutime-yellow/10 z-10 rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800" 
              alt="Senior woman using laptop" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
