
import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronDown, ChevronRight, X, Folder, Download, FileText, Image, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Course } from '@/data/courses';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  hasTranscript: boolean;
  hasResources?: boolean;
  resources?: { name: string; type: string; url: string; }[];
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

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'image':
        return <Image size={16} className="text-blue-500" />;
      default:
        return <Download size={16} className="text-gray-500" />;
    }
  };

  const handleResourceDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <TooltipProvider>
      <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-yutime-neutral/30 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-20 flex flex-col shadow-wellness`}>
        {/* Toggle button at top */}
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

        {/* Header */}
        <div className="p-6 border-b border-yutime-neutral/30 flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {chapters.map((chapter, chapterIdx) => (
            <div key={chapter.id} className="border-b border-yutime-neutral/20">
              {/* Chapter Header with background shading */}
              <div
                onClick={() => toggleChapter(chapter.id)}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors 
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
                    <h3 className="font-semibold text-yutime-text text-base leading-tight">{chapter.title}</h3>
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
                        onClick={() => onLessonSelect(globalIndex)}
                        className={`p-4 pl-12 cursor-pointer transition-colors ${
                          isCurrentLesson 
                            ? 'bg-yutime-secondary/10 border-l-2 border-yutime-secondary' 
                            : 'hover:bg-yutime-neutral/40'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Completion Status Icon */}
                          <div className="flex-shrink-0 mt-1">
                            {lesson.completed ? (
                              <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                                <Check size={10} className="text-white font-bold" strokeWidth={3} />
                              </div>
                            ) : isCurrentLesson ? (
                              <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                                <Play size={10} className="text-white ml-0.5" />
                              </div>
                            ) : (
                              <Circle size={16} className="text-yutime-text/40" />
                            )}
                          </div>
                          
                          {/* Lesson Content */}
                          <div className="flex-1 min-w-0">
                            {/* First Row - Full width lesson title */}
                            <div className="w-full">
                              <p className={`text-sm font-medium leading-tight ${
                                isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                              }`}>
                                {lesson.title}
                              </p>
                            </div>
                            
                            {/* Second Row - Duration left, Resources right */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-yutime-text/60">
                                {lesson.duration}
                              </div>
                              
                               {lesson.hasResources && lesson.resources && (
                                 <Popover>
                                   <PopoverTrigger asChild>
                                     <Button
                                       variant="outline"
                                       size="sm"
                                       className="h-7 px-3 flex items-center space-x-2 hover:bg-yutime-secondary/10 border border-yutime-secondary/40 hover:border-yutime-secondary text-yutime-secondary hover:text-yutime-secondary bg-yutime-secondary/5 transition-all duration-200 shadow-sm hover:shadow-md"
                                       onClick={(e) => e.stopPropagation()}
                                     >
                                       <Folder size={14} className="text-yutime-secondary" />
                                       <span className="text-xs font-medium">課程資源</span>
                                     </Button>
                                   </PopoverTrigger>
                                    <PopoverContent className="w-64 p-3" align="end">
                                      <div className="space-y-2">
                                        {lesson.resources.map((resource, index) => (
                                           <div 
                                             key={index}
                                             className="flex items-center justify-between p-2 border border-yutime-neutral/40 rounded-lg hover:bg-yutime-neutral/30 transition-colors"
                                           >
                                             <div className="flex items-center space-x-2">
                                               {getResourceIcon(resource.type)}
                                               <div>
                                                 <p className="font-medium text-yutime-text text-xs">{resource.name}</p>
                                                 <p className="text-xs text-yutime-text/60">{resource.type}</p>
                                               </div>
                                             </div>
                                             <Button
                                               onClick={() => handleResourceDownload(resource.url)}
                                               className="h-6 w-6 p-0 bg-yutime-secondary hover:bg-yutime-secondary/80"
                                               size="sm"
                                             >
                                               <Download size={12} className="text-white" />
                                             </Button>
                                           </div>
                                         ))}
                                       </div>
                                     </PopoverContent>
                                </Popover>
                              )}
                            </div>
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
