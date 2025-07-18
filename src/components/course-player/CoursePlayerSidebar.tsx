
import React from 'react';
import { CheckCircle, Circle, Play, Clock, FileText } from 'lucide-react';
import { Course } from '@/data/courses';
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  resources: Array<{ name: string; type: string; url: string }>;
  hasTranscript: boolean;
}

interface CoursePlayerSidebarProps {
  course: Course;
  lessons: Lesson[];
  currentLesson: number;
  onLessonSelect: (index: number) => void;
  isOpen: boolean;
}

const CoursePlayerSidebar: React.FC<CoursePlayerSidebarProps> = ({
  course,
  lessons,
  currentLesson,
  onLessonSelect,
  isOpen
}) => {
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-10`}>
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Content</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{completedLessons}/{lessons.length} lessons completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-2">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(index)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
                currentLesson === index
                  ? 'bg-yutime-blue/10 border-yutime-blue'
                  : 'border-gray-200'
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onLessonSelect(index);
                }
              }}
              aria-label={`Lesson ${index + 1}: ${lesson.title}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {lesson.completed ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : currentLesson === index ? (
                    <Play size={20} className="text-yutime-blue" />
                  ) : (
                    <Circle size={20} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm mb-1 ${
                    currentLesson === index ? 'text-yutime-blue' : 'text-gray-900'
                  }`}>
                    {lesson.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {lesson.duration}
                    </div>
                    {lesson.resources.length > 0 && (
                      <div className="flex items-center">
                        <FileText size={12} className="mr-1" />
                        {lesson.resources.length}
                      </div>
                    )}
                  </div>
                  {currentLesson === index && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerSidebar;
