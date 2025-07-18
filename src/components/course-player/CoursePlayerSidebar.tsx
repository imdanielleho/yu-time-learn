
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
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-yutime-neutral/20 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-10 shadow-wellness`}>
      <div className="p-6 border-b border-yutime-neutral/20 bg-yutime-neutral/5">
        <h2 className="text-xl font-heading font-semibold text-yutime-charcoal mb-3">Course Content</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-yutime-text/70 font-medium">
            <span>{completedLessons}/{lessons.length} lessons completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-3">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(index)}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:bg-yutime-neutral/30 hover:shadow-soft ${
                currentLesson === index
                  ? 'bg-yutime-primary/5 border-yutime-primary shadow-gentle'
                  : 'border-yutime-neutral/20 hover:border-yutime-primary/30'
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
                    <Play size={20} className="text-yutime-primary" />
                  ) : (
                    <Circle size={20} className="text-yutime-text/40" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-heading font-medium text-base mb-2 leading-snug ${
                    currentLesson === index ? 'text-yutime-primary' : 'text-yutime-charcoal'
                  }`}>
                    {lesson.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-yutime-text/60 mb-2 font-medium">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {lesson.duration}
                    </div>
                    {lesson.resources.length > 0 && (
                      <div className="flex items-center">
                        <FileText size={12} className="mr-1" />
                        {lesson.resources.length} resources
                      </div>
                    )}
                  </div>
                  {currentLesson === index && (
                    <p className="text-sm text-yutime-text/70 line-clamp-2 leading-relaxed">
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
