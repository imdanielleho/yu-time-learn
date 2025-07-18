
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '@/data/courses';
import CoursePlayerSidebar from '@/components/course-player/CoursePlayerSidebar';
import VideoPlayer from '@/components/course-player/VideoPlayer';
import CoursePlayerHeader from '@/components/course-player/CoursePlayerHeader';
import SessionContent from '@/components/course-player/SessionContent';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Enhanced lessons data with more content
  const lessons = [
    { 
      id: 1, 
      title: "Getting Started with Your Smartphone", 
      duration: "12:30", 
      completed: true,
      description: "Learn the basics of using your smartphone, including how to turn it on, navigate the home screen, and understand the basic interface elements.",
      resources: [
        { name: "Quick Start Guide", type: "PDF", url: "#" },
        { name: "Home Screen Layout", type: "Image", url: "#" }
      ],
      hasTranscript: true
    },
    { 
      id: 2, 
      title: "Understanding the Home Screen", 
      duration: "8:45", 
      completed: true,
      description: "Explore the home screen layout, learn about app icons, widgets, and how to customize your home screen to suit your needs.",
      resources: [
        { name: "Home Screen Customization Guide", type: "PDF", url: "#" },
        { name: "Widget Reference Sheet", type: "PDF", url: "#" }
      ],
      hasTranscript: true
    },
    { 
      id: 3, 
      title: "Making Your First Call", 
      duration: "10:15", 
      completed: false,
      description: "Step-by-step instructions on how to make phone calls, including dialing numbers, using contacts, and understanding call options.",
      resources: [
        { name: "Calling Features Worksheet", type: "PDF", url: "#" },
        { name: "Emergency Contacts Template", type: "PDF", url: "#" }
      ],
      hasTranscript: true
    },
    { 
      id: 4, 
      title: "Sending Text Messages", 
      duration: "9:30", 
      completed: false,
      description: "Learn how to send and receive text messages, use predictive text, add emojis, and manage your message conversations.",
      resources: [
        { name: "Texting Tips & Tricks", type: "PDF", url: "#" },
        { name: "Emoji Guide", type: "PDF", url: "#" }
      ],
      hasTranscript: true
    },
    { 
      id: 5, 
      title: "Using the Camera", 
      duration: "15:20", 
      completed: false,
      description: "Discover how to take photos and videos with your smartphone camera, including basic editing and sharing options.",
      resources: [
        { name: "Camera Settings Guide", type: "PDF", url: "#" },
        { name: "Photo Editing Basics", type: "PDF", url: "#" },
        { name: "Sharing Photos Checklist", type: "PDF", url: "#" }
      ],
      hasTranscript: true
    },
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

  const handleVideoEnd = () => {
    if (autoAdvance && currentLesson < lessons.length - 1) {
      setTimeout(() => {
        handleNextLesson();
      }, 2000); // 2 second delay before auto-advance
    }
  };

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-yutime-neutral flex flex-col">
      <CoursePlayerHeader 
        course={course}
        onBack={() => navigate('/dashboard')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        autoAdvance={autoAdvance}
        setAutoAdvance={setAutoAdvance}
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
            onVideoEnd={handleVideoEnd}
            canGoNext={currentLesson < lessons.length - 1}
            canGoPrevious={currentLesson > 0}
          />
          
          <SessionContent 
            lesson={lessons[currentLesson]}
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
