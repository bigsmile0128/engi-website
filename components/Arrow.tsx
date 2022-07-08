import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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
  [key: string]: any;
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
        dashness
        arrowBodyProps={{
          strokeDasharray: '6 4',
        }}
        {...arrowProps}
      />
    </motion.div>
  );
}
