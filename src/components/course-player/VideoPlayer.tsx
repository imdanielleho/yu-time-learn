import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings, RotateCcw, RotateCw, Captions } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import VideoEndOverlay from './VideoEndOverlay';

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
  const [videoKey, setVideoKey] = useState(0);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  const getVideoSource = (lessonId: number) => {
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
    setVideoKey(prev => prev + 1);
    setShowEndOverlay(false);
    setCurrentTime(0);
    setProgress(0);
  }, [lesson.id]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setDuration(video.duration || 0);
    };

    const handleTimeUpdate = () => {
      const currentVideoTime = video.currentTime || 0;
      const videoDuration = video.duration || 0;
      
      console.log('Time update:', currentVideoTime, '/', videoDuration);
      
      if (videoDuration > 0) {
        setCurrentTime(currentVideoTime);
        const progressPercent = (currentVideoTime / videoDuration) * 100;
        setProgress(progressPercent);
      }
    };

    const handleEnded = () => {
      console.log('Video ended - canGoNext:', canGoNext);
      setIsPlaying(false);
      
      if (canGoNext) {
        console.log('Setting showEndOverlay to true');
        setShowEndOverlay(true);
      } else {
        console.log('Cannot go to next lesson, not showing overlay');
      }
    };

    const handleError = (e: any) => {
      console.error('Video error:', e);
    };

    const handleCanPlay = () => {
      console.log('Video can play, duration:', video.duration);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const handleLoadStart = () => {
      console.log('Video load started');
      setCurrentTime(0);
      setProgress(0);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [lesson.id, setProgress, canGoNext]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        skip5Seconds(false);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        skip5Seconds(true);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, setIsPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const formatTime = (timeInSeconds: number) => {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    
    const totalSeconds = Math.floor(timeInSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video || !duration || isNaN(duration)) return;
    
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

  const toggleCaptions = () => {
    setCaptionsEnabled(!captionsEnabled);
    console.log('Captions toggled:', !captionsEnabled);
  };

  const skip5Seconds = (forward: boolean) => {
    const video = videoRef.current;
    if (!video || !duration || isNaN(duration)) return;
    
    console.log(`Skipping ${forward ? 'forward' : 'backward'} 5 seconds`);
    
    const newTime = forward 
      ? Math.min(video.currentTime + 5, duration)
      : Math.max(video.currentTime - 5, 0);
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
    const progressPercent = (newTime / duration) * 100;
    setProgress(progressPercent);
  };

  const handleSkipBackward = () => {
    console.log('Skip backward button clicked');
    skip5Seconds(false);
  };

  const handleSkipForward = () => {
    console.log('Skip forward button clicked');
    skip5Seconds(true);
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

  const handleAutoAdvanceNext = () => {
    console.log('Auto advance next clicked');
    setShowEndOverlay(false);
    onNext();
  };

  const handleCancelAutoAdvance = () => {
    console.log('Cancel auto advance clicked');
    setShowEndOverlay(false);
  };

  const handleWatchAgain = () => {
    console.log('Watch again clicked');
    setShowEndOverlay(false);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const getNextLessonTitle = () => {
    if (canGoNext && currentLesson < lessons.length - 1) {
      return lessons[currentLesson + 1].title;
    }
    return undefined;
  };

  return (
    <TooltipProvider>
      <div className="relative bg-black w-full group h-[50vh] md:h-[73vh]"
           onMouseMove={handleMouseMove}
           onMouseLeave={() => isPlaying && setShowControls(false)}>
        
        <video
          key={videoKey}
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="metadata"
          crossOrigin="anonymous"
          playsInline
          controls={false}
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
          src={getVideoSource(lesson.id)}
        />

        <div className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipBackward}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all group ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center">
              <RotateCcw size={16} className="md:w-5 md:h-5" />
              <span className="text-xs mt-1">5s</span>
            </div>
          </Button>
        </div>

        <div className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSkipForward}
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all group ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center">
              <RotateCw size={16} className="md:w-5 md:h-5" />
              <span className="text-xs mt-1">5s</span>
            </div>
          </Button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isPlaying ? <Pause size={24} className="md:w-8 md:h-8" /> : <Play size={24} className="md:w-8 md:h-8" />}
          </Button>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          
          <div className="mb-2 md:mb-4">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20 w-8 h-8 md:min-w-[44px] md:min-h-[44px]"
                  >
                    {isPlaying ? <Pause size={16} className="md:w-6 md:h-6" /> : <Play size={16} className="md:w-6 md:h-6" />}
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
                    className="text-white hover:bg-white/20 w-8 h-8 md:min-w-[44px] md:min-h-[44px]"
                  >
                    {isMuted ? <VolumeX size={16} className="md:w-6 md:h-6" /> : <Volume2 size={16} className="md:w-6 md:h-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMuted ? '取消靜音' : '靜音'}</p>
                </TooltipContent>
              </Tooltip>

              <div className="hidden md:flex items-center space-x-2">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  className="w-20"
                />
              </div>
            </div>

            <div className="flex items-center space-x-1 md:space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPrevious}
                    disabled={!canGoPrevious}
                    className="px-1 md:px-2 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 md:min-w-[44px] md:min-h-[44px]"
                  >
                    <SkipBack size={16} className="md:w-6 md:h-6" />
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
                    className="px-1 md:px-2 text-white hover:bg-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-8 h-8 md:min-w-[44px] md:min-h-[44px]"
                  >
                    <SkipForward size={16} className="md:w-6 md:h-6" />
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
                    onClick={toggleCaptions}
                    className={`text-white hover:bg-white/20 w-8 h-8 md:min-w-[44px] md:min-h-[44px] ${
                      captionsEnabled ? 'bg-white/20' : ''
                    }`}
                  >
                    <Captions size={16} className="md:w-6 md:h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{captionsEnabled ? '關閉字幕' : '開啟字幕'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex text-white hover:bg-white/20 min-w-[44px] min-h-[44px]"
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
                    className="text-white hover:bg-white/20 w-8 h-8 md:min-w-[44px] md:min-h-[44px]"
                  >
                    <Maximize size={16} className="md:w-6 md:h-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>全螢幕</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <VideoEndOverlay
          show={showEndOverlay}
          onNext={handleAutoAdvanceNext}
          onCancel={handleCancelAutoAdvance}
          onWatchAgain={handleWatchAgain}
          canGoNext={canGoNext}
          nextLessonTitle={getNextLessonTitle()}
          countdownSeconds={10}
        />

      </div>
    </TooltipProvider>
  );
};

export default VideoPlayer;
