
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
    <header className="bg-white border-b border-yutime-neutral/20 px-6 py-4 flex items-center justify-between shadow-soft">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-yutime-charcoal hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="space-y-1">
          <h1 className="text-yutime-charcoal font-heading font-semibold text-xl leading-tight">{course.title}</h1>
          <p className="text-yutime-text/70 text-sm font-medium">{course.instructor}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3 text-yutime-charcoal">
          <Settings size={18} className="text-yutime-primary" />
          <span className="text-sm font-medium">Auto-advance</span>
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
          className="text-yutime-charcoal hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default CoursePlayerHeader;
