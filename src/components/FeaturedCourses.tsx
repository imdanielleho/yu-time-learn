
import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    duration: "4 weeks",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600"
  },
  {
    id: 2,
    title: "Gentle Yoga for Better Mobility",
    category: "Health & Wellness",
    level: "All Levels",
    lessons: 12,
    duration: "6 weeks",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600"
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts",
    level: "Beginner",
    lessons: 10,
    duration: "5 weeks",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600"
  },
  {
    id: 4,
    title: "Managing Personal Finances",
    category: "Finance",
    level: "Intermediate",
    lessons: 6,
    duration: "3 weeks",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600"
  },
  {
    id: 5,
    title: "Introduction to Social Media",
    category: "Technology",
    level: "Beginner",
    lessons: 7,
    duration: "4 weeks",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600"
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
            <Link key={course.id} to={`/courses/${course.id}`} className="card hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full group">
              <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" 
                />
              </div>
              <div className="flex-1 flex flex-col p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
                  <span className="text-yutime-blue text-sm font-medium">{course.level}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
