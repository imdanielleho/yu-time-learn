import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '@/data/courses';
import CoursePlayerSidebar from '@/components/course-player/CoursePlayerSidebar';
import VideoPlayer from '@/components/course-player/VideoPlayer';
import CoursePlayerHeader from '@/components/course-player/CoursePlayerHeader';
import SessionContentWithSidebar from '@/components/course-player/SessionContentWithSidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(9);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile); // Default closed on mobile
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Enhanced lessons data organized by chapters with additional lessons and resources
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
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "財報基礎講義", type: "PDF", url: "#" },
            { name: "練習題目", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 2, 
          title: "2. 我不是老闆也不是高管，怎麼將財報用在生活中？", 
          duration: "13min 52s", 
          completed: true,
          description: "Discover how to apply financial report knowledge in your daily life.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 3, 
          title: "3. 財富中翻中，你比自己想像的更懂財報", 
          duration: "8min 33s", 
          completed: true,
          description: "Understand that you know more about financial reports than you think.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "參考圖表", type: "Image", url: "#" }
          ]
        },
        { 
          id: 4, 
          title: "4. 三大報表財會科目練習", 
          duration: "9min 1s", 
          completed: false,
          description: "Practice with the three major financial statement categories.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "練習工作表", type: "PDF", url: "#" },
            { name: "解答範例", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 5, 
          title: "5. 財務報表的基本結構與邏輯", 
          duration: "12min 20s", 
          completed: false,
          description: "Understanding the basic structure and logic of financial statements.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 6, 
          title: "6. 如何解讀財務比率", 
          duration: "8min 10s", 
          completed: false,
          description: "Learn how to interpret key financial ratios.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "財務比率表", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 12, 
          title: "7. 財務風險評估技巧", 
          duration: "11min 45s", 
          completed: false,
          description: "Learn techniques for assessing financial risks.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 13, 
          title: "8. 投資組合分析方法", 
          duration: "15min 22s", 
          completed: false,
          description: "Methods for analyzing investment portfolios.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "投資分析模板", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 14, 
          title: "9. 現金流量表深度解析", 
          duration: "14min 8s", 
          completed: false,
          description: "In-depth analysis of cash flow statements.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 15, 
          title: "10. 企業價值評估基礎", 
          duration: "17min 30s", 
          completed: false,
          description: "Basics of company valuation.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "估值計算表", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 16, 
          title: "11. 財務報表比較分析", 
          duration: "13min 55s", 
          completed: false,
          description: "Comparative analysis of financial statements.",
          hasTranscript: true,
          hasResources: false
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
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "損益表範例", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 8, 
          title: "2. 營收分析技巧", 
          duration: "18min 30s", 
          completed: false,
          description: "Techniques for analyzing revenue streams.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 9, 
          title: "3. 成本控制策略", 
          duration: "14min 35s", 
          completed: false,
          description: "Strategies for effective cost control.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "成本分析工具", type: "PDF", url: "#" }
          ]
        },
        { 
          id: 10, 
          title: "4. 毛利率與淨利率分析", 
          duration: "16min 25s", 
          completed: false,
          description: "Analyzing gross and net profit margins.",
          hasTranscript: true,
          hasResources: false
        },
        { 
          id: 11, 
          title: "5. 季度與年度收益比較", 
          duration: "13min 15s", 
          completed: false,
          description: "Comparing quarterly and annual earnings.",
          hasTranscript: true,
          hasResources: true,
          resources: [
            { name: "收益比較表", type: "PDF", url: "#" }
          ]
        }
      ]
    }
  ];

  // Flatten lessons for easier navigation
  const allLessons = chapters.flatMap(chapter => chapter.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(lesson => lesson.completed).length;

  // Adjust sidebar state based on mobile/desktop changes
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

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
    <div className="min-h-screen bg-yutime-neutral flex flex-col w-full">
      <CoursePlayerHeader 
        course={course}
        onBack={() => navigate('/dashboard')}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        autoAdvance={autoAdvance}
        setAutoAdvance={setAutoAdvance}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
      />
      
      <div className="flex flex-1 overflow-hidden w-full">
        <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${
          !isMobile && sidebarOpen ? 'mr-80' : ''
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
          
          <SessionContentWithSidebar 
            lesson={allLessons[currentLesson]}
            course={course}
            chapters={chapters}
            currentLesson={currentLesson}
            onLessonSelect={handleLessonSelect}
            totalLessons={totalLessons}
            completedLessons={completedLessons}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
            canGoNext={currentLesson < allLessons.length - 1}
            canGoPrevious={currentLesson > 0}
          />
        </div>
        
        {!isMobile && (
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
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
