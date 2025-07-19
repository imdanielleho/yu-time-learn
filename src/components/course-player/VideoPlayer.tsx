
import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  hasTranscript: boolean;
}

interface VideoPlayerProps {
  lesson: Lesson;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onVideoEnd: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  lessons: Lesson[];
  currentLesson: number;
  overallProgress: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  lesson,
  isPlaying,
  setIsPlaying,
  progress,
  setProgress,
  onNext,
  onPrevious,
  onVideoEnd,
  canGoNext,
  canGoPrevious,
  lessons,
  currentLesson,
  overallProgress
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    onVideoEnd();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newProgress = (clickX / width) * 100;
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Video Container with 16:9 aspect ratio */}
      <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          aria-label={`Video: ${lesson.title}`}
        />
        
        {/* Video overlay content */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-xs mb-2 border border-white rounded px-2 py-1 inline-block">1-1</div>
            <h2 className="text-2xl font-bold mb-4 max-w-2xl">
              不懂財報，依然賺錢？<br />
              有什麼好學的？策略、計畫、<br />
              財務三者相連
            </h2>
          </div>
        </div>
        
        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <div className="flex-1 flex items-center space-x-2">
              <span className="text-white text-sm">00:00</span>
              <div 
                className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-1 bg-white rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-sm">{lesson.duration}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-3 bg-blue-400"></div>
                <div className="w-1 h-3 bg-blue-400"></div>
                <div className="w-1 h-3 bg-blue-400"></div>
                <div className="w-1 h-3 bg-blue-400"></div>
              </div>
              <span className="text-white text-sm">CC</span>
              <Settings size={16} className="text-white" />
              <Maximize size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar and controls below video */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-600 font-medium">上課進度</span>
            <span className="text-sm text-blue-600 font-bold">{overallProgress}%</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Settings size={16} />
              <span>課堂教具</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <MessageSquare size={16} />
              <span>課堂討論</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <span>⭐</span>
              <span>評價課程</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <span>❓</span>
              <span>問題回報</span>
            </Button>
          </div>
        </div>
        
        <Progress value={overallProgress} className="h-2 bg-gray-200">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </Progress>
      </div>
    </div>
  );
};

export default VideoPlayer;
