import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, ChevronLeft, ChevronRight, RotateCcw, Captions } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

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
  console.log('VideoPlayer rendered with lesson:', lesson);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAutoAdvance, setShowAutoAdvance] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [countdownInterval, setCountdownInterval] = useState<NodeJS.Timeout | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showCaptions, setShowCaptions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  const qualityOptions = ['Auto', '1080p', '720p', '480p', '360p'];

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    if (showControls && isPlaying) {
      const timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      setControlsTimeout(timeout);
    }

    return () => {
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [showControls, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    // Don't trigger play/pause if clicking on controls
    if ((e.target as HTMLElement).closest('.video-controls')) {
      return;
    }
    handlePlayPause();
    setShowControls(true);
  };

  const handleMouseMove = () => {
    setShowControls(true);
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
    if (canGoNext) {
      setShowAutoAdvance(true);
      setCountdown(10);
      
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowAutoAdvance(false);
            onNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setCountdownInterval(interval);
    } else {
      onVideoEnd();
    }
  };

  const handleCancelAutoAdvance = () => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setCountdownInterval(null);
    }
    setShowAutoAdvance(false);
    setCountdown(10);
  };

  const handleWatchAgain = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(true);
    }
    handleCancelAutoAdvance();
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

  const handleFullscreen = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  };

  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    if (volumeValue > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentTime = () => {
    return videoRef.current ? formatTime(videoRef.current.currentTime) : '00:00';
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Video Container */}
      <div 
        ref={containerRef}
        className={`relative w-full bg-black cursor-pointer ${isFullscreen ? 'h-screen' : ''}`} 
        style={!isFullscreen ? { height: '50vh' } : {}}
        onClick={handleVideoClick}
        onMouseMove={handleMouseMove}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          aria-label={`Video: ${lesson.title}`}
        />
        
        {/* Auto-advance overlay */}
        {showAutoAdvance && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center">
              <h3 className="text-lg font-semibold mb-4">課程即將切換</h3>
              <p className="text-gray-600 mb-4">
                下一個課程將在 <span className="font-bold text-blue-600">{countdown}</span> 秒後開始...
              </p>
              <div className="flex space-x-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleWatchAgain}
                  className="flex items-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>重新觀看</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelAutoAdvance}
                >
                  取消自動播放
                </Button>
                <Button
                  onClick={() => {
                    handleCancelAutoAdvance();
                    onNext();
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  立即前往下一課
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            disabled={!canGoPrevious}
            className={`bg-black/50 text-white hover:bg-black/70 transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            }`}
          >
            <ChevronLeft size={20} />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={!canGoNext}
            className={`bg-black/50 text-white hover:bg-black/70 transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
            }`}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
        
        {/* Video controls overlay */}
        <div className={`video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <div className="flex-1 flex items-center space-x-2">
              <span className="text-white text-sm">{getCurrentTime()}</span>
              <div 
                className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgressClick(e);
                }}
              >
                <div 
                  className="h-1 bg-white rounded-full transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-sm">{lesson.duration}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Volume Control */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVolumeToggle();
                    }}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-2" onClick={(e) => e.stopPropagation()}>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.1}
                    className="w-full"
                  />
                </PopoverContent>
              </Popover>

              {/* Closed Captions */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCaptions(!showCaptions);
                }}
                className={`text-white hover:bg-white/20 ${showCaptions ? 'bg-white/20' : ''}`}
              >
                <Captions size={16} />
              </Button>

              {/* Settings Menu */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white hover:bg-white/20"
                  >
                    <Settings size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2" onClick={(e) => e.stopPropagation()}>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm font-medium">播放速度</label>
                      <div className="grid grid-cols-4 gap-1 mt-1">
                        {playbackSpeeds.map((speed) => (
                          <Button
                            key={speed}
                            variant={playbackSpeed === speed ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPlaybackSpeed(speed)}
                            className="text-xs"
                          >
                            {speed}x
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">畫質</label>
                      <div className="space-y-1 mt-1">
                        {qualityOptions.map((quality) => (
                          <Button
                            key={quality}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs"
                          >
                            {quality}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFullscreen();
                }}
                className="text-white hover:bg-white/20"
              >
                <Maximize size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress section below video */}
      {!isFullscreen && (
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-600 font-medium">上課進度 {overallProgress}%</span>
            <div className="flex-1">
              <Progress value={overallProgress} className="h-2 bg-gray-200">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </Progress>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
