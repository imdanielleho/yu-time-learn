
import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Course } from '@/data/courses';

interface CoursePlayerHeaderProps {
  course: Course;
  onBack: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  autoAdvance: boolean;
  setAutoAdvance: (enabled: boolean) => void;
  totalLessons: number;
  completedLessons: number;
}

const CoursePlayerHeader: React.FC<CoursePlayerHeaderProps> = ({
  course,
  onBack,
  sidebarOpen,
  setSidebarOpen,
  autoAdvance,
  setAutoAdvance,
  totalLessons,
  completedLessons
}) => {
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  return (
    <TooltipProvider>
      <header className={`bg-white border-b border-yutime-neutral/30 px-6 py-4 flex items-center justify-between relative z-10 shadow-soft transition-all duration-300 ${
        sidebarOpen ? 'mr-80' : ''
      }`}>
        <div className="flex items-center space-x-4 flex-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-yutime-text hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors min-w-[44px] min-h-[44px]"
              >
                <ArrowLeft size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>返回課程列表</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex items-center justify-between flex-1">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-lg font-serif font-medium text-yutime-primary">{course.title}</h1>
              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-yutime-text font-medium whitespace-nowrap">
                  上課進度 {Math.round(progressPercentage)}%
                </span>
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yutime-secondary transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar Toggle - Only show when sidebar is closed */}
        <div className="flex items-center space-x-4">
          {!sidebarOpen && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="text-yutime-text hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Open sidebar"
                >
                  <Menu size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>顯示課程內容</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </header>
    </TooltipProvider>
  );
};

export default CoursePlayerHeader;
