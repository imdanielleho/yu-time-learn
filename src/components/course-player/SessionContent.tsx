
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const SessionContent: React.FC<SessionContentProps> = ({
  lesson,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
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

  return (
    <div className="bg-yutime-neutral/50 min-h-96">
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">課程概要</TabsTrigger>
            <TabsTrigger value="resources">教材資源</TabsTrigger>
            <TabsTrigger value="transcript">課程逐字稿</TabsTrigger>
          </TabsList>

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
                        className="bg-yutime-secondary hover:bg-yutime-secondary/90 text-white font-medium px-6 py-2 rounded-lg transition-colors shadow-soft"
                      >
                        下載
                      </Button>
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
  );
};

export default SessionContent;
