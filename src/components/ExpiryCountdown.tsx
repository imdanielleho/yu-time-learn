
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ExpiryCountdownProps {
  expiryDate: Date;
  className?: string;
}

const ExpiryCountdown: React.FC<ExpiryCountdownProps> = ({ expiryDate, className = "" }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
  }>({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expiryDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [expiryDate]);

  const isExpiringSoon = timeLeft.days <= 7;
  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;

  if (isExpired) {
    return (
      <div className={`flex items-center space-x-1 text-red-600 text-sm font-medium ${className}`}>
        <Eye size={14} />
        <span>Access Expired</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 text-sm ${isExpiringSoon ? 'text-orange-600' : 'text-gray-600'} ${className}`}>
      <Eye size={14} />
      <span>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {timeLeft.minutes}m left
      </span>
    </div>
  );
};

export default ExpiryCountdown;
