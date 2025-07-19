
import React, { useState } from 'react';
import { CheckCircle, Circle, Play, ChevronDown, ChevronRight } from 'lucide-react';
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
  totalLessons: number;
  completedLessons: number;
}

const CoursePlayerSidebar: React.FC<CoursePlayerSidebarProps> = ({
  course,
  chapters,
  currentLesson,
  onLessonSelect,
  isOpen,
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
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-10 flex flex-col`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">課程單元</h2>
          <div className="text-sm text-gray-500">
            {totalLessons} 個單元・635 分鐘
          </div>
        </div>
      </div>
      
      {/* Chapters and Lessons */}
      <div className="flex-1 overflow-y-auto">
        {chapters.map((chapter, chapterIdx) => (
          <div key={chapter.id} className="border-b border-gray-100">
            {/* Chapter Header */}
            <div
              onClick={() => toggleChapter(chapter.id)}
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {expandedChapters.includes(chapter.id) ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">{chapter.title}</h3>
                  <div className="text-xs text-gray-500 mt-1">{chapter.duration}</div>
                </div>
              </div>
            </div>
            
            {/* Lessons */}
            {expandedChapters.includes(chapter.id) && (
              <div className="bg-gray-50">
                {chapter.lessons.map((lesson, lessonIdx) => {
                  const globalIndex = getLessonGlobalIndex(chapterIdx, lessonIdx);
                  const isCurrentLesson = globalIndex === currentLesson;
                  
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onLessonSelect(globalIndex)}
                      className={`flex items-center justify-between p-4 pl-12 cursor-pointer transition-colors ${
                        isCurrentLesson 
                          ? 'bg-blue-50 border-l-2 border-blue-500' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : isCurrentLesson ? (
                            <Play size={16} className="text-blue-500" />
                          ) : (
                            <Circle size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium leading-tight ${
                            isCurrentLesson ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 ml-auto">
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
