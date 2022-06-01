import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Xarrow = dynamic(() => import('react-xarrows'), { ssr: false });

type ArrowProps = {
  end: string;
  start: string;
  color?: string;
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
  color = '#6ee7b7',
  curveness = 0.6,
  dashness = true,
  end,
  endAnchor,
  headSize = 7,
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
        color={color}
        strokeWidth={strokeWidth}
        headSize={headSize}
        curveness={curveness}
        dashness
        arrowBodyProps={{
          strokeDasharray: '6 4',
        }}
        {...arrowProps}
      />
    </div>
  );
}
