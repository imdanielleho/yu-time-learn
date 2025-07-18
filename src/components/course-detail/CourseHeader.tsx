import React, { useState } from "react";
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
}
const CourseHeader = ({
  course
}: CourseHeaderProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return <div className="bg-white">
    <div className="container py-8">
      <Link to="/" className="inline-flex items-center space-x-2 text-yutime-primary hover:text-yutime-primary/80 mb-6">
        <ArrowLeft size={20} />
        <span>返回主頁</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full h-full object-cover"
            controls
            poster={course.image}
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          />
          {!isVideoPlaying && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg">
                <Play size={24} className="text-yutime-primary ml-1" />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div className="mb-4">
            <span className="bg-yutime-secondary/10 text-yutime-secondary px-4 py-2 rounded-full text-sm font-medium">
              {course.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-yutime-primary">{course.title}</h1>
          {course.instructor && <p className="text-base text-yutime-text/70">
              Instructor: <span className="font-medium text-yutime-primary">{course.instructor}</span>
            </p>}
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
  </div>;
};
export default CourseHeader;