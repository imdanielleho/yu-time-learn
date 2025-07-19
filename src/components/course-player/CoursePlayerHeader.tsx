
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
              <div className="flex items-center space-x-4 min-w-[200px]">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yutime-text/60">課程進度</span>
                    <span className="text-yutime-text font-medium">{completedLessons}/{totalLessons}</span>
                  </div>
                  <Progress value={progressPercentage} className="w-32 h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-yutime-text hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors min-w-[44px] min-h-[44px]"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                <Menu size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sidebarOpen ? "隱藏課程內容" : "顯示課程內容"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default CoursePlayerHeader;
