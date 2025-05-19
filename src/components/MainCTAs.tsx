
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

// This would normally come from an authentication context
// For now, we'll just simulate a logged out state
const isLoggedIn = false;

const MainCTAs = () => {
  return (
    <section className="section bg-yutime-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Continue Learning / Get Started CTA */}
          <Link 
            to={isLoggedIn ? "/my-courses" : "/join"}
            className="card hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-yutime-purple/10 to-yutime-purple/5 border border-yutime-purple/20 flex flex-col h-full group"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-purple/10 p-4 rounded-full mb-4 group-hover:bg-yutime-purple/20 transition-all duration-300 transform group-hover:scale-105">
                <BookOpen className="h-10 w-10 text-yutime-purple" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-charcoal mb-3">
                {isLoggedIn ? "Continue Learning" : "Get Started Today"}
              </h3>
              <p className="text-yutime-grey mb-4">
                {isLoggedIn 
                  ? "Pick up where you left off with your current courses" 
                  : "Begin your learning journey with our engaging courses"}
              </p>
              <div className="mt-auto flex items-center text-yutime-purple font-medium group-hover:translate-x-1 transition-transform duration-300">
                {isLoggedIn ? "Go to my courses" : "Join now"} <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" />
              </div>
            </div>
          </Link>
          
          {/* Today's Recommendation CTA */}
          <Link 
            to="/recommended"
            className="card hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-yutime-coral/10 to-yutime-coral/5 border border-yutime-coral/20 flex flex-col h-full group"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-coral/10 p-4 rounded-full mb-4 group-hover:bg-yutime-coral/20 transition-all duration-300 transform group-hover:scale-105">
                <Play className="h-10 w-10 text-yutime-coral" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-charcoal mb-3">Today's Recommendation</h3>
              <p className="text-yutime-grey mb-4">Discover a new course selected just for you</p>
              <div className="mt-auto flex items-center text-yutime-coral font-medium group-hover:translate-x-1 transition-transform duration-300">
                View recommendation <ArrowRight className="ml-2 group-hover:ml-3 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainCTAs;
