
import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  return (
    <TooltipProvider>
      <header className={`bg-white border-b border-yutime-neutral/30 px-3 md:px-6 py-2 flex items-center justify-between relative z-10 shadow-soft transition-all duration-300 ${
        !isMobile && sidebarOpen ? 'mr-80' : ''
      }`}>
        <div className="flex items-center space-x-2 md:space-x-4 flex-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-yutime-text hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors min-w-[40px] min-h-[40px] md:min-w-[44px] md:min-h-[44px]"
              >
                <ArrowLeft size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>返回課程列表</p>
            </TooltipContent>
          </Tooltip>
          
          <div className="flex items-center justify-between flex-1">
            <div className={`flex ${isMobile ? 'flex-col items-start' : 'items-center justify-between'} w-full ${isMobile ? 'gap-2' : ''}`}>
              <h1 className="text-base md:text-lg font-serif font-medium text-yutime-primary truncate">{course.title}</h1>
              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm text-yutime-text font-medium whitespace-nowrap">
                  上課進度 {Math.round(progressPercentage)}%
                </span>
                <div className="w-24 md:w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yutime-secondary transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar Toggle - Only show on desktop when sidebar is closed */}
        <div className="flex items-center space-x-4">
          {!isMobile && !sidebarOpen && (
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
              <TooltipContent side="left" sideOffset={8}>
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
