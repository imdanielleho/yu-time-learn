
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, RotateCcw } from 'lucide-react';

interface VideoEndOverlayProps {
  show: boolean;
  onNext: () => void;
  onCancel: () => void;
  onWatchAgain: () => void;
  canGoNext: boolean;
  nextLessonTitle?: string;
  countdownSeconds?: number;
}

const VideoEndOverlay: React.FC<VideoEndOverlayProps> = ({
  show,
  onNext,
  onCancel,
  onWatchAgain,
  canGoNext,
  nextLessonTitle,
  countdownSeconds = 10
}) => {
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log('VideoEndOverlay show state changed:', show, 'canGoNext:', canGoNext);
    if (show && canGoNext) {
      setCountdown(countdownSeconds);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [show, canGoNext, countdownSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && countdown > 0) {
      console.log('Starting countdown:', countdown);
      interval = setInterval(() => {
        setCountdown((prev) => {
          console.log('Countdown tick:', prev);
          if (prev <= 1) {
            console.log('Countdown finished, calling onNext');
            setIsActive(false);
            onNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, countdown, onNext]);

  console.log('VideoEndOverlay render - show:', show, 'canGoNext:', canGoNext, 'isActive:', isActive, 'countdown:', countdown);

  if (!show) {
    console.log('VideoEndOverlay not showing - show is false');
    return null;
  }

  if (!canGoNext) {
    console.log('VideoEndOverlay not showing - canGoNext is false');
    return null;
  }

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-in fade-in-0 zoom-in-95 duration-300 shadow-2xl">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            課程即將切換
          </h3>
          <p className="text-gray-600 text-base">
            下一個課程將在 <span className="text-blue-600 font-bold text-lg">{countdown}</span> 秒後開始...
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onWatchAgain}
            className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-gray-50"
          >
            <RotateCcw size={18} />
            重新觀看
          </Button>
          
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-6 py-3 border-2 hover:bg-gray-50"
          >
            取消自動播放
          </Button>
          
          <Button
            onClick={onNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium"
          >
            立即前往下一課
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoEndOverlay;
