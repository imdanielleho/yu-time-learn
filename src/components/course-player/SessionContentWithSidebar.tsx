
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image, MessageCircle, Send, ThumbsUp, Clock, CheckCircle, Circle, Play, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface QAItem {
  id: number;
  question: string;
  author: string;
  timestamp: string;
  likes: number;
  answer?: {
    content: string;
    author: string;
    timestamp: string;
    isInstructor: boolean;
  };
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
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<number[]>(chapters.map(chapter => chapter.id));
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-liked'>('newest');
  
  const [qaItems, setQaItems] = useState<QAItem[]>([
    {
      id: 1,
      question: "請問在財報分析中，如何判斷一家公司的現金流是否健康？",
      author: "學員 張小明",
      timestamp: "2天前",
      likes: 5,
      answer: {
        content: "判斷現金流健康度主要看三個指標：1) 營運現金流是否為正且穩定增長 2) 自由現金流（營運現金流減去資本支出）是否充足 3) 現金流與淨利的比例是否合理。如果現金流長期低於淨利，可能存在應收帳款過高或收入品質問題。",
        author: "講師 王教授",
        timestamp: "1天前",
        isInstructor: true
      }
    },
    {
      id: 2,
      question: "對於初學者來說，應該優先關注哪些財務比率？",
      author: "學員 李大華",
      timestamp: "3天前",
      likes: 8,
      answer: {
        content: "建議初學者先掌握這四類基礎比率：1) 獲利能力：毛利率、淨利率 2) 償債能力：流動比率、負債比率 3) 經營效率：存貨週轉率、應收帳款週轉率 4) 投資報酬：ROE、ROA。熟悉這些後再進階學習其他指標。",
        author: "講師 王教授",
        timestamp: "2天前",
        isInstructor: true
      }
    },
    {
      id: 3,
      question: "如何在投資決策中運用所學的財報知識？",
      author: "學員 陳美玲",
      timestamp: "1週前",
      likes: 12
    }
  ]);

  const mockResources = [
    { name: "財報基礎講義", type: "PDF", url: "#" },
    { name: "練習題目", type: "PDF", url: "#" },
    { name: "參考圖表", type: "Image", url: "#" }
  ];

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

  const mockTranscript = `
    歡迎來到財報學習的第一課。在這個課程中，我們將探討為什麼即使不懂財報，也能在某些情況下賺錢，以及學習財報的真正價值。

    財報不只是數字的堆砌，它反映了企業的策略思維、營運計畫，以及財務狀況。這三者之間有著密不可分的關係。

    讓我們從基礎開始，一步步建立起對財報的正確認知...
  `;

  const handleSubmitQuestion = () => {
    if (newQuestion.trim()) {
      const newQA: QAItem = {
        id: qaItems.length + 1,
        question: newQuestion.trim(),
        author: "學員 您",
        timestamp: "剛剛",
        likes: 0
      };
      setQaItems([newQA, ...qaItems]);
      setNewQuestion('');
    }
  };

  const handleLike = (id: number) => {
    setQaItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

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

  // Sort Q&A items based on selected sort option
  const sortedQAItems = [...qaItems].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.id - b.id; // Assuming lower ID means older
      case 'most-liked':
        return b.likes - a.likes;
      case 'newest':
      default:
        return b.id - a.id; // Assuming higher ID means newer
    }
  });

  // Sidebar content component
  const SidebarContent = () => (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-yutime-neutral/30 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
          <div className="text-xs sm:text-sm text-yutime-text/80 font-medium">
            {totalLessons} 個單元・635 分鐘
          </div>
        </div>
        <div className="text-xs sm:text-sm text-yutime-text font-medium">
          已完成: {completedLessons}/{totalLessons}
        </div>
      </div>
      
      {/* Chapters and Lessons */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className="border-b border-yutime-neutral/20">
            {/* Chapter Header */}
            <div
              onClick={() => toggleChapter(chapter.id)}
              className={`flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-100 transition-colors 
                bg-gray-50
                ${chapterIdx === 0 ? 'border-t border-gray-200' : ''}`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={16} className="text-yutime-text flex-shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-yutime-text flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-yutime-text text-sm sm:text-base leading-tight">{chapter.title}</h3>
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
                      className={`flex items-center justify-between p-3 sm:p-4 pl-8 sm:pl-12 cursor-pointer transition-colors ${
                        isCurrentLesson 
                          ? 'bg-yutime-secondary/10 border-l-2 border-yutime-secondary' 
                          : 'hover:bg-yutime-neutral/40'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <div className="w-4 h-4 rounded-full bg-yutime-secondary flex items-center justify-center">
                              <CheckCircle size={12} className="text-white" />
                            </div>
                          ) : isCurrentLesson ? (
                            <Play size={16} className="text-yutime-secondary" />
                          ) : (
                            <Circle size={16} className="text-yutime-text/40" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs sm:text-sm font-medium leading-tight truncate ${
                            isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                          }`}>
                            {lesson.title}
                          </p>
                        </div>
                        <div className="text-xs text-yutime-text/60 flex-shrink-0">
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
  );

  return (
    <TooltipProvider>
      <div className="bg-yutime-neutral/50 min-h-96">
        <div className="max-w-6xl mx-auto p-3 sm:p-6">
          <Tabs defaultValue={isMobile ? "sidebar" : "overview"} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-5' : 'grid-cols-4'} mb-4 sm:mb-6 bg-white border border-gray-200 rounded-lg p-1`}>
              {isMobile && (
                <TabsTrigger 
                  value="sidebar"
                  className="text-xs sm:text-sm font-medium rounded-md transition-all px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200 data-[state=active]:border text-gray-600 hover:text-gray-900"
                >
                  課程內容
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="overview" 
                className="text-xs sm:text-sm font-medium rounded-md transition-all px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200 data-[state=active]:border text-gray-600 hover:text-gray-900"
              >
                課程概要
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="text-xs sm:text-sm font-medium rounded-md transition-all px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200 data-[state=active]:border text-gray-600 hover:text-gray-900"
              >
                教材資源
              </TabsTrigger>
              <TabsTrigger 
                value="qa"
                className="text-xs sm:text-sm font-medium rounded-md transition-all px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200 data-[state=active]:border text-gray-600 hover:text-gray-900"
              >
                課程問答
              </TabsTrigger>
              <TabsTrigger 
                value="transcript"
                className="text-xs sm:text-sm font-medium rounded-md transition-all px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200 data-[state=active]:border text-gray-600 hover:text-gray-900"
              >
                課程逐字稿
              </TabsTrigger>
            </TabsList>

            {isMobile && (
              <TabsContent value="sidebar" className="space-y-0 mt-0">
                <Card className="shadow-soft border-yutime-neutral/30 h-[70vh] sm:h-[500px] overflow-hidden">
                  <SidebarContent />
                </Card>
              </TabsContent>
            )}

            <TabsContent value="overview" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-yutime-primary font-serif">關於本課程</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-yutime-text/70 leading-relaxed">
                    {lesson.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-yutime-primary font-serif">教材下載</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockResources.map((resource, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 border border-yutime-neutral/40 rounded-lg hover:bg-yutime-neutral/30 transition-colors"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          {getResourceIcon(resource.type)}
                          <div className="min-w-0">
                            <p className="font-medium text-yutime-text text-sm sm:text-base truncate">{resource.name}</p>
                            <p className="text-xs sm:text-sm text-yutime-text/60">{resource.type}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => window.open(resource.url, '_blank')}
                          className="btn-primary text-sm sm:text-base font-medium min-w-[44px] min-h-[44px] flex-shrink-0"
                        >
                          下載
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle className="text-base sm:text-lg text-yutime-primary font-serif flex items-center space-x-2">
                      <MessageCircle size={20} />
                      <span>課程問答</span>
                    </CardTitle>
                  </div>
                  <p className="text-xs sm:text-sm text-yutime-text/60 mt-2">與同學和講師一起討論課程內容，共同學習成長</p>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Submit Question Form */}
                  <div className="bg-yutime-neutral/20 p-3 sm:p-4 rounded-xl border border-yutime-neutral/30">
                    <h3 className="font-medium text-yutime-text mb-3 text-sm sm:text-base">提出問題</h3>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="請在這裡輸入您的問題，講師會盡快回覆..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="min-h-[80px] sm:min-h-[100px] text-sm sm:text-base border-yutime-neutral/40 focus:border-yutime-secondary/50 focus:ring-yutime-secondary/20"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={!newQuestion.trim()}
                          className="btn-primary flex items-center space-x-2 text-sm sm:text-base font-medium min-w-[44px] min-h-[44px]"
                        >
                          <Send size={16} />
                          <span>發布問題</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Q&A List with sorting in same row as title */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h3 className="font-medium text-yutime-text text-sm sm:text-base">課程討論 ({sortedQAItems.length})</h3>
                      <div className="flex items-center space-x-2">
                        <ArrowUpDown size={16} className="text-yutime-text/60" />
                        <Select value={sortBy} onValueChange={(value: 'newest' | 'oldest' | 'most-liked') => setSortBy(value)}>
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">最新</SelectItem>
                            <SelectItem value="oldest">最舊</SelectItem>
                            <SelectItem value="most-liked">最多讚</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {sortedQAItems.map((item) => (
                      <div key={item.id} className="bg-white p-3 sm:p-4 rounded-xl border border-yutime-neutral/30 shadow-soft">
                        {/* Question */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-yutime-text/60 min-w-0">
                              <span className="font-medium truncate">{item.author}</span>
                              <span>•</span>
                              <span className="flex items-center space-x-1 flex-shrink-0">
                                <Clock size={12} />
                                <span>{item.timestamp}</span>
                              </span>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleLike(item.id)}
                                  className="flex items-center space-x-1 text-yutime-text/60 hover:text-yutime-secondary hover:bg-yutime-secondary/10 min-w-[44px] min-h-[44px] flex-shrink-0"
                                >
                                  <ThumbsUp size={14} />
                                  <span className="text-sm">{item.likes}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>覺得這個問題有幫助</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-yutime-text leading-relaxed text-sm sm:text-base">{item.question}</p>
                        </div>

                        {/* Answer */}
                        {item.answer && (
                          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-yutime-secondary/30 bg-yutime-secondary/5 p-3 rounded-r-lg">
                            <div className="flex items-center space-x-2 mb-2 text-xs sm:text-sm">
                              <span className={`font-medium ${item.answer.isInstructor ? 'text-yutime-secondary' : 'text-yutime-text/60'}`}>
                                {item.answer.author}
                                {item.answer.isInstructor && (
                                  <span className="ml-1 bg-yutime-secondary text-white px-2 py-0.5 rounded-full text-xs">講師</span>
                                )}
                              </span>
                              <span className="text-yutime-text/60">•</span>
                              <span className="text-yutime-text/60 flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{item.answer.timestamp}</span>
                              </span>
                            </div>
                            <p className="text-yutime-text leading-relaxed text-sm sm:text-base">{item.answer.content}</p>
                          </div>
                        )}

                        {/* No Answer Yet */}
                        {!item.answer && (
                          <div className="ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-yutime-neutral/30 bg-yutime-neutral/10 p-3 rounded-r-lg">
                            <p className="text-yutime-text/60 text-xs sm:text-sm italic">講師尚未回覆，請耐心等候...</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-yutime-primary font-serif">課程逐字稿</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yutime-neutral/30 p-3 sm:p-4 rounded-lg">
                    <div className="prose prose-sm max-w-none text-yutime-text/80">
                      {mockTranscript.split('\n').map((paragraph, index) =>
                        paragraph.trim() && (
                          <p key={index} className="mb-3 leading-relaxed text-sm sm:text-base">
                            {paragraph.trim()}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SessionContentWithSidebar;
