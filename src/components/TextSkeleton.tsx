import React from 'react';
import classNames from 'classnames';

type TextSkeletonProps = {
  className?: string;
  numLines?: number;
};

export default function TextSkeleton({
  className,
  numLines = 4,
}: TextSkeletonProps) {
  const lineWidth = [1.0, 0.8, 1.0, 0.6];
  return (
    <div className={classNames('flex flex-col w-full children:h-6', className)}>
      {Array.from({ length: numLines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{
            width: `${lineWidth[i % lineWidth.length] * 100}%`,
          }}
        ></div>
      ))}
    </div>
  );
}
