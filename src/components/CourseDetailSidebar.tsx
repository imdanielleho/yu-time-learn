
import React from 'react';
import { X, Clock, Users, Star, Play } from 'lucide-react';
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
    <div className="p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Course Details</h1>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={24} />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Course Image */}
        <div className="relative h-48 rounded-lg overflow-hidden">
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

        {/* Course Info */}
        <div>
          <span className="bg-yutime-sand_dark px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-4">
            {course.longDescription || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
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
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-yutime-blue mb-1">
              HKD {course.price}
            </div>
            <div className="text-gray-600 text-sm">One-time payment</div>
          </div>

          <div className="space-y-3">
            <Button className={`w-full py-3 ${
              course.isPurchased 
                ? 'bg-yutime-blue hover:bg-yutime-blue/90' 
                : 'bg-yutime-indigo hover:bg-yutime-indigo/90'
            } text-white`}>
              {course.isPurchased ? 'Continue Learning' : 'Enroll Now'}
            </Button>
            {!course.isPurchased && (
              <Button variant="outline" className="w-full py-3">
                Try Free Preview
              </Button>
            )}
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-3 text-sm bg-gray-50 rounded-lg p-4">
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

        {/* Curriculum */}
        {course.curriculum && (
          <div>
            <h3 className="text-lg font-bold mb-4">Course Curriculum</h3>
            <div className="space-y-2">
              {course.curriculum.map((lesson, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="bg-yutime-indigo text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="text-sm">{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailSidebar;
