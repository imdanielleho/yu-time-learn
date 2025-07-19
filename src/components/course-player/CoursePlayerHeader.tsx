
import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Course } from '@/data/courses';

interface CoursePlayerHeaderProps {
  course: Course;
  onBack: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  autoAdvance: boolean;
  setAutoAdvance: (enabled: boolean) => void;
}

const CoursePlayerHeader: React.FC<CoursePlayerHeaderProps> = ({
  course,
  onBack,
  sidebarOpen,
  setSidebarOpen,
  autoAdvance,
  setAutoAdvance
}) => {
  return (
    <header className="bg-yutime-primary/95 backdrop-blur-md border-b border-yutime-primary/20 px-6 py-3 flex items-center justify-between relative z-10">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-yutime-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">財</span>
          </div>
          <div>
            <h1 className="text-white font-medium text-base">{course.title}</h1>
            <p className="text-white/60 text-sm">by {course.instructor}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={18} />
        </Button>
      </div>
    </header>
  );
};

export default CoursePlayerHeader;
