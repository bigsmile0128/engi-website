import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Xarrow = dynamic(() => import('react-xarrows'), { ssr: false });

type ArrowProps = {
  end: string;
  start: string;
  className?: string;
  curveness?: number;
  dashness?: boolean;
  endAnchor?: any;
  headSize?: number;
  startAnchor?: any;
  strokeWidth?: number;
};

export default function Arrow({
  className,
  curveness = 0.6,
  dashness = true,
  end,
  endAnchor,
  headSize = 8,
  start,
  startAnchor,
  strokeWidth = 1,
}: ArrowProps) {
  // undefined anchor props will throw an error
  const arrowProps: Record<string, any> = {};
  if (startAnchor) {
    arrowProps.startAnchor = startAnchor;
  }
  if (endAnchor) {
    arrowProps.endAnchor = endAnchor;
  }

  return (
    <div className={classNames('', className)}>
      <Xarrow
        start="arrow-start1"
        end="arrow-end"
        strokeWidth={strokeWidth}
        headSize={headSize}
        curveness={curveness}
        dashness
        {...arrowProps}
      />
    </div>
  );
}
