import React from 'react';
import classNames from 'classnames';

type ProgressBarProps = {
  className?: string;
  label?: string;
  percentage?: number;
};

export default function ProgressBar({
  className,
  label,
  percentage = 0,
}: ProgressBarProps) {
  return (
    <div className={classNames('flex flex-col', className)}>
      {label && (
        <span className="text-[13px] text-secondary block ml-auto">
          {label}
        </span>
      )}
      <div className="relative h-[4px]">
        <div className="absolute inset-0 rounded-full bg-green-primary/20"></div>
        <div
          className="absolute inset-0 rounded-full bg-green-primary"
          style={{
            width: `${percentage * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
