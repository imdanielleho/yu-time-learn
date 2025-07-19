import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Play, Clock, FileText, Download, ChevronDown, ChevronRight, SkipBack, SkipForward } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  // Set default tab to "課程內容" on mobile, "overview" on desktop
  const [activeTab, setActiveTab] = useState(isMobile ? "content" : "overview");

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

  const handleLessonClick = (globalIndex: number) => {
    if (globalIndex === currentLesson) {
      // If clicking on current lesson, do nothing
      return;
    }
    
    // If clicking on a different lesson, select it and ensure it will autoplay
    onLessonSelect(globalIndex);
    // The VideoPlayer will handle autoplay when lesson changes
  };

  return (
    <div className="bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-yutime-neutral/30">
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-auto p-0">
            <TabsTrigger 
              value="overview" 
              className="py-4 px-6 border-b-2 border-transparent data-[state=active]:border-yutime-secondary data-[state=active]:bg-transparent rounded-none text-yutime-text data-[state=active]:text-yutime-secondary font-medium"
            >
              課程總覽
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="py-4 px-6 border-b-2 border-transparent data-[state=active]:border-yutime-secondary data-[state=active]:bg-transparent rounded-none text-yutime-text data-[state=active]:text-yutime-secondary font-medium"
            >
              課程內容
            </TabsTrigger>
            <TabsTrigger 
              value="transcript" 
              className="py-4 px-6 border-b-2 border-transparent data-[state=active]:border-yutime-secondary data-[state=active]:bg-transparent rounded-none text-yutime-text data-[state=active]:text-yutime-secondary font-medium"
            >
              影片逐字稿
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="p-6">
          <Card className="shadow-none">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-4 text-yutime-primary">關於本課程</h2>
              <p className="text-yutime-text">{course.description}</p>
              
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2 text-yutime-primary">你將學到</h3>
                <ul className="list-disc list-inside text-yutime-text">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-md font-semibold mb-2 text-yutime-primary">適合對象</h3>
                <p className="text-yutime-text">{course.targetAudience}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="p-6">
          {chapters.map((chapter, chapterIdx) => (
            <div key={chapter.id} className="mb-4">
              <Collapsible key={chapter.id} className="w-full space-y-2">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium text-sm transition-all rounded-md shadow-sm data-[state=open]:bg-secondary/50">
                  <div className="flex items-center space-x-2">
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
                    )}
                    <h3 className="text-md font-semibold text-yutime-primary">{chapter.title}</h3>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4">
                  {chapter.lessons.map((lesson, lessonIdx) => {
                    const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                    const isCurrentLesson = globalIndex === currentLesson;
                    
                    return (
                      <div
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-md hover:bg-yutime-secondary/10 cursor-pointer ${
                          isCurrentLesson ? 'bg-yutime-secondary/10' : ''
                        }`}
                        onClick={() => handleLessonClick(globalIndex)}
                      >
                        <div className="flex items-center space-x-2">
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : isCurrentLesson ? (
                            <Play className="h-5 w-5 text-yutime-secondary" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                          <span className="text-sm font-medium text-yutime-text">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="transcript" className="p-6">
          <Card className="shadow-none">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-4 text-yutime-primary">影片逐字稿</h2>
              <p className="text-yutime-text">
                {lesson.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionContentWithSidebar;
