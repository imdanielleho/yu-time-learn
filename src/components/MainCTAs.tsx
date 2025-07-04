
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Play } from 'lucide-react';

const MainCTAs = () => {
  return (
    <section className="section bg-yutime-sand">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Continue Learning CTA */}
          <Link 
            to="/my-courses"
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-yutime-blue/10 border-2 border-white flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-blue/20 p-4 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-yutime-blue" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-navy mb-3">Continue Learning</h3>
              <p className="text-gray-700 mb-4">Pick up where you left off with your current courses</p>
              <div className="mt-auto flex items-center text-yutime-blue font-medium">
                Go to my courses <ArrowRight className="ml-2" />
              </div>
            </div>
          </Link>
          
          {/* Today's Recommendation CTA */}
          <Link 
            to="/recommended"
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-yutime-yellow/10 border-2 border-white flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-yellow/20 p-4 rounded-full mb-4">
                <Play className="h-10 w-10 text-yutime-yellow" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-navy mb-3">Today's Recommendation</h3>
              <p className="text-gray-700 mb-4">Discover a new course selected just for you</p>
              <div className="mt-auto flex items-center text-yutime-blue font-medium">
                View recommendation <ArrowRight className="ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainCTAs;
