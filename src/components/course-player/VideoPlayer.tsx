
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  description: string;
  resources: Array<{ name: string; type: string; url: string }>;
  hasTranscript: boolean;
  videoUrl: string;
  videoType: 'youtube' | 'vimeo' | 'hosted';
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
  canGoPrevious
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isHostedVideo, setIsHostedVideo] = useState(false);

  // Determine video type and URL
  const getVideoEmbedUrl = (url: string, type: string) => {
    switch (type) {
      case 'youtube':
        const youtubeId = url.includes('watch?v=') 
          ? url.split('watch?v=')[1].split('&')[0]
          : url.split('/').pop();
        return `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0`;
      case 'vimeo':
        const vimeoId = url.split('/').pop();
        return `https://player.vimeo.com/video/${vimeoId}`;
      case 'hosted':
      default:
        return url;
    }
  };

  useEffect(() => {
    setIsHostedVideo(lesson.videoType === 'hosted');
  }, [lesson.videoType]);

  useEffect(() => {
    if (isHostedVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isHostedVideo]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only handle keyboard events for hosted videos
    if (!isHostedVideo) return;
    
    switch (e.key) {
      case ' ':
      case 'k':
        e.preventDefault();
        handlePlayPause();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration, 
            videoRef.current.currentTime + 10
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
        }
        break;
    }
  };

  const videoUrl = getVideoEmbedUrl(lesson.videoUrl, lesson.videoType);

  return (
    <div className="flex-1 flex flex-col bg-black" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex-1">
        <AspectRatio ratio={16 / 9} className="bg-black">
          {isHostedVideo ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                src={videoUrl}
                aria-label={`Video: ${lesson.title}`}
                controls={false}
              />
              
              {/* Video overlay controls for hosted videos */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            />
          )}
        </AspectRatio>
      </div>
      
      {/* Video controls - only show for hosted videos */}
      {isHostedVideo && (
        <div className="bg-gray-900 p-4 space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm font-medium">{lesson.title}</span>
          </div>
          
          <div 
            className="w-full bg-gray-700 rounded-full h-2 cursor-pointer"
            onClick={handleProgressClick}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div 
              className="bg-yutime-blue h-2 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                disabled={!canGoPrevious}
                className="text-white hover:bg-gray-800 disabled:opacity-50"
                aria-label="Previous lesson"
              >
                <SkipBack size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:bg-gray-800"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={!canGoNext}
                className="text-white hover:bg-gray-800 disabled:opacity-50"
                aria-label="Next lesson"
              >
                <SkipForward size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
                aria-label="Volume"
              >
                <Volume2 size={20} />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
                aria-label="Settings"
              >
                <Settings size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
                aria-label="Fullscreen"
              >
                <Maximize size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
