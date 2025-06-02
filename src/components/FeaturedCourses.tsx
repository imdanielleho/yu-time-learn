
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    totalTime: "3 hours 20 min",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600",
    price: 880,
    description: "Master essential smartphone skills for daily use, from messaging to apps."
  },
  {
    id: 2,
    title: "Gentle Yoga for Better Mobility",
    category: "Health & Wellness",
    level: "All Levels",
    lessons: 12,
    totalTime: "4 hours 45 min",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600",
    price: 880,
    description: "Improve flexibility and reduce pain with gentle, age-appropriate yoga practices."
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts",
    level: "Beginner",
    lessons: 10,
    totalTime: "5 hours 15 min",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600",
    price: 880,
    description: "Learn to capture beautiful photos using any camera, with simple composition techniques."
  },
  {
    id: 4,
    title: "Managing Personal Finances",
    category: "Finance",
    level: "Intermediate",
    lessons: 6,
    totalTime: "2 hours 30 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600",
    price: 880,
    description: "Organize your finances, reduce debt, and plan for a secure retirement."
  },
  {
    id: 5,
    title: "Introduction to Social Media",
    category: "Technology",
    level: "Beginner",
    lessons: 7,
    totalTime: "3 hours 45 min",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600",
    price: 880,
    description: "Connect with family and friends across popular social media platforms safely."
  }
];

const FeaturedCourses = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Featured Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our most popular courses, designed with your learning goals in mind.
            Start your learning journey today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 transition-all duration-300 flex flex-col h-full group">
              <Link to={`/courses/${course.id}`} className="block flex-1 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {course.level}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col p-6">
                  <div className="mb-4">
                    <span className="inline-block bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    {course.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-gray-900">HKD {course.price}</p>
                      <span className="text-sm text-gray-500">{course.totalTime}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 py-3 text-sm font-medium transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(`Get started for free with course ${course.id}`);
                      }}
                    >
                      Get started for free
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
