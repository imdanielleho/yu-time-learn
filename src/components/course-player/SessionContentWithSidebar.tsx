
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Play, ChevronDown, Download, FileText, Image, Check, Folder } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();
  const [expandedChapters, setExpandedChapters] = useState<number[]>(chapters.map(chapter => chapter.id));
  
  // Set default active tab to "課程內容" on mobile
  const [activeTab, setActiveTab] = useState(isMobile ? "content" : "description");

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

  const handleLessonClick = (globalIndex: number) => {
    if (globalIndex === currentLesson) {
      return;
    }
    onLessonSelect(globalIndex);
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="description">課程介紹</TabsTrigger>
            <TabsTrigger value="content">課程內容</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-yutime-primary mb-3">課程描述</h3>
              <p className="text-yutime-text leading-relaxed">
                {lesson.description}
              </p>
            </div>
            
            {lesson.hasResources && lesson.resources && (
              <div>
                <h3 className="text-xl font-semibold text-yutime-primary mb-3">課程資源</h3>
                <div className="space-y-2">
                  {lesson.resources.map((resource, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border border-yutime-neutral/40 rounded-lg hover:bg-yutime-neutral/30 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getResourceIcon(resource.type)}
                        <div>
                          <p className="font-medium text-yutime-text">{resource.name}</p>
                          <p className="text-sm text-yutime-text/60">{resource.type}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleResourceDownload(resource.url)}
                        className="bg-yutime-secondary hover:bg-yutime-secondary/80"
                        size="sm"
                      >
                        <Download size={16} className="mr-2" />
                        下載
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="content" className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-yutime-primary">課程單元</h2>
                <div className="text-sm text-yutime-text/80">
                  {totalLessons} 個單元・635 分鐘
                </div>
              </div>
              <div className="text-sm text-yutime-text">
                已完成: {completedLessons}/{totalLessons}
              </div>
            </div>
            
            <div className="space-y-4">
              {chapters.map((chapter, chapterIdx) => (
                <div key={chapter.id} className="border border-yutime-neutral/30 rounded-lg overflow-hidden">
                  <div
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-yutime-neutral/20 transition-colors bg-yutime-neutral/10"
                  >
                    <div className="flex items-center space-x-3">
                      {expandedChapters.includes(chapter.id) ? (
                        <ChevronDown size={18} className="text-yutime-text" />
                      ) : (
                        <ChevronRight size={18} className="text-yutime-text" />
                      )}
                      <div>
                        <h3 className="font-semibold text-yutime-text">{chapter.title}</h3>
                        <div className="text-sm text-yutime-text/70">{chapter.duration}</div>
                      </div>
                    </div>
                  </div>
                  
                  {expandedChapters.includes(chapter.id) && (
                    <div className="bg-white">
                      {chapter.lessons.map((chapterLesson, lessonIdx) => {
                        const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                        const isCurrentLesson = globalIndex === currentLesson;
                        
                        return (
                          <div
                            key={chapterLesson.id}
                            onClick={() => handleLessonClick(globalIndex)}
                            className={`p-4 cursor-pointer transition-colors border-t border-yutime-neutral/20 ${
                              isCurrentLesson 
                                ? 'bg-yutime-secondary/10 border-l-4 border-l-yutime-secondary' 
                                : 'hover:bg-yutime-neutral/30'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                {chapterLesson.completed ? (
                                  <div className="w-5 h-5 bg-yutime-secondary rounded-full flex items-center justify-center">
                                    <Check size={12} className="text-white" />
                                  </div>
                                ) : isCurrentLesson ? (
                                  <div className="w-5 h-5 bg-yutime-secondary rounded-full flex items-center justify-center">
                                    <Play size={12} className="text-white" />
                                  </div>
                                ) : (
                                  <Circle size={20} className="text-yutime-text/40" />
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className={`font-medium ${
                                    isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                                  }`}>
                                    {chapterLesson.title}
                                  </p>
                                  {chapterLesson.hasResources && chapterLesson.resources && (
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="h-8 px-2 flex items-center gap-1 hover:bg-yutime-secondary/10 border border-yutime-secondary/40 hover:border-yutime-secondary text-yutime-secondary hover:text-yutime-secondary bg-yutime-secondary/5"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Folder size={14} />
                                          <span className="text-xs">資源</span>
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
                                                  <p className="font-medium text-yutime-text text-sm">{resource.name}</p>
                                                  <p className="text-xs text-yutime-text/60">{resource.type}</p>
                                                </div>
                                              </div>
                                              <Button
                                                onClick={() => handleResourceDownload(resource.url)}
                                                className="h-8 w-8 p-0 bg-yutime-secondary hover:bg-yutime-secondary/80"
                                                size="sm"
                                              >
                                                <Download size={14} className="text-white" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  )}
                                </div>
                                <div className="text-sm text-yutime-text/60 mt-1">
                                  {chapterLesson.duration}
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
          </TabsContent>
        </Tabs>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-yutime-neutral/30">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>上一課</span>
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-2 bg-yutime-secondary hover:bg-yutime-secondary/90"
          >
            <span>下一課</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionContentWithSidebar;
