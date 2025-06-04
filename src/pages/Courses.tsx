
import React from 'react';
import { Button } from "@/components/ui/button";
import { Timer } from 'lucide-react';

const Courses = () => {
  const availableCourses = [
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

  return (
    <div className="bg-white min-h-screen">
      <div className="container pt-32 pb-20">
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-display font-light text-black">All courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover new skills and expand your knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableCourses.map((course) => (
            <div key={course.id} className="card-minimal group">
              <div className="aspect-video overflow-hidden rounded-xl mb-6">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-2xl font-medium text-black">{course.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{course.description}</p>
                </div>
                
                <p className="text-xl font-medium text-black">HKD {course.price}</p>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Timer size={16} />
                    <span>{course.totalTime}</span>
                  </div>
                  <Button 
                    className="btn-secondary text-sm"
                    onClick={() => {
                      console.log(`Get started for free with course ${course.id}`);
                    }}
                  >
                    Start free
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
