
import React from 'react';
import { Button } from "@/components/ui/button";

const Courses = () => {
  const availableCourses = [
    {
      id: 1,
      title: "Introduction to Social Media",
      description: "Learn to connect with family and friends safely on social platforms",
      duration: "3 hours",
      level: "Beginner",
      price: 880,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600"
    },
    {
      id: 2,
      title: "Basic Computer Skills",
      description: "Master essential computer operations and file management",
      duration: "4 hours",
      level: "Beginner",
      price: 880,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600"
    },
    {
      id: 3,
      title: "Financial Planning Basics",
      description: "Learn to manage your finances and plan for the future",
      duration: "5 hours",
      level: "Beginner",
      price: 880,
      category: "Finance",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600"
    },
    {
      id: 4,
      title: "Healthy Cooking Essentials",
      description: "Discover nutritious recipes and cooking techniques",
      duration: "3.5 hours",
      level: "Beginner",
      price: 880,
      category: "Health",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600"
    },
    {
      id: 5,
      title: "Digital Photography Fundamentals",
      description: "Learn to capture beautiful photos using any camera, with simple composition techniques",
      duration: "5 hours 15 min",
      level: "Beginner",
      price: 880,
      category: "Creative Arts",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600"
    },
    {
      id: 6,
      title: "Smartphone Photography Tips",
      description: "Master smartphone camera features and photo editing apps",
      duration: "2 hours 30 min",
      level: "Intermediate",
      price: 880,
      category: "Creative Arts",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yutime-navy mb-2">All Courses</h1>
        <p className="text-gray-600">Discover new skills and expand your knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableCourses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200/50 rounded-lg overflow-hidden flex flex-col h-full group hover:border-gray-300 hover:bg-white/90 focus-within:ring-2 focus-within:ring-yutime-indigo/20 transition-all duration-300">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
              />
              <div className="absolute top-3 right-3 bg-yutime-gold text-yutime-indigo px-3 py-1 rounded-full text-sm font-bold">
                {course.level}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col p-6">
              <div className="mb-3">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-yutime-indigo">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">{course.description}</p>
              
              <p className="text-yutime-blue text-lg font-bold mb-4">HKD {course.price}</p>
              
              <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <Button 
                  className="bg-yutime-indigo hover:bg-yutime-indigo/90 text-white text-sm px-4 py-2 w-full md:w-auto"
                  onClick={() => {
                    console.log(`Get started for free with course ${course.id}`);
                  }}
                >
                  Get started for free
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
