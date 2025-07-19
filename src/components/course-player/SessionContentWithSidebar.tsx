import React, { useState } from 'react';
import { BookOpen, MessageCircle, FileText, ChevronDown, ChevronRight, ChevronLeft, CheckCircle, Circle, Play, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from '@/hooks/use-mobile';
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

const mockQAs = [
  {
    id: 1,
    question: "請問這個課程適合完全沒有財報基礎的人嗎？",
    answer: "當然，這門課從零開始，會用生活化的例子解釋財報觀念，讓你輕鬆入門。",
    replies: [
      { id: 101, text: "謝謝老師！這樣我就放心了。", author: "學員A" },
      { id: 102, text: "太好了，我一直對數字很頭痛，希望這次能學好。", author: "學員B" }
    ]
  },
  {
    id: 2,
    question: "課程中會教到如何分析公司的財務報表嗎？",
    answer: "是的，我們會深入分析三大報表，教你如何評估公司的財務狀況和投資價值。",
    replies: [
      { id: 201, text: "這正是我需要的，感謝！", author: "學員C" }
    ]
  },
  {
    id: 3,
    question: "如果上課遇到問題，有地方可以發問嗎？",
    answer: "當然，你可以在課程討論區提問，老師和助教都會盡快回覆。",
    replies: [
      { id: 301, text: "了解，謝謝解答！", author: "學員D" },
      { id: 302, text: "這個服務真棒！", author: "學員E" }
    ]
  }
];

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
  const [activeTab, setActiveTab] = useState('lesson');
  const [sortOrder, setSortOrder] = useState('newest');

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

  const QASection = () => (
    <div className="space-y-4">
      {mockQAs.map(qa => (
        <div key={qa.id} className="border border-yutime-neutral/20 rounded-lg p-3">
          <div className="font-medium text-yutime-text">{qa.question}</div>
          <div className="text-sm text-yutime-text/80 mt-1">{qa.answer}</div>
          <div className="mt-2 space-y-1">
            {qa.replies.map(reply => (
              <div key={reply.id} className="text-xs text-yutime-text/70 pl-2">
                <span className="font-semibold">{reply.author}:</span> {reply.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const TranscriptSection = () => (
    <div className="space-y-2">
      <p className="text-sm text-yutime-text">
        {lesson.description}
      </p>
    </div>
  );

  const ContentSection = () => (
    <div className="space-y-2">
      <h3 className="font-medium text-yutime-text text-sm leading-tight">{lesson.title}</h3>
      <p className="text-sm text-yutime-text">
        {lesson.description}
      </p>
    </div>
  );

  const CourseContentSection = () => (
    <div className="space-y-2">
      {chapters.map((chapter, chapterIdx) => (
        <div key={chapter.id} className="border border-yutime-neutral/20 rounded-lg overflow-hidden">
          <div
            onClick={() => toggleChapter(chapter.id)}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50"
          >
            <div className="flex items-center space-x-2">
              {expandedChapters.includes(chapter.id) ? (
                <ChevronDown size={16} className="text-yutime-text" />
              ) : (
                <ChevronRight size={16} className="text-yutime-text" />
              )}
              <div>
                <h3 className="font-medium text-yutime-text text-sm leading-tight">{chapter.title}</h3>
                <div className="text-xs text-yutime-text/60 mt-0.5">{chapter.duration}</div>
              </div>
            </div>
          </div>
          
          {expandedChapters.includes(chapter.id) && (
            <div className="bg-white">
              {chapter.lessons.map((lesson, lessonIdx) => {
                const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                const isCurrentLesson = globalIndex === currentLesson;
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => onLessonSelect(globalIndex)}
                    className={`flex items-center justify-between p-3 pl-8 cursor-pointer transition-colors border-t border-yutime-neutral/10 ${
                      isCurrentLesson 
                        ? 'bg-yutime-secondary/10 border-l-2 border-yutime-secondary' 
                        : 'hover:bg-yutime-neutral/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                            <CheckCircle size={12} className="text-white" fill="currentColor" />
                          </div>
                        ) : isCurrentLesson ? (
                          <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                            <Play size={10} className="text-white" fill="currentColor" />
                          </div>
                        ) : (
                          <Circle size={14} className="text-yutime-text/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-tight ${
                          isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                        }`}>
                          {lesson.title}
                        </p>
                      </div>
                      <div className="text-xs text-yutime-text/50 ml-auto">
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
  );

  return (
    <div className="bg-white border-t border-yutime-neutral/30">
      {/* Desktop Version */}
      {!isMobile && (
        <div className="grid grid-cols-4">
          <div className="col-span-3 p-8">
            <h2 className="text-lg font-serif font-medium text-yutime-primary mb-4">{lesson.title}</h2>
            <p className="text-sm text-yutime-text">{lesson.description}</p>
            <div className="mt-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">本節內容</TabsTrigger>
                  <TabsTrigger value="transcript">字幕稿</TabsTrigger>
                  <TabsTrigger value="qa">討論</TabsTrigger>
                </TabsList>
                <TabsContent value="content">
                  <ContentSection />
                </TabsContent>
                <TabsContent value="transcript">
                  <TranscriptSection />
                </TabsContent>
                <TabsContent value="qa">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-serif font-medium text-yutime-primary">課程討論</h3>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">最新</SelectItem>
                          <SelectItem value="oldest">最舊</SelectItem>
                          <SelectItem value="most-liked">最多讚</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <QASection />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="col-span-1 p-8 border-l border-yutime-neutral/30">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
              <div className="text-sm text-yutime-text/80 font-medium">
                {totalLessons} 個單元・635 分鐘
              </div>
            </div>
            <div className="text-sm text-yutime-text font-medium mb-4">
              已完成: {completedLessons}/{totalLessons}
            </div>
            <CourseContentSection />
            <div className="sticky bottom-4 bg-white py-4">
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={onPrevious} disabled={!canGoPrevious}>
                  <ChevronLeft size={16} className="mr-2" />
                  上一個
                </Button>
                <Button size="sm" onClick={onNext} disabled={!canGoNext}>
                  下一個
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Version */}
      {isMobile && (
        <div className="p-4">
          <Tabs defaultValue="lesson" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="lesson" className="text-xs">課程內容</TabsTrigger>
              <TabsTrigger value="content" className="text-xs">本節內容</TabsTrigger>
              <TabsTrigger value="transcript" className="text-xs">字幕稿</TabsTrigger>
              <TabsTrigger value="qa" className="text-xs">討論</TabsTrigger>
            </TabsList>
            
            <TabsContent value="lesson" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
                <div className="text-sm text-yutime-text/80 font-medium">
                  {totalLessons} 個單元・635 分鐘
                </div>
              </div>
              <div className="text-sm text-yutime-text font-medium mb-4">
                已完成: {completedLessons}/{totalLessons}
              </div>
              <div className="max-h-[50vh] overflow-y-auto">
                <CourseContentSection />
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <h2 className="text-lg font-serif font-medium text-yutime-primary mb-4">本節內容</h2>
              <ContentSection />
            </TabsContent>

            <TabsContent value="transcript" className="space-y-4">
              <h2 className="text-lg font-serif font-medium text-yutime-primary mb-4">字幕稿</h2>
              <TranscriptSection />
            </TabsContent>

            <TabsContent value="qa" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-serif font-medium text-yutime-primary">課程討論</h2>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-24 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">最新</SelectItem>
                    <SelectItem value="oldest">最舊</SelectItem>
                    <SelectItem value="most-liked">最多讚</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <QASection />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SessionContentWithSidebar;
