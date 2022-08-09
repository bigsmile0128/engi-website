import React from 'react';
import classNames from 'classnames';
import { SiPython } from '@react-icons/all-files/si/SiPython';

type JobInfoProps = {
  className?: string;
  title?: string;
  isSkeleton?: boolean;
  titleClassName?: string;
  iconClassName?: string;
};

export default function JobInfo({
  className,
  title,
  isSkeleton,
  titleClassName,
  iconClassName,
}: JobInfoProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-1',
        isSkeleton ? 'children:skeleton' : '',
        className
      )}
    >
      <div>
        <SiPython
          className={classNames(
            'h-7 w-7 text-green-primary rounded-full p-1.5 bg-[#050505]/[.24]',
            {
              invisible: isSkeleton,
            },
            iconClassName
          )}
        />
      </div>
      <span
        className={classNames(
          'font-bold text-gray-200 w-48 truncate',
          titleClassName
        )}
      >
        {title ?? 'N/A'}
      </span>
    </div>
  );
}
