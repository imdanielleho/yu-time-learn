
import React from 'react';
import { ArrowLeft, Clock, Users, Star, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: number;
  totalTime: string;
  image: string;
  price: number;
  description: string;
  longDescription?: string;
  instructor?: string;
  rating?: number;
  students?: number;
  curriculum?: string[];
  isPurchased?: boolean;
}

interface CourseDetailSidebarProps {
  course: Course;
  onClose: () => void;
}

const CourseDetailSidebar = ({ course, onClose }: CourseDetailSidebarProps) => {
  return (
    <div className="p-6">
      <button 
        onClick={onClose}
        className="inline-flex items-center space-x-2 text-yutime-blue hover:text-yutime-blue/80 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Courses</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">
              {course.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-gray-600 mb-6">
            {course.longDescription || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{course.totalTime}</span>
            </div>
            {course.students && (
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>{course.students} students</span>
              </div>
            )}
            {course.rating && (
              <div className="flex items-center space-x-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{course.rating} rating</span>
              </div>
            )}
          </div>

          {/* Course Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button className="bg-white/90 hover:bg-white text-yutime-navy rounded-full p-4">
                <Play size={24} />
              </Button>
            </div>
          </div>

          {/* Curriculum */}
          {course.curriculum && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {course.curriculum.map((lesson, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-yutime-blue mb-2">
                  HKD {course.price}
                </div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <div className="space-y-4 mb-6">
                <Button className={`w-full py-3 text-white ${
                  course.isPurchased 
                    ? 'bg-yutime-blue hover:bg-yutime-blue/90' 
                    : 'bg-yutime-indigo hover:bg-yutime-indigo/90'
                }`}>
                  {course.isPurchased ? 'Continue Learning' : 'Enroll Now'}
                </Button>
                {!course.isPurchased && (
                  <Button variant="outline" className="w-full py-3">
                    Try Free Preview
                  </Button>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lessons:</span>
                  <span className="font-medium">{course.lessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{course.totalTime}</span>
                </div>
                {course.instructor && (
                  <div className="flex justify-between">
                    <span>Instructor:</span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSidebar;
