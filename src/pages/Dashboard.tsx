
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Trophy, Activity } from 'lucide-react';
import ExpiryCountdown from '@/components/ExpiryCountdown';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('yutime-onboarding-completed');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleContinueLearning = (courseId: number) => {
    navigate(`/course-player/${courseId}`);
  };

  // Mock data for courses with expiry dates
  const mockCourses = [
    {
      id: 1,
      title: "Smartphone Basics for Everyday Use",
      session: "Session 3: Managing Apps and Settings",
      progress: 75,
      lessons: { completed: 9, total: 12 },
      accessType: 'unlimited' as const,
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Gentle Yoga for Better Mobility",
      session: "Session 2: Standing Poses and Balance",
      progress: 40,
      lessons: { completed: 6, total: 15 },
      accessType: 'limited' as const,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-yutime-navy mb-2">Welcome back!</h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8" data-tour="stats-cards">
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-blue/10 rounded-lg flex-shrink-0">
              <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-yutime-blue" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-navy">3</p>
              <p className="text-xs md:text-sm text-gray-600">Enrolled Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-yutime-gold/10 rounded-lg flex-shrink-0">
              <Clock className="h-4 w-4 md:h-6 md:w-6 text-yutime-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-navy">12h</p>
              <p className="text-xs md:text-sm text-gray-600">Total Learning Time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg flex-shrink-0">
              <Trophy className="h-4 w-4 md:h-6 md:w-6 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-navy">2</p>
              <p className="text-xs md:text-sm text-gray-600">Completed Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <div className="flex items-start space-x-2 md:space-x-3">
            <div className="p-1.5 md:p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
              <Activity className="h-4 w-4 md:h-6 md:w-6 text-purple-500" />
            </div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold text-yutime-navy">7</p>
              <p className="text-xs md:text-sm text-gray-600">Learning Streak (days)</p>
            </div>
          </div>
        </div>
      </div>

      <div data-tour="course-cards">
        <h2 className="text-lg md:text-xl font-bold text-yutime-navy mb-4">In Progress Courses</h2>
        <div className="space-y-3">
          {mockCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-24">
              <div className="flex gap-4 h-full">
                {/* Course Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="w-24 md:w-32 h-full rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-yutime-navy text-sm md:text-base truncate">{course.title}</h3>
                      <p className="text-xs md:text-sm text-gray-500 mb-1">{course.session}</p>
                    </div>
                    {course.accessType === 'limited' && course.expiryDate && (
                      <div className="ml-4 flex-shrink-0">
                        <ExpiryCountdown expiryDate={course.expiryDate} />
                      </div>
                    )}
                  </div>

                  {/* Progress Section */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-1">
                      <span>{course.lessons.completed}/{course.lessons.total} lessons</span>
                      <span className="font-medium">{course.progress}% complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yutime-blue h-1.5 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => handleContinueLearning(course.id)}
                      className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white py-1.5 px-3 rounded-lg font-medium text-xs transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                    >
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
