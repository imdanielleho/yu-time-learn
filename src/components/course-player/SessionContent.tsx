
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image, MessageCircle, Send, ThumbsUp, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  hasTranscript: boolean;
}

interface SessionContentProps {
  lesson: Lesson;
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

const SessionContent: React.FC<SessionContentProps> = ({
  lesson,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const [newQuestion, setNewQuestion] = useState('');
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

  return (
    <TooltipProvider>
      <div className="bg-yutime-neutral/50 min-h-96">
        <div className="max-w-6xl mx-auto p-6">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6 bg-gray-50/50 rounded-lg p-1">
              <TabsTrigger 
                value="modules" 
                className="text-sm font-medium px-4 py-3 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yutime-primary data-[state=active]:font-semibold"
              >
                課程模組
              </TabsTrigger>
              <TabsTrigger 
                value="overview" 
                className="text-sm font-medium px-4 py-3 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yutime-primary data-[state=active]:font-semibold"
              >
                課程概要
              </TabsTrigger>
              <TabsTrigger 
                value="resources"
                className="text-sm font-medium px-4 py-3 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yutime-primary data-[state=active]:font-semibold"
              >
                教材資源
              </TabsTrigger>
              <TabsTrigger 
                value="qa"
                className="text-sm font-medium px-4 py-3 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yutime-primary data-[state=active]:font-semibold"
              >
                課程問答
              </TabsTrigger>
              <TabsTrigger 
                value="transcript"
                className="text-sm font-medium px-4 py-3 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-yutime-primary data-[state=active]:font-semibold"
              >
                課程逐字稿
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">課程模組</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yutime-text/70 leading-relaxed">
                    課程模組內容將在此顯示...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="overview" className="space-y-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">關於本課程</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-yutime-text/70 leading-relaxed">
                    {lesson.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">教材下載</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockResources.map((resource, index) => (
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
                          onClick={() => window.open(resource.url, '_blank')}
                          className="btn-primary text-base font-medium min-w-[44px] min-h-[44px]"
                        >
                          下載
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa" className="space-y-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif flex items-center space-x-2">
                    <MessageCircle size={20} />
                    <span>課程問答</span>
                  </CardTitle>
                  <p className="text-sm text-yutime-text/60 mt-2">與同學和講師一起討論課程內容，共同學習成長</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Submit Question Form */}
                  <div className="bg-yutime-neutral/20 p-4 rounded-xl border border-yutime-neutral/30">
                    <h3 className="font-medium text-yutime-text mb-3">提出問題</h3>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="請在這裡輸入您的問題，講師會盡快回覆..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="min-h-[100px] text-base border-yutime-neutral/40 focus:border-yutime-secondary/50 focus:ring-yutime-secondary/20"
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSubmitQuestion}
                          disabled={!newQuestion.trim()}
                          className="btn-primary flex items-center space-x-2 text-base font-medium min-w-[44px] min-h-[44px]"
                        >
                          <Send size={16} />
                          <span>發布問題</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Q&A List */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-yutime-text">課程討論 ({qaItems.length})</h3>
                    {qaItems.map((item) => (
                      <div key={item.id} className="bg-white p-4 rounded-xl border border-yutime-neutral/30 shadow-soft">
                        {/* Question */}
                        <div className="mb-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2 text-sm text-yutime-text/60">
                              <span className="font-medium">{item.author}</span>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
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
                                  className="flex items-center space-x-1 text-yutime-text/60 hover:text-yutime-secondary hover:bg-yutime-secondary/10 min-w-[44px] min-h-[44px]"
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
                          <p className="text-yutime-text leading-relaxed text-base">{item.question}</p>
                        </div>

                        {/* Answer */}
                        {item.answer && (
                          <div className="ml-4 pl-4 border-l-2 border-yutime-secondary/30 bg-yutime-secondary/5 p-3 rounded-r-lg">
                            <div className="flex items-center space-x-2 mb-2 text-sm">
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
                            <p className="text-yutime-text leading-relaxed text-base">{item.answer.content}</p>
                          </div>
                        )}

                        {/* No Answer Yet */}
                        {!item.answer && (
                          <div className="ml-4 pl-4 border-l-2 border-yutime-neutral/30 bg-yutime-neutral/10 p-3 rounded-r-lg">
                            <p className="text-yutime-text/60 text-sm italic">講師尚未回覆，請耐心等候...</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcript" className="space-y-0">
              <Card className="shadow-soft border-yutime-neutral/30">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-yutime-primary font-serif">課程逐字稿</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yutime-neutral/30 p-4 rounded-lg">
                    <div className="prose prose-sm max-w-none text-yutime-text/80">
                      {mockTranscript.split('\n').map((paragraph, index) =>
                        paragraph.trim() && (
                          <p key={index} className="mb-3 leading-relaxed">
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

export default SessionContent;
