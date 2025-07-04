
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Play } from 'lucide-react';

const MainCTAs = () => {
  return (
    <section className="section bg-yutime-stone">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Continue Learning CTA */}
          <Link 
            to="/my-courses"
            className="card-elevated hover:shadow-elegant transition-shadow cursor-pointer bg-yutime-sage/8 border-2 border-yutime-sage/20 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-sage/15 p-4 rounded-full mb-4">
                <BookOpen className="h-10 w-10 text-yutime-sage" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-navy mb-3">Continue Learning</h3>
              <p className="text-yutime-slate mb-4">Pick up where you left off with your current courses</p>
              <div className="mt-auto flex items-center text-yutime-sage font-medium">
                Go to my courses <ArrowRight className="ml-2" />
              </div>
            </div>
          </Link>
          
          {/* Today's Recommendation CTA */}
          <Link 
            to="/recommended"
            className="card-elevated hover:shadow-elegant transition-shadow cursor-pointer bg-yutime-bronze/8 border-2 border-yutime-bronze/20 flex flex-col h-full"
          >
            <div className="flex flex-col items-center text-center p-8">
              <div className="bg-yutime-bronze/15 p-4 rounded-full mb-4">
                <Play className="h-10 w-10 text-yutime-bronze" />
              </div>
              <h3 className="text-2xl font-bold text-yutime-navy mb-3">Today's Recommendation</h3>
              <p className="text-yutime-slate mb-4">Discover a new course selected just for you</p>
              <div className="mt-auto flex items-center text-yutime-bronze font-medium">
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
