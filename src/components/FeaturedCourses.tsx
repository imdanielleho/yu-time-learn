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
    <section id="courses" className="section">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-yutime-indigo mb-4">Featured Courses</h2>
          <p className="text-gray-700 max-w-2xl">
            Our most popular courses, designed with your learning goals in mind.
            Start your learning journey today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full group relative">
              <Link to={`/courses/${course.id}`} className="block">
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                  />
                  <div className="absolute top-2 right-2 bg-yutime-gold text-yutime-indigo px-3 py-1 rounded-full text-sm font-bold">
                    {course.level}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <div className="mb-3">
                    <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                  <p className="text-yutime-blue text-lg font-bold mb-4">HKD {course.price}</p>
                  <div className="mt-auto pt-4 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 gap-3">
                    <span className="text-sm text-gray-600">{course.totalTime}</span>
                    {/* CTA Button - below time on mobile, right side on desktop */}
                    <Button 
                      className="bg-yutime-indigo hover:bg-yutime-indigo/90 text-white text-sm px-4 py-2 w-full md:w-auto"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle free trial or course enrollment
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
