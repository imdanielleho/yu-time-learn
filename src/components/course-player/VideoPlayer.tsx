import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings, RotateCcw, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Updated video sources for different lessons
  const getVideoSource = (lessonId: number) => {
    // Using publicly available sample videos that should work
    const videoSources = {
      1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", 
      3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      6: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      7: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      8: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      9: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      10: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      11: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
      12: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      13: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      14: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      15: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      16: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    };
    
    return videoSources[lessonId] || videoSources[1];
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd();
    };

    const handleError = (e: any) => {
      console.error('Video error:', e);
      // Force reload after a short delay
      setTimeout(() => {
        if (video.src) {
          video.load();
        }
      }, 1000);
    };

    const handleCanPlay = () => {
      console.log('Video can play');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Load the video source
    video.src = getVideoSource(lesson.id);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [lesson.id, setProgress, onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    video.volume = newVolume / 100;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume / 100;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const skip5Seconds = (forward: boolean) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = forward 
      ? Math.min(video.currentTime + 5, duration)
      : Math.max(video.currentTime - 5, 0);
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
    const progressPercent = (newTime / duration) * 100;
    setProgress(progressPercent);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <TooltipProvider>
      <div className="relative bg-black w-full group h-[60vh]"
           onMouseMove={handleMouseMove}
           onMouseLeave={() => isPlaying && setShowControls(false)}>
        
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={getVideoSource(lesson.id)}
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          preload="metadata"
          crossOrigin="anonymous"
        />

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-20 h-20 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </Button>
        </div>

        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <Slider
              value={[progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/80 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px]"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPlaying ? '暫停' : '播放'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px]"
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? '取消靜音' : '靜音'}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex items-center space-x-2">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip5Seconds(false)}
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px] group relative"
                  >
                    <RotateCcw size={20} />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      -5s
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>倒退5秒</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                    className="px-2 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]"
                  >
                    <SkipBack size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>上一個課程</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNext}
                    disabled={!canGoNext}
                    className="px-2 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]"
                  >
                    <SkipForward size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>下一個課程</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => skip5Seconds(true)}
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px] group relative"
                  >
                    <RotateCw size={20} />
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      +5s
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>快進5秒</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px]"
                  >
                    <Settings size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>設定</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20 min-w-[44px] min-h-[44px]"
                  >
                    <Maximize size={24} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>全螢幕</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

      </div>
    </TooltipProvider>
  );
};

export default VideoPlayer;
