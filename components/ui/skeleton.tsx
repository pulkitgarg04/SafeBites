import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", width, height, style }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height, ...style }}
    />
  );
};

export default Skeleton; 