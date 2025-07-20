
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
        <div className="grid gap-4 md:gap-6">
          {mockCourses.map((course) => (
            <div key={course.id} className="bg-card rounded-xl p-4 md:p-6 shadow-soft hover:shadow-card transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Course Thumbnail - 16:9 aspect ratio to match homepage */}
                <div className="flex-shrink-0 w-full sm:w-32 md:w-40">
                  <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Course Content */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Title and Session */}
                  <div>
                    <h3 className="font-semibold text-yutime-navy text-base md:text-lg leading-tight mb-1">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.session}</p>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.lessons.completed}/{course.lessons.total} lessons</span>
                      <span className="font-medium text-yutime-navy">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-yutime-secondary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Expiry Countdown */}
                  {course.accessType === 'limited' && course.expiryDate && (
                    <div className="flex justify-start">
                      <ExpiryCountdown expiryDate={course.expiryDate} />
                    </div>
                  )}

                  {/* Action Button - Match homepage CTA styling */}
                  <div className="pt-2">
                    <Button 
                      onClick={() => handleContinueLearning(course.id)}
                      className="bg-[#2a9d8f] hover:bg-[#228b7a] text-white text-sm px-6 py-3 w-full md:w-auto rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md"
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
