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
        return <FileText size={16} className="text-yutime-accent" />;
      case 'image':
        return <Image size={16} className="text-yutime-secondary" />;
      default:
        return <Download size={16} className="text-yutime-text/60" />;
    }
  };

  const mockTranscript = `
    歡迎來到財報學習的第一課。在這個課程中，我們將探討為什麼即使不懂財報，也能在某些情況下賺錢，以及學習財報的真正價值。

    財報不只是數字的堆砌，它反映了企業的策略思維、營運計畫，以及財務狀況。這三者之間有著密不可分的關係。

    讓我們從基礎開始，一步步建立起對財報的正確認知...
  `;

  return (
    <div className="bg-white min-h-96">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* MasterClass inspired clean tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-yutime-neutral/30 rounded-xl p-1">
            <TabsTrigger 
              value="overview" 
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-yutime-primary data-[state=active]:shadow-sm"
            >
              課程概要
            </TabsTrigger>
            <TabsTrigger 
              value="resources"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-yutime-primary data-[state=active]:shadow-sm"
            >
              教材資源
            </TabsTrigger>
            <TabsTrigger 
              value="transcript"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-yutime-primary data-[state=active]:shadow-sm"
            >
              課程逐字稿
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-0 mt-0">
            <div className="bg-yutime-neutral/20 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-yutime-primary mb-4">關於本課程</h3>
              <p className="text-yutime-text/80 leading-relaxed text-lg">
                {lesson.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-0 mt-0">
            <div className="bg-yutime-neutral/20 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-yutime-primary mb-6">教材下載</h3>
              <div className="space-y-4">
                {mockResources.map((resource, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-soft transition-all duration-200 border border-yutime-neutral/30"
                  >
                    <div className="flex items-center space-x-4">
                      {getResourceIcon(resource.type)}
                      <div>
                        <p className="font-medium text-yutime-text">{resource.name}</p>
                        <p className="text-sm text-yutime-text/60">{resource.type}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="border-yutime-secondary text-yutime-secondary hover:bg-yutime-secondary hover:text-white"
                    >
                      下載
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-0 mt-0">
            <div className="bg-yutime-neutral/20 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-yutime-primary mb-6">課程逐字稿</h3>
              <div className="bg-white rounded-xl p-6 border border-yutime-neutral/30">
                <div className="prose prose-lg max-w-none text-yutime-text/80">
                  {mockTranscript.split('\n').map((paragraph, index) => 
                    paragraph.trim() && (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SessionContent;