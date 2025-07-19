
import React from 'react';
import { ArrowLeft, Menu, X, Settings, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Course } from '@/data/courses';
import { useIsMobile } from "@/hooks/use-mobile";

interface CoursePlayerHeaderProps {
  course: Course;
  onBack: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  autoAdvance: boolean;
  setAutoAdvance: (auto: boolean) => void;
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
      <div className="bg-white border-b border-yutime-neutral/30 px-4 py-3 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-yutime-neutral/40 min-w-[44px] min-h-[44px]"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="hidden sm:block">
            <h1 className="text-lg font-serif font-medium text-yutime-primary truncate max-w-md">
              {course.title}
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <div className="text-sm text-yutime-text/70">
                進度 {completedLessons}/{totalLessons}
              </div>
              <Progress value={progressPercentage} className="w-24 h-2" />
              <div className="text-sm text-yutime-text/70">
                {Math.round(progressPercentage)}%
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2">
            <Label htmlFor="auto-advance" className="text-sm text-yutime-text/70">
              自動播放下一個
            </Label>
            <Switch
              id="auto-advance"
              checked={autoAdvance}
              onCheckedChange={setAutoAdvance}
            />
          </div>

          {!isMobile && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hover:bg-yutime-neutral/40 min-w-[44px] min-h-[44px]"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="end" className="z-50">
                <p>{sidebarOpen ? '關閉側邊欄' : '開啟側邊欄'}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CoursePlayerHeader;
