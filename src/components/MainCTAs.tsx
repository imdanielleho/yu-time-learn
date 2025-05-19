
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Play } from 'lucide-react';

const MainCTAs = () => {
  return (
    <section className="section bg-yutime-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Continue Learning CTA */}
          <Link 
            to="/my-courses"
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-yutime-purple/5 border border-yutime-purple/20 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-purple/10 p-4 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-yutime-purple" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-charcoal mb-3">Continue Learning</h3>
              <p className="text-yutime-grey mb-4">Pick up where you left off with your current courses</p>
              <div className="mt-auto flex items-center text-yutime-purple font-medium">
                Go to my courses <ArrowRight className="ml-2" />
              </div>
            </div>
          </Link>
          
          {/* Today's Recommendation CTA */}
          <Link 
            to="/recommended"
            className="card hover:shadow-lg transition-shadow cursor-pointer bg-yutime-coral/5 border border-yutime-coral/20 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-coral/10 p-4 rounded-full mb-4">
                <Play className="h-10 w-10 text-yutime-coral" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-charcoal mb-3">Today's Recommendation</h3>
              <p className="text-yutime-grey mb-4">Discover a new course selected just for you</p>
              <div className="mt-auto flex items-center text-yutime-coral font-medium">
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
