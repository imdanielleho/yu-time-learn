
import React from "react";
import { ArrowLeft, Play, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CourseHeaderProps {
  course: {
    id: number;
    title: string;
    category: string;
    instructor?: string;
    totalTime: string;
    lessons: number;
    image: string;
    longDescription: string;
  };
  onPlay: (title: string, videoUrl?: string) => void;
}

const CourseHeader = ({ course, onPlay }: CourseHeaderProps) => (
  <div className="bg-gradient-to-b from-gray-50 to-white">
    <div className="container py-12">
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-yutime-primary mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button 
              onClick={() => onPlay(course.title)}
              className="bg-white/95 hover:bg-white text-yutime-primary rounded-full p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play size={28} />
            </Button>
          </div>
        </div>
        <div className="space-y-6 flex flex-col justify-center">
          <div className="mb-2">
            <span className="bg-yutime-secondary/10 text-yutime-secondary px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase">
              {course.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 leading-tight">{course.title}</h1>
          {course.instructor && (
            <p className="text-lg text-gray-600">
              by <span className="font-semibold text-yutime-primary">{course.instructor}</span>
            </p>
          )}
          <p className="text-lg text-gray-600 leading-relaxed font-light">{course.longDescription}</p>
          <div className="flex flex-wrap items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock size={18} className="text-gray-600" />
              </div>
              <span className="font-medium text-lg">{course.totalTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BookOpen size={18} className="text-gray-600" />
              </div>
              <span className="font-medium text-lg">{course.lessons} lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseHeader;
