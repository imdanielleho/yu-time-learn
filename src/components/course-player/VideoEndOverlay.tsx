
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
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
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

  if (!show || !canGoNext) return null;

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 text-center animate-scale-in">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            課程已結束
          </h3>
          <p className="text-gray-600 text-sm">
            {nextLessonTitle ? `下一個課程：${nextLessonTitle}` : '下一個課程即將開始'}
          </p>
        </div>

        <div className="mb-6">
          <div className="text-3xl font-bold text-yutime-secondary mb-2">
            {countdown}
          </div>
          <p className="text-gray-500 text-sm">
            秒後自動播放下一個課程
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onWatchAgain}
            className="flex items-center gap-2"
          >
            <RotateCcw size={16} />
            重新觀看
          </Button>
          
          <Button
            onClick={onNext}
            className="bg-yutime-secondary hover:bg-yutime-secondary/90"
          >
            立即播放下一個
          </Button>
          
          <Button
            variant="ghost"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X size={16} />
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoEndOverlay;
