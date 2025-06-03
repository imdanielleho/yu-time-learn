
import React from 'react';
import { BookOpen, Clock, Trophy } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MyCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: "Smartphone Basics for Everyday Use",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      estimatedTime: "1h 30m left",
      totalTime: "4h 30m"
    },
    {
      id: 2,
      title: "Gentle Yoga for Better Mobility",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      estimatedTime: "3h 15m left",
      totalTime: "5h 45m"
    },
    {
      id: 3,
      title: "Digital Photography Fundamentals",
      progress: 100,
      totalLessons: 10,
      completedLessons: 10,
      estimatedTime: "Completed",
      totalTime: "3h 20m",
      completedDate: "March 15, 2024"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">My Courses</h1>
        <p className="text-gray-600">Track your learning progress and continue where you left off</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-yutime-navy text-lg">{course.title}</h3>
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
                className="bg-yutime-blue hover:bg-yutime-blue/90"
              >
                {course.progress === 100 ? 'Revisit the course' : 'Continue Learning'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
