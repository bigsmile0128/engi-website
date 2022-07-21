import React from 'react';
import classNames from 'classnames';

interface GridPatternProps {
  className?: string;
  size?: number;
  offset?: number;
  sizeX?: number;
  sizeY?: number;
}

export default function GridPattern({
  className,
  size = 60,
  offset = 0,
  sizeX,
  sizeY,
}: GridPatternProps) {
  return (
    <svg
      className={classNames('absolute', className)}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id={`grid-${size}`}
          x={offset}
          y={offset}
          width={sizeX ?? size}
          height={sizeY ?? size}
          patternUnits="userSpaceOnUse"
        >
          <rect
            stroke="rgba(255,255,255,.1)"
            fill="none"
            width={sizeX ?? size}
            height={sizeY ?? size}
          ></rect>
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#grid-${size})`}
      ></rect>
    </svg>
  );
}
