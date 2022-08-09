import React from 'react';
import classNames from 'classnames';
import TimeEstimate from 'components/TimeEstimate';

type EffortProps = {
  className?: string;
  timeEstimate?: number;
  isSkeleton?: boolean;
};

export default function Effort({
  className,
  timeEstimate,
  isSkeleton,
}: EffortProps) {
  return (
    <div className={classNames('flex items-end gap-x-2', className)}>
      <TimeEstimate
        className={classNames('w-20', isSkeleton ? 'children:skeleton' : '')}
        duration={`${timeEstimate} hours`}
      />
      <div className="hidden xl:block relative h-[20px] w-[40px] overflow-hidden mb-1">
        <div
          className={classNames(
            'absolute h-[40px] w-[40px] left-0 right-0 top-0 rounded-full',
            'border-[12px]',
            isSkeleton
              ? 'skeleton border-[#00000022] bg-transparent'
              : 'border-white/30 border-b-green-primary border-l-green-primary rotate'
          )}
          style={{
            transform: `rotate(${timeEstimate * 3}deg)`,
          }}
        />
      </div>
    </div>
  );
}
