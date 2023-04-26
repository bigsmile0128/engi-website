import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const Xarrow = dynamic(() => import('react-xarrows'), { ssr: false });

type ArrowProps = {
  [key: string]: any;
  className?: string;
  color?: string;
  curveness?: number;
  dashness?: boolean;
  end: string;
  endAnchor?: any;
  headSize?: number;
  start: string;
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
  ...props
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
    <motion.div className={classNames('', className)} {...props}>
      <Xarrow
        start={start}
        end={end}
        color={color}
        strokeWidth={strokeWidth}
        headSize={headSize}
        curveness={curveness}
        dashness={dashness}
        arrowBodyProps={{
          strokeDasharray: '6 4',
        }}
        {...arrowProps}
      />
    </motion.div>
  );
}
