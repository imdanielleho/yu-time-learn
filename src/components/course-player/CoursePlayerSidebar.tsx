
import React from 'react';
import { CheckCircle, Circle, Play, Clock } from 'lucide-react';
import { Course } from '@/data/courses';

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
  // Calculate total duration
  const totalDuration = lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + minutes + (seconds / 60);
  }, 0);
  
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = Math.round(totalDuration % 60);
  const formattedDuration = totalHours > 0 
    ? `${totalHours}h ${totalMinutes}m`
    : `${totalMinutes}m`;

  return (
    <div className={`fixed right-0 top-0 h-full w-80 bg-white border-l border-yutime-neutral/20 transform transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } z-10 shadow-wellness`}>
      <div className="p-6 border-b border-yutime-neutral/20 bg-yutime-neutral/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-yutime-charcoal">Course Content</h2>
        </div>
        <div className="flex justify-between text-sm text-yutime-text/70 font-medium">
          <span>{lessons.length} lessons</span>
          <span>{formattedDuration}</span>
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
                  <div className="flex items-center text-xs text-yutime-text/60 font-medium">
                    <Clock size={12} className="mr-1" />
                    {lesson.duration}
                  </div>
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
