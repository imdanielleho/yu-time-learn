
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses } from '@/data/courses';
import CoursePlayerSidebar from '@/components/course-player/CoursePlayerSidebar';
import VideoPlayer from '@/components/course-player/VideoPlayer';
import CoursePlayerHeader from '@/components/course-player/CoursePlayerHeader';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock lessons data
  const lessons = [
    { id: 1, title: "Getting Started with Your Smartphone", duration: "12:30", completed: true },
    { id: 2, title: "Understanding the Home Screen", duration: "8:45", completed: true },
    { id: 3, title: "Making Your First Call", duration: "10:15", completed: false },
    { id: 4, title: "Sending Text Messages", duration: "9:30", completed: false },
    { id: 5, title: "Using the Camera", duration: "15:20", completed: false },
  ];

  useEffect(() => {
    if (!course) {
      navigate('/dashboard');
    }
  }, [course, navigate]);

  const handleLessonSelect = (lessonIndex: number) => {
    setCurrentLesson(lessonIndex);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleNextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <CoursePlayerHeader 
        course={course}
        onBack={() => navigate('/dashboard')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 flex flex-col ${sidebarOpen ? 'mr-80' : ''} transition-all duration-300`}>
          <VideoPlayer 
            lesson={lessons[currentLesson]}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            progress={progress}
            setProgress={setProgress}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            canGoNext={currentLesson < lessons.length - 1}
            canGoPrevious={currentLesson > 0}
          />
        </div>
        
        <CoursePlayerSidebar 
          course={course}
          lessons={lessons}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
          isOpen={sidebarOpen}
        />
      </div>
    </div>
  );
};

export default CoursePlayer;
