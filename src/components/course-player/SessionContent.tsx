
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileText, Image, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
    Welcome to this lesson on ${lesson.title}. In this session, we'll be covering the essential concepts that will help you understand how to effectively use your smartphone.

    Let's start with the basics. Your smartphone is a powerful device that can help you stay connected with family and friends, access information, and accomplish daily tasks.

    Throughout this lesson, we'll walk through step-by-step instructions, and I encourage you to follow along at your own pace. Don't worry if you need to pause or replay sections - that's what this platform is for.

    Remember, learning new technology takes time and practice. Be patient with yourself as you work through these concepts.
  `;

  return (
    <div className="bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto p-6">
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft size={16} />
            <span>Previous Lesson</span>
          </Button>
          
          <div className="text-center">
            <h2 className="font-semibold text-gray-900">{lesson.title}</h2>
            <p className="text-sm text-gray-500">{lesson.duration}</p>
          </div>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-2 bg-yutime-blue hover:bg-yutime-blue/90"
          >
            <span>Next Lesson</span>
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Session Description */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">About This Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
          </CardContent>
        </Card>

        {/* Downloadable Resources */}
        {lesson.resources.length > 0 && (
          <Card className="mb-6">
            <Collapsible open={resourcesOpen} onOpenChange={setResourcesOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Downloadable Resources ({lesson.resources.length})</span>
                    <ChevronRight 
                      size={20} 
                      className={`transition-transform ${resourcesOpen ? 'rotate-90' : ''}`}
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {lesson.resources.map((resource, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getResourceIcon(resource.type)}
                          <div>
                            <p className="font-medium text-gray-900">{resource.name}</p>
                            <p className="text-sm text-gray-500">{resource.type.toUpperCase()}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.url, '_blank')}
                          className="flex items-center space-x-2"
                        >
                          <Download size={14} />
                          <span>Download</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )}

        {/* Transcript Toggle */}
        {lesson.hasTranscript && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Video Transcript</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center space-x-2"
                >
                  {showTranscript ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span>{showTranscript ? 'Hide' : 'Show'} Transcript</span>
                </Button>
              </div>
            </CardHeader>
            {showTranscript && (
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {mockTranscript.split('\n').map((paragraph, index) => 
                      paragraph.trim() && (
                        <p key={index} className="mb-3">
                          {paragraph.trim()}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SessionContent;
