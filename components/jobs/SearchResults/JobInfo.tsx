import React from 'react';
import classNames from 'classnames';
import { SiPython } from '@react-icons/all-files/si/SiPython';

type JobInfoProps = {
  className?: string;
  title?: string;
  isSkeleton?: boolean;
};

export default function JobInfo({
  className,
  title,
  isSkeleton,
}: JobInfoProps) {
  return (
    <div className={classNames('', className)}>
      <div
        className={classNames('mb-1', isSkeleton ? `self-start skeleton` : '')}
      >
        <SiPython
          className={classNames(
            'h-7 w-7 text-green-primary rounded-full p-1.5 bg-[#050505]/[.24]',
            {
              invisible: isSkeleton,
            }
          )}
        />
      </div>
      <span
        className={classNames('font-bond text-gray-200 text-sm w-48 truncate')}
      >
        <div className={classNames('truncate', isSkeleton ? 'skeleton' : '')}>
          <span>{title ?? 'N/A'}</span>
        </div>
      </span>
    </div>
  );
}
