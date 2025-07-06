
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
  <div className="bg-white">
    <div className="container py-8">
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-yutime-primary hover:text-yutime-primary/80 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button 
              onClick={() => onPlay(course.title)}
              className="bg-white/90 hover:bg-white text-yutime-primary rounded-full p-4"
            >
              <Play size={24} />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="mb-4">
            <span className="bg-yutime-secondary/10 text-yutime-secondary px-4 py-2 rounded-full text-sm font-medium">
              {course.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-yutime-primary">{course.title}</h1>
          {course.instructor && (
            <p className="text-base text-yutime-text/70">
              Instructor: <span className="font-medium text-yutime-primary">{course.instructor}</span>
            </p>
          )}
          <p className="text-base text-yutime-text/70 leading-relaxed">{course.longDescription}</p>
          <div className="flex flex-wrap items-center gap-6 text-base text-yutime-text/60">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-yutime-text/60" />
              <span className="font-medium">{course.totalTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen size={16} className="text-yutime-text/60" />
              <span className="font-medium">{course.lessons} lessons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseHeader;
