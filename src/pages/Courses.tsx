
import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Courses = () => {
  const availableCourses = [
    {
      id: 1,
      title: "Introduction to Social Media",
      description: "Learn to connect with family and friends safely on social platforms",
      rating: 4.8,
      students: 1250,
      duration: "3 hours",
      level: "Beginner",
      price: "$29",
      category: "Technology"
    },
    {
      id: 2,
      title: "Basic Computer Skills",
      description: "Master essential computer operations and file management",
      rating: 4.9,
      students: 2100,
      duration: "4 hours",
      level: "Beginner",
      price: "$39",
      category: "Technology"
    },
    {
      id: 3,
      title: "Financial Planning Basics",
      description: "Learn to manage your finances and plan for the future",
      rating: 4.7,
      students: 890,
      duration: "5 hours",
      level: "Beginner",
      price: "$49",
      category: "Finance"
    },
    {
      id: 4,
      title: "Healthy Cooking Essentials",
      description: "Discover nutritious recipes and cooking techniques",
      rating: 4.6,
      students: 1580,
      duration: "3.5 hours",
      level: "Beginner",
      price: "$35",
      category: "Health"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">All Courses</h1>
        <p className="text-gray-600">Discover new skills and expand your knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-yutime-blue to-yutime-indigo"></div>
            
            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs font-medium text-yutime-blue bg-yutime-blue/10 px-2 py-1 rounded">
                  {course.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-yutime-navy mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yutime-gold text-yutime-gold" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-yutime-navy">{course.price}</span>
                <Button className="bg-yutime-blue hover:bg-yutime-blue/90">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
