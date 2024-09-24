import React from 'react';

interface SkeletonProps {
  count: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-300 h-48"></div>
      ))}
    </div>
  );
};

export default Skeleton;
