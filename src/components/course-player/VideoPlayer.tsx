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
  const [showPlayPauseIcon, setShowPlayPauseIcon] = useState(false);
  const [playPauseIconType, setPlayPauseIconType] = useState<'play' | 'pause'>('play');

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
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    // Show play/pause feedback icon
    setPlayPauseIconType(newPlayingState ? 'play' : 'pause');
    setShowPlayPauseIcon(true);
    setTimeout(() => {
      setShowPlayPauseIcon(false);
    }, 500);
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
    <div className="flex flex-col bg-black">
      {/* Video Container - MasterClass inspired clean design */}
      <div 
        ref={containerRef}
        className={`relative w-full bg-black cursor-pointer ${isFullscreen ? 'h-screen' : 'aspect-video'}`}
        onClick={handleVideoClick}
        onMouseMove={handleMouseMove}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          aria-label={`Video: ${lesson.title}`}
        />
        
        {/* Auto-advance overlay - MasterClass style */}
        {showAutoAdvance && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
              <h3 className="text-xl font-medium text-yutime-primary mb-4">下一課程即將開始</h3>
              <p className="text-yutime-text/70 mb-6">
                <span className="font-medium text-yutime-secondary text-2xl">{countdown}</span> 秒後自動播放
              </p>
              <div className="flex space-x-3 justify-center">
                <Button
                  variant="outline"
                  onClick={handleWatchAgain}
                  className="flex items-center space-x-2 border-yutime-neutral/30"
                >
                  <RotateCcw size={16} />
                  <span>重新觀看</span>
                </Button>
                <Button
                  onClick={() => {
                    handleCancelAutoAdvance();
                    onNext();
                  }}
                  className="bg-yutime-secondary hover:bg-yutime-secondary/90 text-white"
                >
                  下一課程
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Play/Pause Feedback Icon */}
        {showPlayPauseIcon && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-black/50 rounded-full p-4 animate-scale-in">
              {playPauseIconType === 'play' ? 
                <Play size={40} className="text-white fill-white" /> : 
                <Pause size={40} className="text-white fill-white" />
              }
            </div>
          </div>
        )}

        {/* Minimal Navigation buttons - MasterClass style */}
        {canGoPrevious && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className={`bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-200 h-12 w-12 rounded-full ${
                showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
        )}

        {canGoNext && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className={`bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-all duration-200 h-12 w-12 rounded-full ${
                showControls ? 'opacity-100' : 'opacity-0 hover:opacity-100'
              }`}
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
        
        {/* Video controls overlay - MasterClass inspired */}
        <div className={`video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Progress bar */}
          <div className="mb-4">
            <div 
              className="h-1 bg-white/20 rounded-full cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                handleProgressClick(e);
              }}
            >
              <div 
                className="h-1 bg-yutime-secondary rounded-full transition-all duration-150 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yutime-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="text-white hover:bg-white/20 h-10 w-10"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              
              <div className="flex items-center space-x-2 text-white text-sm">
                <span>{getCurrentTime()}</span>
                <span className="text-white/60">/</span>
                <span>{lesson.duration}</span>
              </div>
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
                    }}
                    className="text-white hover:bg-white/20 h-9 w-9"
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

              {/* Settings Menu */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white hover:bg-white/20 h-9 w-9"
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
                className="text-white hover:bg-white/20 h-9 w-9"
              >
                <Maximize size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson title and progress - Clean MasterClass style */}
      {!isFullscreen && (
        <div className="bg-yutime-primary/95 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium mb-1">{lesson.title}</h2>
              <p className="text-white/70 text-sm">課程 {currentLesson + 1} / {lessons.length}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70 mb-1">課程進度</div>
              <div className="text-yutime-accent font-medium">{overallProgress}%</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-1 bg-white/20">
            <div 
              className="h-full bg-yutime-accent rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </Progress>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;