import React from "react";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 - 100
  color?: string;
  backgroundColor?: string;
  text?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 70,
  strokeWidth = 8,
  progress,
  color = "#7046C6", // purple-800
  backgroundColor = "", // gray-200
  text,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      <svg width={size} height={size}>
        <circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
      </svg>
      <span className="absolute text-sm font-semibold text-gray-700">
        {text || `${progress}%`}
      </span>
    </div>
  );
};

export default CircularProgress;
