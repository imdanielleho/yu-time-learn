
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  resources: Array<{ name: string; type: string; url: string }>;
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
  const [showTranscript, setShowTranscript] = useState(false);

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText size={16} className="text-red-500" />;
      case 'image':
        return <Image size={16} className="text-blue-500" />;
      default:
        return <Download size={16} className="text-yutime-text/60" />;
    }
  };

  const mockTranscript = `
    Welcome to this lesson on ${lesson.title}. In this session, we'll be covering the essential concepts that will help you understand how to effectively use your smartphone.

    Let's start with the basics. Your smartphone is a powerful device that can help you stay connected with family and friends, access information, and accomplish daily tasks.

    Throughout this lesson, we'll walk through step-by-step instructions, and I encourage you to follow along at your own pace. Don't worry if you need to pause or replay sections - that's what this platform is for.

    Remember, learning new technology takes time and practice. Be patient with yourself as you work through these concepts.
  `;

  return (
    <div className="bg-yutime-neutral border-t border-yutime-neutral/20">
      <div className="max-w-5xl mx-auto p-8">
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-yutime-neutral/20">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center space-x-3 h-12 px-6 border-yutime-neutral/30 hover:bg-yutime-primary/5 hover:border-yutime-primary/30 transition-colors disabled:opacity-50"
          >
            <ChevronLeft size={18} />
            <span className="font-medium">Previous Lesson</span>
          </Button>
          
          <div className="text-center space-y-1">
            <h2 className="font-heading font-semibold text-xl text-yutime-charcoal">{lesson.title}</h2>
            <p className="text-sm text-yutime-text/70 font-medium">{lesson.duration}</p>
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-3 h-12 px-6 bg-yutime-primary hover:bg-yutime-primary/90 transition-colors disabled:opacity-50"
          >
            <span className="font-medium">Next Lesson</span>
            <ChevronRight size={18} />
          </Button>
        </div>

        {/* Tabs Layout */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources ({lesson.resources.length})</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-0">
            <Card className="border-yutime-neutral/20 shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-yutime-charcoal">About This Lesson</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yutime-text leading-relaxed text-base">{lesson.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-0">
            <Card className="border-yutime-neutral/20 shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-yutime-charcoal">Downloadable Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {lesson.resources.length > 0 ? (
                  <div className="space-y-4">
                    {lesson.resources.map((resource, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 border border-yutime-neutral/20 rounded-xl hover:bg-yutime-neutral/30 hover:border-yutime-primary/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          {getResourceIcon(resource.type)}
                          <div>
                            <p className="font-medium text-yutime-charcoal text-base">{resource.name}</p>
                            <p className="text-sm text-yutime-text/70 font-medium">{resource.type.toUpperCase()}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.url, '_blank')}
                          className="flex items-center space-x-2 h-10 px-4 border-yutime-primary/40 text-yutime-primary hover:bg-yutime-primary hover:text-white transition-colors"
                        >
                          <Download size={14} />
                          <span className="font-medium">Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-yutime-text/70 text-center py-8">No resources available for this lesson.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-0">
            <Card className="border-yutime-neutral/20 shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-heading text-yutime-charcoal">Video Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                {lesson.hasTranscript ? (
                  <div className="bg-yutime-neutral/50 p-6 rounded-xl border border-yutime-neutral/20">
                    <div className="prose prose-sm max-w-none text-yutime-text">
                      {mockTranscript.split('\n').map((paragraph, index) => 
                        paragraph.trim() && (
                          <p key={index} className="mb-4 leading-relaxed text-base">
                            {paragraph.trim()}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-yutime-text/70 text-center py-8">No transcript available for this lesson.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SessionContent;
