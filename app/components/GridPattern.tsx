import React from 'react';
import classNames from 'classnames';

interface GridPatternProps {
  className?: string;
  size?: number;
  offset?: number;
}

export default function GridPattern({
  className,
  size = 60,
  offset = 0,
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
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <rect
            stroke="rgba(255,255,255,.1)"
            fill="none"
            width={size}
            height={size}
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
