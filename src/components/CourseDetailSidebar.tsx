
import React from 'react';
import { ArrowLeft, Clock, Star, Play, Heart } from 'lucide-react';
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
    <div className="p-6 bg-yutime-warmCream min-h-full">
      <button 
        onClick={onClose}
        className="inline-flex items-center space-x-2 text-yutime-coral hover:text-yutime-coral/80 mb-8 group transition-all duration-300"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Courses</span>
      </button>

      <div className="space-y-8">
        {/* Course Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2">
            <Heart size={16} className="text-yutime-coral" />
            <span className="bg-yutime-coral/10 text-yutime-coral px-3 py-1 rounded-full text-sm font-medium border border-yutime-coral/20">
              {course.category}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-yutime-coral leading-tight">{course.title}</h1>
          <p className="text-lg text-yutime-richBrown leading-relaxed">
            {course.longDescription || course.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-yutime-richBrown">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-yutime-coral" />
              <span>{course.totalTime}</span>
            </div>
            {course.students && (
              <div className="flex items-center space-x-2">
                <span className="text-yutime-coral">👥</span>
                <span>{course.students} learners</span>
              </div>
            )}
            {course.rating && (
              <div className="flex items-center space-x-2">
                <Star size={16} className="fill-yutime-sunshine text-yutime-sunshine" />
                <span>{course.rating} rating</span>
              </div>
            )}
          </div>
        </div>

        {/* Course Image */}
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-warm hover-lift">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-yutime-coral/30 to-transparent flex items-center justify-center">
            <Button className="bg-yutime-softWhite/95 hover:bg-yutime-softWhite text-yutime-coral rounded-full p-4 shadow-warm hover-lift">
              <Play size={20} />
            </Button>
          </div>
          
          {/* Encouraging badges */}
          <div className="absolute top-4 left-4 bg-yutime-sunshine text-yutime-deepBrown px-3 py-1 rounded-full text-xs font-medium shadow-soft">
            ✨ Popular Choice
          </div>
        </div>

        {/* Pricing Card */}
        <div className="card-warm shadow-warm">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-yutime-coral mb-2">
              HKD {course.price}
            </div>
            <div className="text-yutime-richBrown">One-time investment in yourself</div>
          </div>

          <div className="space-y-4 mb-6">
            <Button className={`w-full py-3 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
              course.isPurchased 
                ? 'bg-yutime-coral hover:bg-yutime-coral/90 shadow-soft' 
                : 'bg-yutime-coral hover:bg-yutime-coral/90 shadow-warm'
            }`}>
              {course.isPurchased ? '🎯 Continue Learning' : '🚀 Start Your Journey'}
            </Button>
            {!course.isPurchased && (
              <Button variant="outline" className="w-full py-3 rounded-xl border-yutime-coral/30 text-yutime-coral hover:bg-yutime-coral/5 font-medium">
                👀 Try Free Preview
              </Button>
            )}
          </div>

          <div className="space-y-3 text-sm border-t border-yutime-coral/20 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-yutime-richBrown">Level:</span>
              <span className="font-medium text-yutime-coral bg-yutime-coral/10 px-2 py-1 rounded-lg">{course.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yutime-richBrown">Lessons:</span>
              <span className="font-medium text-yutime-coral">{course.lessons} chapters</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-yutime-richBrown">Duration:</span>
              <span className="font-medium text-yutime-coral">{course.totalTime}</span>
            </div>
            {course.instructor && (
              <div className="flex justify-between items-center">
                <span className="text-yutime-richBrown">Guide:</span>
                <span className="font-medium text-yutime-coral">{course.instructor}</span>
              </div>
            )}
          </div>
        </div>

        {/* Curriculum */}
        {course.curriculum && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-yutime-coral">Your Learning Path</h2>
            <div className="space-y-3">
              {course.curriculum.map((lesson, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-yutime-softWhite rounded-xl border border-yutime-lightCoral hover-lift">
                  <span className="bg-yutime-coral text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-yutime-richBrown leading-relaxed">{lesson}</span>
                </div>
              ))}
            </div>
            
            {/* Encouraging message */}
            <div className="bg-gradient-to-r from-yutime-coral/5 to-yutime-coral/5 p-4 rounded-xl border border-yutime-coral/20">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌟</span>
                <div>
                  <p className="text-yutime-coral font-medium text-sm">You're capable of amazing growth!</p>
                  <p className="text-yutime-richBrown text-xs">Take it one lesson at a time</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailSidebar;
