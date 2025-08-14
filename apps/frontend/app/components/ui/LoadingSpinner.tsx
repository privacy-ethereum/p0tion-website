"use client";
import { useState, useEffect } from "react";

export const LoadingSpinner = ({ percentage }: { percentage: number }) => {
  const [progress, setProgress] = useState(percentage);
  const [isAnimating, setIsAnimating] = useState(false);

  // Circle properties
  const size = 84;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke dash offset based on progress
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Auto-animate demo
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsAnimating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleProgressChange = (e: any) => {
    setProgress(parseInt(e.target.value));
    setIsAnimating(false);
  };

  const startDemo = () => {
    setProgress(0);
    setIsAnimating(true);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Progress Circle */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#D1D1D1"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-100"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#131313"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
      </div>
    </div>
  );
};
