
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

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
    <section id="courses" className="section bg-gradient-to-b from-yutime-white to-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-yutime-charcoal mb-4">Featured Courses</h2>
          <p className="text-yutime-grey max-w-2xl mx-auto">
            Our most popular courses, designed with your learning goals in mind.
            Start your learning journey today.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link 
              key={course.id} 
              to={`/courses/${course.id}`} 
              className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-yutime-charcoal/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 z-20">
                  <Badge variant="outline" className="bg-yutime-gold/90 text-yutime-charcoal border-none font-medium shadow-sm">
                    {course.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2 py-1 rounded-md bg-white/90 text-yutime-charcoal text-xs font-medium">
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col p-5">
                <h3 className="text-xl font-bold mb-3 text-yutime-charcoal group-hover:text-yutime-purple transition-colors">
                  {course.title}
                </h3>
                <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
                  <span className="text-sm text-yutime-grey">{course.lessons} lessons</span>
                  <span className="text-sm text-yutime-grey">{course.duration}</span>
                </div>
                <div className="mt-4 flex items-center justify-end text-yutime-purple font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                  View Course <ArrowRight className="ml-1 w-4 h-4" />
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
