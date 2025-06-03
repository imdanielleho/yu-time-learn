
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">Welcome back!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yutime-blue/10 rounded-lg">
              <BookOpen className="h-6 w-6 text-yutime-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yutime-navy">3</p>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yutime-gold/10 rounded-lg">
              <Clock className="h-6 w-6 text-yutime-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yutime-navy">12h</p>
              <p className="text-sm text-gray-600">Total Learning Time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Trophy className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yutime-navy">2</p>
              <p className="text-sm text-gray-600">Completed Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yutime-navy">7</p>
              <p className="text-sm text-gray-600">Learning Streak (days)</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-yutime-navy mb-4">In Progress Courses</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-yutime-navy">Smartphone Basics for Everyday Use</h3>
              <span className="text-sm text-gray-600">75% complete</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Session 3: Managing Apps and Settings</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-yutime-blue h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <Button className="bg-yutime-blue hover:bg-yutime-blue/90">Continue Learning</Button>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-yutime-navy">Gentle Yoga for Better Mobility</h3>
              <span className="text-sm text-gray-600">40% complete</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Session 2: Standing Poses and Balance</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-yutime-blue h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <Button className="bg-yutime-blue hover:bg-yutime-blue/90">Continue Learning</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
