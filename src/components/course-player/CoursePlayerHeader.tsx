
import React from 'react';
import { ArrowLeft, Menu, X, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
    <header className="bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-white hover:bg-gray-800"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-white font-semibold text-lg">{course.title}</h1>
          <p className="text-gray-400 text-sm">{course.instructor}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <Settings size={16} />
          <span className="text-sm">Auto-advance</span>
          <Switch 
            checked={autoAdvance}
            onCheckedChange={setAutoAdvance}
            aria-label="Toggle auto-advance to next lesson"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-gray-800"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default CoursePlayerHeader;
