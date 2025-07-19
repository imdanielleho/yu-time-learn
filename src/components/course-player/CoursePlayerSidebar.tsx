import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Course } from '@/data/courses';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  hasTranscript: boolean;
}

interface Chapter {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface CoursePlayerSidebarProps {
  course: Course;
  chapters: Chapter[];
  currentLesson: number;
  onLessonSelect: (index: number) => void;
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  totalLessons: number;
  completedLessons: number;
}

const CoursePlayerSidebar: React.FC<CoursePlayerSidebarProps> = ({
  course,
  chapters,
  currentLesson,
  onLessonSelect,
  isOpen,
  setSidebarOpen,
  totalLessons,
  completedLessons
}) => {
  const isMobile = useIsMobile();
  // Expand all chapters by default
  const [expandedChapters, setExpandedChapters] = useState<number[]>(chapters.map(chapter => chapter.id));

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const getLessonGlobalIndex = (chapterIndex: number, lessonIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < chapterIndex; i++) {
      globalIndex += chapters[i].lessons.length;
    }
    return globalIndex + lessonIndex;
  };

  const getCurrentLessonChapterAndIndex = () => {
    let globalIndex = 0;
    for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
      const chapter = chapters[chapterIndex];
      if (globalIndex + chapter.lessons.length > currentLesson) {
        return { chapterIndex, lessonIndex: currentLesson - globalIndex };
      }
      globalIndex += chapter.lessons.length;
    }
    return { chapterIndex: 0, lessonIndex: 0 };
  };

  const { chapterIndex: currentChapterIndex, lessonIndex: currentLessonIndex } = getCurrentLessonChapterAndIndex();

  return (
    <TooltipProvider>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed ${isMobile ? 'inset-0' : 'right-0 top-0 h-full w-80'} bg-white ${isMobile ? '' : 'border-l border-yutime-neutral/30'} transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : isMobile ? 'translate-x-full' : 'translate-x-full'
      } ${isMobile ? 'z-40' : 'z-20'} flex flex-col ${isMobile ? '' : 'shadow-wellness'}`}>
        
        {/* Mobile Header Bar */}
        {isMobile && (
          <div className="bg-yutime-primary text-white p-4 flex items-center justify-between">
            <h1 className="text-lg font-serif font-medium">{course.title}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/10 min-w-[44px] min-h-[44px]"
            >
              <X size={20} />
            </Button>
          </div>
        )}

        {/* Desktop Toggle button at top */}
        {!isMobile && (
          <div className="p-4 border-b border-yutime-neutral/30 flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(!isOpen)}
                  className="flex items-center space-x-2 border-yutime-neutral/50 text-yutime-text hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors min-w-[44px] min-h-[44px]"
                >
                  <X size={16} />
                  <span>隱藏課程內容</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>隱藏課程內容</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* Header */}
        <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-yutime-neutral/30 flex-shrink-0`}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
            <div className="text-sm text-yutime-text/80 font-medium">
              {totalLessons} 個單元・635 分鐘
            </div>
          </div>
          <div className="text-sm text-yutime-text font-medium">
            已完成: {completedLessons}/{totalLessons}
          </div>
        </div>
        
        {/* Chapters and Lessons - Independently scrollable */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'max-h-[calc(100vh-200px)]' : 'max-h-[calc(100vh-200px)]'}`}>
          {chapters.map((chapter, chapterIdx) => (
            <div key={chapter.id} className="border-b border-yutime-neutral/20">
              {/* Chapter Header with background shading */}
              <div
                onClick={() => toggleChapter(chapter.id)}
                className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'} cursor-pointer hover:bg-gray-100 transition-colors 
                  bg-gray-50
                  ${chapterIdx === 0 ? 'border-t border-gray-200' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  {expandedChapters.includes(chapter.id) ? (
                    <ChevronDown size={16} className="text-yutime-text" />
                  ) : (
                    <ChevronRight size={16} className="text-yutime-text" />
                  )}
                  <div>
                    <h3 className={`font-semibold text-yutime-text ${isMobile ? 'text-sm' : 'text-base'} leading-tight`}>{chapter.title}</h3>
                    <div className="text-xs text-yutime-text/70 mt-1">{chapter.duration}</div>
                  </div>
                </div>
              </div>
              
              {/* Lessons */}
              {expandedChapters.includes(chapter.id) && (
                <div className="bg-white">
                  {chapter.lessons.map((lesson, lessonIdx) => {
                    const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                    const isCurrentLesson = globalIndex === currentLesson;
                    
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          onLessonSelect(globalIndex);
                          if (isMobile) setSidebarOpen(false); // Close sidebar on mobile after selection
                        }}
                        className={`flex items-center justify-between ${isMobile ? 'p-3 pl-8' : 'p-4 pl-12'} cursor-pointer transition-colors ${
                          isCurrentLesson 
                            ? 'bg-yutime-secondary/10 border-l-2 border-yutime-secondary' 
                            : 'hover:bg-yutime-neutral/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle size={16} className="text-yutime-secondary" />
                            ) : isCurrentLesson ? (
                              <Play size={16} className="text-yutime-secondary" />
                            ) : (
                              <Circle size={16} className="text-yutime-text/40" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium leading-tight ${
                              isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                            }`}>
                              {lesson.title}
                            </p>
                          </div>
                          <div className="text-xs text-yutime-text/60 ml-auto">
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CoursePlayerSidebar;