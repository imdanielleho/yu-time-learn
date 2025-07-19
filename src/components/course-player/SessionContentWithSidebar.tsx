import React from 'react';
import { ChevronDown, ChevronRight, Circle, Play, Check, Folder, Download, FileText, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

interface SessionContentWithSidebarProps {
  lesson: Lesson;
  course: Course;
  chapters: Chapter[];
  currentLesson: number;
  onLessonSelect: (index: number) => void;
  totalLessons: number;
  completedLessons: number;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const SessionContentWithSidebar: React.FC<SessionContentWithSidebarProps> = ({
  lesson,
  course,
  chapters,
  currentLesson,
  onLessonSelect,
  totalLessons,
  completedLessons,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const getLessonGlobalIndex = (chapterIndex: number, lessonIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < chapterIndex; i++) {
      globalIndex += chapters[i].lessons.length;
    }
    return globalIndex + lessonIndex;
  };

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
    <div className="flex-1 bg-white">
      {/* Mobile Course Content */}
      <div className="block md:hidden">
        <div className="p-4 border-b border-yutime-neutral/30">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
            <div className="text-sm text-yutime-text/80 font-medium">
              {totalLessons} 個單元・635 分鐘
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <Accordion type="multiple" defaultValue={chapters.map(chapter => `chapter-${chapter.id}`)}>
            {chapters.map((chapter, chapterIdx) => (
              <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`} className="border-b border-yutime-neutral/20">
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div>
                        <h3 className="font-semibold text-yutime-text text-base leading-tight text-left">{chapter.title}</h3>
                        <div className="text-xs text-yutime-text/70 mt-1">{chapter.duration}</div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-0">
                  <div className="bg-white">
                    {chapter.lessons.map((chapterLesson, lessonIdx) => {
                      const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                      const isCurrentLesson = globalIndex === currentLesson;
                      
                      return (
                        <div
                          key={chapterLesson.id}
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
                              {chapterLesson.completed ? (
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
                                  {chapterLesson.title}
                                </p>
                              </div>
                              
                              {/* Second Row - Duration left, Resources right */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-xs text-yutime-text/60">
                                  {chapterLesson.duration}
                                </div>
                                
                                {chapterLesson.hasResources && chapterLesson.resources && (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-6 px-2 flex items-center space-x-1 hover:bg-yutime-secondary/10 border border-yutime-secondary/40 hover:border-yutime-secondary text-yutime-secondary hover:text-yutime-secondary bg-yutime-secondary/5 transition-all duration-200 shadow-sm hover:shadow-md"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Folder size={12} className="text-yutime-secondary" />
                                        <span className="text-xs font-medium">課程資源</span>
                                        <ChevronDown size={10} className="text-yutime-secondary ml-1" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-3" align="end">
                                      <div className="space-y-2">
                                        {chapterLesson.resources.map((resource, index) => (
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Desktop Course Content */}
      <div className="hidden md:block p-8">
        <h2 className="text-2xl font-serif font-medium text-yutime-primary mb-4">{lesson.title}</h2>
        <p className="text-yutime-text">{lesson.description}</p>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-yutime-text mb-2">課程內容</h3>
          <ul className="list-disc pl-5 text-yutime-text">
            <li>影片</li>
            {lesson.hasTranscript && <li>文字稿</li>}
            {lesson.hasResources && <li>相關資源</li>}
          </ul>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="px-4 py-2 rounded-md text-yutime-text border-yutime-neutral/50 hover:bg-yutime-neutral/50 hover:text-yutime-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一堂
          </Button>
          <Button 
            variant="default"
            onClick={onNext}
            disabled={!canGoNext}
          >
            下一堂
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionContentWithSidebar;
