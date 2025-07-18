
import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ExpiryCountdownProps {
  expiryDate: Date;
  className?: string;
  isMobile?: boolean;
}

const ExpiryCountdown: React.FC<ExpiryCountdownProps> = ({ expiryDate, className = "", isMobile = false }) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expiryDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
      } else {
        setDaysLeft(0);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [expiryDate]);

  const formatExpiryDate = (date: Date) => {
    if (isMobile) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpiringSoon = daysLeft <= 7;
  const isExpired = daysLeft === 0;

  if (isExpired) {
    return (
      <div className={`flex items-center space-x-1 text-red-600 text-sm font-medium ${className}`}>
        <Eye size={14} />
        <span>Access Expired</span>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={`flex items-center space-x-1 text-sm ${isExpiringSoon ? 'text-orange-600' : 'text-gray-600'} ${className}`}>
        <Eye size={14} />
        <span>
          {daysLeft} days left. Access ends on {formatExpiryDate(expiryDate)}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-1 text-sm ${isExpiringSoon ? 'text-orange-600' : 'text-gray-600'} ${className}`}>
      <Eye size={14} />
      <span>
        Your course access ends in {daysLeft} days (on {formatExpiryDate(expiryDate)})
      </span>
    </div>
  );
};

export default ExpiryCountdown;
