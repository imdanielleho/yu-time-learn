
import React from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
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
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between relative z-20">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{course.title}</h1>
          <p className="text-sm text-gray-500">by {course.instructor}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center space-x-2"
        >
          {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          <span>{sidebarOpen ? '隱藏課程內容' : '顯示課程內容'}</span>
        </Button>
      </div>
    </header>
  );
};

export default CoursePlayerHeader;
