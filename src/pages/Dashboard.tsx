
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, Activity } from 'lucide-react';

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('yutime-onboarding-completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-yutime-coral mb-2">Welcome back!</h1>
        <p className="text-yutime-richBrown">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8" data-tour="stats-cards">
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-yutime-lightCoral/50">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-coral/10 rounded-lg flex-shrink-0">
              <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-yutime-coral" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-coral">3</p>
              <p className="text-xs md:text-sm text-yutime-richBrown">Enrolled Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-yutime-lightCoral/50">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-sunshine/10 rounded-lg flex-shrink-0">
              <Clock className="h-4 w-4 md:h-6 md:w-6 text-yutime-sunshine" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-coral">12h</p>
              <p className="text-xs md:text-sm text-yutime-richBrown">Total Learning Time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-yutime-lightCoral/50">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-richBrown/10 rounded-lg flex-shrink-0">
              <Trophy className="h-4 w-4 md:h-6 md:w-6 text-yutime-richBrown" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-coral">2</p>
              <p className="text-xs md:text-sm text-yutime-richBrown">Completed Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-yutime-lightCoral/50">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-lavender/10 rounded-lg flex-shrink-0">
              <Activity className="h-4 w-4 md:h-6 md:w-6 text-yutime-lavender" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-coral">7</p>
              <p className="text-xs md:text-sm text-yutime-richBrown">Learning Streak (days)</p>
            </div>
          </div>
        </div>
      </div>

      <div data-tour="course-cards">
        <h2 className="text-lg md:text-xl font-bold text-yutime-coral mb-4">In Progress Courses</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-yutime-lightCoral/50">
            <div className="mb-4">
              <h3 className="font-semibold text-yutime-coral mb-3">Smartphone Basics for Everyday Use</h3>
              <p className="text-sm text-yutime-richBrown mb-4">Session 3: Managing Apps and Settings</p>
              <div className="flex items-center justify-between text-sm text-yutime-richBrown mt-2">
                <span>9/12 lessons</span>
                <span className="font-medium">75% complete</span>
              </div>
            </div>
            <div className="w-full bg-yutime-lightCoral rounded-full h-2 mb-4">
              <div className="bg-yutime-coral h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <Button className="bg-yutime-coral hover:bg-yutime-coral/90">Continue Learning</Button>
          </div>
          
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-yutime-lightCoral/50">
            <div className="mb-4">
              <h3 className="font-semibold text-yutime-coral mb-3">Gentle Yoga for Better Mobility</h3>
              <p className="text-sm text-yutime-richBrown mb-4">Session 2: Standing Poses and Balance</p>
              <div className="flex items-center justify-between text-sm text-yutime-richBrown mt-2">
                <span>6/15 lessons</span>
                <span className="font-medium">40% complete</span>
              </div>
            </div>
            <div className="w-full bg-yutime-lightCoral rounded-full h-2 mb-4">
              <div className="bg-yutime-coral h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <Button className="bg-yutime-coral hover:bg-yutime-coral/90">Continue Learning</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
