import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image, MessageCircle, Send, ThumbsUp, Clock, CheckCircle, Circle, Play, ChevronDown, ArrowUpDown, Folder, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { Course } from '@/data/courses';

// Mock transcript data
const mockTranscript = `
歡迎來到財報分析的入門課程。在今天的課程中，我們將探討財務報表的基礎概念，以及如何將這些知識應用在日常生活中。

首先，讓我們了解什麼是財務報表。財務報表是一家公司財務狀況的完整記錄，包含了公司的資產、負債、收入和支出等重要資訊。

對於一般投資者來說，最重要的三大財務報表分別是：
1. 資產負債表 - 顯示公司在特定時點的財務狀況
2. 損益表 - 反映公司在一段期間內的營運績效
3. 現金流量表 - 追蹤公司現金的流入和流出

即使您不是企業老闆或高階主管，財報知識依然對您的投資決策和財務規劃非常有幫助。透過分析公司的財務數據，您可以更好地評估投資機會，做出明智的理財選擇。

在接下來的課程中，我們將深入探討每一張財務報表的細節，學習如何解讀關鍵的財務比率，以及如何運用這些知識來評估公司的投資價值。

記住，財報分析不是一門艱深的學問，而是一套實用的工具。只要掌握了基本概念，任何人都可以學會閱讀和分析財務報表。
`;

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
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
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
  canGoPrevious,
  isPlaying = false,
  setIsPlaying
}) => {
  const isMobile = useIsMobile();
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<number[]>(chapters.map(chapter => chapter.id));
  const [qaSortBy, setQaSortBy] = useState<'newest' | 'oldest' | 'most-liked'>('newest');
  
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

  const sortedQaItems = [...qaItems].sort((a, b) => {
    switch (qaSortBy) {
      case 'oldest':
        return a.id - b.id;
      case 'most-liked':
        return b.likes - a.likes;
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

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
      if (isPlaying && setIsPlaying) {
        setIsPlaying(false);
      }
      return;
    }
    
    onLessonSelect(globalIndex);
    if (setIsPlaying) {
      setIsPlaying(true);
    }
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-yutime-neutral/30 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base md:text-lg font-serif font-medium text-yutime-primary">課程單元</h2>
          <div className="text-xs md:text-sm text-yutime-text/80 font-medium">
            {totalLessons} 個單元・635 分鐘
          </div>
        </div>
        <div className="text-xs md:text-sm text-yutime-text font-medium">
          已完成: {completedLessons}/{totalLessons}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className="border-b border-yutime-neutral/20">
            <div
              onClick={() => toggleChapter(chapter.id)}
              className={`flex items-center justify-between p-3 md:p-4 cursor-pointer hover:bg-gray-100 transition-colors 
                bg-gray-50
                ${chapterIdx === 0 ? 'border-t border-gray-200' : ''}`}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={16} className="text-yutime-text flex-shrink-0" strokeWidth={3} />
                ) : (
                  <ChevronRight size={16} className="text-yutime-text flex-shrink-0" strokeWidth={3} />
                )}
                <div className="min-w-0">
                  <h3 className="font-semibold text-yutime-text text-sm md:text-base leading-tight">{chapter.title}</h3>
                  <div className="text-xs text-yutime-text/70 mt-1">{chapter.duration}</div>
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
                      onClick={() => handleLessonClick(globalIndex)}
                      className={`p-3 md:p-4 cursor-pointer transition-colors ${
                        isCurrentLesson 
                          ? 'bg-yutime-secondary/10 border-l-2 border-yutime-secondary' 
                          : 'hover:bg-yutime-neutral/40'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {lesson.completed ? (
                            <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                              <Check size={10} className="text-white font-bold" strokeWidth={3} />
                            </div>
                          ) : isCurrentLesson ? (
                            <div className="w-4 h-4 bg-yutime-secondary rounded-full flex items-center justify-center">
                              <Play size={10} className="text-white" />
                            </div>
                          ) : (
                            <Circle size={14} className="text-yutime-text/40" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="w-full">
                            <p className={`text-sm font-medium leading-tight ${
                              isCurrentLesson ? 'text-yutime-secondary' : 'text-yutime-text'
                            }`}>
                              {lesson.title}
                            </p>
                          </div>
                          
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
                                      className="h-8 md:h-6 px-3 md:px-2 flex items-center gap-1 hover:bg-yutime-secondary/10 border border-yutime-secondary/40 hover:border-yutime-secondary text-yutime-secondary hover:text-yutime-secondary bg-yutime-secondary/5 transition-all duration-200 shadow-sm hover:shadow-md min-w-[44px] min-h-[44px] md:min-w-auto md:min-h-auto touch-manipulation"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <Folder size={12} className="text-yutime-secondary" />
                                      <span className="text-xs font-medium">課程資源</span>
                                      <ChevronDown size={10} className="text-yutime-secondary" />
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
  );

  return (
    <TooltipProvider>
      <div className="bg-yutime-neutral/50 min-h-96">
        <div className="max-w-6xl mx-auto p-3 md:p-6">
          <Tabs defaultValue={isMobile ? "sidebar" : "overview"} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-4' : 'grid-cols-3'} mb-4 md:mb-6 bg-background/50 border border-border rounded-lg p-1`}>
              {isMobile && (
                <TabsTrigger 
                  value="sidebar"
                  className="text-xs md:text-sm font-medium rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground px-1"
                >
                  課程內容
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="overview" 
                className="text-xs md:text-sm font-medium rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground px-1"
              >
                課程概要
              </TabsTrigger>
              <TabsTrigger 
                value="qa"
                className="text-xs md:text-sm font-medium rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground px-1"
              >
                課程問答
              </TabsTrigger>
              <TabsTrigger 
                value="transcript"
                className="text-xs md:text-sm font-medium rounded-md transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm text-muted-foreground hover:text-foreground px-1"
              >
                課程逐字稿
              </TabsTrigger>
            </TabsList>

            {isMobile && (
              <TabsContent value="sidebar" className="space-y-0 mt-0">
                <Card className="shadow-soft border-yutime-neutral/30 h-[500px]">
                  <SidebarContent />
                </Card>
              </TabsContent>
            )}

            <TabsContent value="overview" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">關於本課程</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yutime-text/70 leading-relaxed text-sm md:text-base">
                    {lesson.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa" className="space-y-0 mt-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif flex items-center space-x-2">
                    <MessageCircle size={20} />
                    <span>課程問答</span>
                  </CardTitle>
                  <p className="text-xs md:text-sm text-yutime-text/60 mt-2">與同學和講師一起討論課程內容，共同學習成長</p>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="bg-yutime-neutral/20 p-3 md:p-4 rounded-xl border border-yutime-neutral/30">
                    <h3 className="font-medium text-yutime-text mb-3 text-sm md:text-base">提出問題</h3>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="請在這裡輸入您的問題，講師會盡快回覆..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="min-h-[80px] md:min-h-[100px] text-sm md:text-base border-yutime-neutral/40 focus:border-yutime-secondary/50 focus:ring-yutime-secondary/20"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={!newQuestion.trim()}
                          className="btn-primary flex items-center space-x-2 text-sm md:text-base font-medium min-w-[44px] min-h-[44px]"
                          size={isMobile ? "sm" : "default"}
                        >
                          <Send size={14} />
                          <span>發布問題</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-yutime-text text-sm md:text-base">課程討論 ({qaItems.length})</h3>
                      <Select value={qaSortBy} onValueChange={(value: 'newest' | 'oldest' | 'most-liked') => setQaSortBy(value)}>
                        <SelectTrigger className="w-28 md:w-32 h-8 text-xs md:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">最新</SelectItem>
                          <SelectItem value="oldest">最舊</SelectItem>
                          <SelectItem value="most-liked">最多讚</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {sortedQaItems.map((item) => (
                      <div key={item.id} className="bg-white p-3 md:p-4 rounded-xl border border-yutime-neutral/30 shadow-soft">
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 text-xs md:text-sm text-yutime-text/60">
                              <span className="font-medium">{item.author}</span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Clock size={10} />
                                <span>{item.timestamp}</span>
                              </span>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleLike(item.id)}
                                  className="flex items-center space-x-1 text-yutime-text/60 hover:text-yutime-secondary hover:bg-yutime-secondary/10 min-w-[44px] min-h-[44px] p-1"
                                >
                                  <ThumbsUp size={12} />
                                  <span className="text-xs">{item.likes}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>覺得這個問題有幫助</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-yutime-text leading-relaxed text-sm md:text-base">{item.question}</p>
                        </div>

                        {item.answer && (
                          <div className="ml-2 md:ml-4 pl-3 md:pl-4 border-l-2 border-yutime-secondary/30 bg-yutime-secondary/5 p-3 rounded-r-lg">
                            <div className="flex items-center space-x-2 mb-2 text-xs md:text-sm">
                              <span className={`font-medium ${item.answer.isInstructor ? 'text-yutime-secondary' : 'text-yutime-text/60'}`}>
                                {item.answer.author}
                                {item.answer.isInstructor && (
                                  <span className="ml-1 bg-yutime-secondary text-white px-2 py-0.5 rounded-full text-xs">講師</span>
                                )}
                              </span>
                              <span className="text-yutime-text/60">•</span>
                              <span className="text-yutime-text/60 flex items-center space-x-1">
                                <Clock size={10} />
                                <span>{item.answer.timestamp}</span>
                              </span>
                            </div>
                            <p className="text-yutime-text leading-relaxed text-sm md:text-base">{item.answer.content}</p>
                          </div>
                        )}

                        {!item.answer && (
                          <div className="ml-2 md:ml-4 pl-3 md:pl-4 border-l-2 border-yutime-neutral/30 bg-yutime-neutral/10 p-3 rounded-r-lg">
                            <p className="text-yutime-text/60 text-xs md:text-sm italic">講師尚未回覆，請耐心等候...</p>
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
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">課程逐字稿</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yutime-neutral/30 p-3 md:p-4 rounded-lg">
                    <div className="prose prose-sm max-w-none text-yutime-text/80">
                      {mockTranscript.split('\n').map((paragraph, index) =>
                        paragraph.trim() && (
                          <p key={index} className="mb-3 leading-relaxed text-sm md:text-base">
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
