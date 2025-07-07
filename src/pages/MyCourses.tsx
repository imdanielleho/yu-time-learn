
import React from 'react';
import { BookOpen, Clock, Trophy, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MyCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Smartphone Basics for Everyday Use",
      sessionTitle: "Session 3: Managing Apps and Settings",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      estimatedTime: "1h 30m left",
      totalTime: "4h 30m",
      expirationDate: new Date('2024-12-15'),
      purchaseDate: new Date('2023-12-15'),
      lastActivity: new Date('2024-06-03'),
      status: 'active'
    },
    {
      id: 2,
      title: "Gentle Yoga for Better Mobility",
      sessionTitle: "Session 2: Standing Poses and Balance",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      estimatedTime: "3h 15m left",
      totalTime: "5h 45m",
      expirationDate: new Date('2025-06-20'),
      purchaseDate: new Date('2024-06-20'),
      lastActivity: new Date('2024-06-02'),
      status: 'active'
    },
    {
      id: 3,
      title: "Digital Photography Fundamentals",
      sessionTitle: "Course Completed",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
      estimatedTime: "Completed",
      totalTime: "3h 20m",
      completedDate: "March 15, 2024",
      expirationDate: new Date('2025-03-10'),
      purchaseDate: new Date('2024-03-10'),
      completionDate: new Date('2024-03-15'),
      status: 'completed'
    },
    {
      id: 4,
      title: "Introduction to Social Media",
      sessionTitle: "Session 1: Getting Started with Facebook",
      progress: 20,
      totalLessons: 8,
      completedLessons: 2,
      estimatedTime: "4h 30m left",
      totalTime: "5h 45m",
      expirationDate: new Date('2023-01-15'),
      purchaseDate: new Date('2022-01-15'),
      lastActivity: new Date('2022-12-20'),
      status: 'expired'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (expirationDate: Date) => {
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isExpired = (course: any) => {
    const daysRemaining = getDaysRemaining(course.expirationDate);
    return daysRemaining < 0 && course.progress < 100;
  };

  // Categorize and sort courses
  const activeCourses = enrolledCourses
    .filter(course => course.status === 'active' && !isExpired(course))
    .sort((a, b) => {
      const aActivity = a.lastActivity || a.purchaseDate;
      const bActivity = b.lastActivity || b.purchaseDate;
      return bActivity.getTime() - aActivity.getTime();
    });

  const completedCourses = enrolledCourses
    .filter(course => course.status === 'completed')
    .sort((a, b) => {
      if (a.completionDate && b.completionDate) {
        return b.completionDate.getTime() - a.completionDate.getTime();
      }
      return 0;
    });

  const expiredCourses = enrolledCourses
    .filter(course => isExpired(course))
    .sort((a, b) => b.expirationDate.getTime() - a.expirationDate.getTime());

  const renderCourseCard = (course: any) => {
    const daysRemaining = getDaysRemaining(course.expirationDate);
    const expired = isExpired(course);
    
    return (
      <div key={course.id} className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-yutime-navy text-lg mb-2">{course.title}</h3>
            <p className="text-sm text-gray-500">{course.sessionTitle}</p>
          </div>
          {course.progress === 100 && (
            <Trophy className="h-6 w-6 text-yutime-gold" />
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            <span>{course.progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yutime-blue h-2 rounded-full transition-all duration-300" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {course.progress === 100 && course.completedDate && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              Completed on {course.completedDate}
            </p>
          </div>
        )}

        {expired && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700 font-medium">
              Expired
            </p>
          </div>
        )}

        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            Expires: {formatDate(course.expirationDate)}
            {!expired && daysRemaining > 0 && (
              <span className="ml-1">({daysRemaining} days remaining)</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {course.progress === 100 
                ? `Total: ${course.totalTime}` 
                : course.estimatedTime
              }
            </span>
          </div>
          <Button 
            className={expired 
              ? "bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              : "bg-[#2a9d8f] hover:bg-[#228b7a] text-white py-3 px-6 rounded-xl font-medium text-base transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            }
          >
            {expired 
              ? 'Repurchase Course' 
              : course.progress === 100 
                ? 'Revisit the course' 
                : 'Continue Learning'
            }
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">My Courses</h1>
        <p className="text-gray-600">Track your learning progress and continue where you left off</p>
      </div>

      <div className="space-y-8">
        {/* Active Courses */}
        {activeCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-yutime-navy mb-6">Active Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeCourses.map(renderCourseCard)}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-yutime-navy mb-6">Completed Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedCourses.map(renderCourseCard)}
            </div>
          </div>
        )}

        {/* Expired Courses */}
        {expiredCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-yutime-navy mb-6">Expired Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {expiredCourses.map(renderCourseCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
