
import React from 'react';

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
  }
];

const FeaturedCourses = () => {
  return (
    <section id="courses" className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-yutime-navy mb-4">Featured Courses</h2>
            <p className="text-gray-700 max-w-2xl">
              Our most popular courses, designed with your learning goals in mind.
              Start your learning journey today.
            </p>
          </div>
          <a href="#" className="mt-4 md:mt-0 text-yutime-blue font-medium text-lg hover:underline">
            View all courses
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col h-full">
              <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                />
              </div>
              <div className="flex-1 flex flex-col">
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
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="btn-primary">Browse All Courses</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
