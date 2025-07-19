
import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
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

interface CoursePlayerSidebarProps {
  course: Course;
  chapters: Chapter[];
  currentLesson: number;
  onLessonSelect: (index: number) => void;
  isOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  totalLessons: number;
  completedLessons: number;
}

const CoursePlayerSidebar: React.FC<CoursePlayerSidebarProps> = ({
  course,
  chapters,
  currentLesson,
  onLessonSelect,
  isOpen,
  setSidebarOpen,
  totalLessons,
  completedLessons
}) => {
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);

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

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-yutime-primary/98 backdrop-blur-md border-l border-yutime-primary/20 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-20 flex flex-col text-white`}>
      {/* Minimal header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-white">課程內容</h2>
          <p className="text-white/60 text-sm">{totalLessons} 個單元・635 分鐘</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <X size={18} />
        </Button>
      </div>
      
      {/* Chapters and Lessons - MasterClass style */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className="border-b border-white/10 last:border-0">
            {/* Chapter Header */}
            <div
              onClick={() => toggleChapter(chapter.id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={16} className="text-white/60" />
                ) : (
                  <ChevronRight size={16} className="text-white/60" />
                )}
                <div>
                  <h3 className="font-medium text-white text-sm leading-tight">{chapter.title}</h3>
                  <div className="text-xs text-white/50 mt-1">{chapter.duration}</div>
                </div>
              </div>
            </div>
            
            {/* Lessons */}
            {expandedChapters.includes(chapter.id) && (
              <div className="bg-white/5">
                {chapter.lessons.map((lesson, lessonIdx) => {
                  const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                  const isCurrentLesson = globalIndex === currentLesson;
                  
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onLessonSelect(globalIndex)}
                      className={`flex items-center justify-between p-4 pl-12 cursor-pointer transition-all duration-200 ${
                        isCurrentLesson 
                          ? 'bg-yutime-secondary/20 border-l-2 border-yutime-secondary' 
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle size={16} className="text-yutime-accent" />
                          ) : isCurrentLesson ? (
                            <Play size={16} className="text-yutime-secondary fill-yutime-secondary" />
                          ) : (
                            <Circle size={16} className="text-white/30" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-tight ${
                            isCurrentLesson ? 'text-yutime-secondary font-medium' : 'text-white'
                          }`}>
                            {lesson.title}
                          </p>
                        </div>
                        <div className="text-xs text-white/50 ml-auto">
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
};

export default CoursePlayerSidebar;
