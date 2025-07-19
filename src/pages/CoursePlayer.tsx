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
  const [progress, setProgress] = useState(9);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Enhanced lessons data organized by chapters with additional lessons
  const chapters = [
    {
      id: 1,
      title: "Chapter 1. 專利財報3D教學法｜掌握賺錢、花錢、算錢思維",
      duration: "1hr 8min",
      lessons: [
        { 
          id: 1, 
          title: "1. 不懂財報，依然賺錢！有什麼好學的？策略、計畫、財務三者相連", 
          duration: "16min 35s", 
          completed: true,
          description: "Learn the fundamentals of financial reports and their connection to strategy and planning.",
          hasTranscript: true
        },
        { 
          id: 2, 
          title: "2. 我不是老闆也不是高管，怎麼將財報用在生活中？", 
          duration: "13min 52s", 
          completed: true,
          description: "Discover how to apply financial report knowledge in your daily life.",
          hasTranscript: true
        },
        { 
          id: 3, 
          title: "3. 財富中翻中，你比自己想像的更懂財報", 
          duration: "8min 33s", 
          completed: true,
          description: "Understand that you know more about financial reports than you think.",
          hasTranscript: true
        },
        { 
          id: 4, 
          title: "4. 三大報表財會科目練習", 
          duration: "9min 1s", 
          completed: false,
          description: "Practice with the three major financial statement categories.",
          hasTranscript: true
        },
        { 
          id: 5, 
          title: "5. 財務報表的基本結構與邏輯", 
          duration: "12min 20s", 
          completed: false,
          description: "Understanding the basic structure and logic of financial statements.",
          hasTranscript: true
        },
        { 
          id: 6, 
          title: "6. 如何解讀財務比率", 
          duration: "8min 10s", 
          completed: false,
          description: "Learn how to interpret key financial ratios.",
          hasTranscript: true
        }
      ]
    },
    {
      id: 2,
      title: "Chapter 2. 賺錢的能力：是賺還是虧｜損益",
      duration: "1hr 15min",
      lessons: [
        { 
          id: 7, 
          title: "1. 損益表基礎概念", 
          duration: "12min 15s", 
          completed: false,
          description: "Basic concepts of profit and loss statements.",
          hasTranscript: true
        },
        { 
          id: 8, 
          title: "2. 營收分析技巧", 
          duration: "18min 30s", 
          completed: false,
          description: "Techniques for analyzing revenue streams.",
          hasTranscript: true
        },
        { 
          id: 9, 
          title: "3. 成本控制策略", 
          duration: "14min 35s", 
          completed: false,
          description: "Strategies for effective cost control.",
          hasTranscript: true
        },
        { 
          id: 10, 
          title: "4. 毛利率與淨利率分析", 
          duration: "16min 25s", 
          completed: false,
          description: "Analyzing gross and net profit margins.",
          hasTranscript: true
        },
        { 
          id: 11, 
          title: "5. 季度與年度收益比較", 
          duration: "13min 15s", 
          completed: false,
          description: "Comparing quarterly and annual earnings.",
          hasTranscript: true
        }
      ]
    }
  ];

  // Flatten lessons for easier navigation
  const allLessons = chapters.flatMap(chapter => chapter.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(lesson => lesson.completed).length;

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
    if (currentLesson < allLessons.length - 1) {
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
    if (autoAdvance && currentLesson < allLessons.length - 1) {
      setTimeout(() => {
        handleNextLesson();
      }, 2000);
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
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'mr-80' : ''
        }`}>
          <VideoPlayer 
            lesson={allLessons[currentLesson]}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            progress={progress}
            setProgress={setProgress}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            onVideoEnd={handleVideoEnd}
            canGoNext={currentLesson < allLessons.length - 1}
            canGoPrevious={currentLesson > 0}
            lessons={allLessons}
            currentLesson={currentLesson}
            overallProgress={9}
          />
          
          <SessionContent 
            lesson={allLessons[currentLesson]}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            canGoNext={currentLesson < allLessons.length - 1}
            canGoPrevious={currentLesson > 0}
          />
        </div>
        
        <CoursePlayerSidebar 
          course={course}
          chapters={chapters}
          currentLesson={currentLesson}
          onLessonSelect={handleLessonSelect}
          isOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          totalLessons={totalLessons}
          completedLessons={completedLessons}
        />
      </div>
    </div>
  );
};

export default CoursePlayer;
