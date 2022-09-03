import React from 'react';
import classNames from 'classnames';
import { SiPython } from '@react-icons/all-files/si/SiPython';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type JobInfoProps = {
  className?: string;
  name?: string;
  createdOn?: string;
  isLoading?: boolean;
};

export default function JobInfo({
  className,
  name,
  createdOn,
  isLoading,
}: JobInfoProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-1 items-start',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="flex items-center gap-x-4">
        <SiPython
          className={classNames(
            'h-7 w-7 text-green-primary rounded-full p-1.5 bg-[#050505]/[.24]',
            {
              invisible: isLoading,
            }
          )}
        />
        <span className="text-xs text-white/80">
          Created {dayjs(createdOn).fromNow()}
        </span>
      </div>
      <span className={classNames('font-bold text-gray-200 w-48 truncate')}>
        {name ?? 'N/A'}
      </span>
    </div>
  );
}
