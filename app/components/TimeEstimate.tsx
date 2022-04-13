import React from 'react';
import classNames from 'classnames';
import { BiTime } from 'react-icons/bi';

interface TimeEstimateProps {
  className?: string;
  duration: string;
}

export default function TimeEstimate({
  className,
  duration,
}: TimeEstimateProps) {
  return (
    <div className={classNames('flex items-center', className)}>
      <BiTime className="text-medium text-gray-300" />
      <span className="ml-1 block text-sm text-gray-200">{duration}</span>
    </div>
  );
}
