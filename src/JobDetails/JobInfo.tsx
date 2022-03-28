import React from 'react';
import classNames from 'classnames';
import { AiFillCalendar } from 'react-icons/ai';

interface JobInfoProps {
  className?: string;
}

export default function JobInfo({ className }: JobInfoProps) {
  return (
    <div className={classNames('bg-[#00000022] px-6 py-4', className)}>
      <p className="mb-4 font-bold">Job Info</p>
      <div className="grid grid-rows-2 grid-cols-1 gap-x-6 gap-y-2">
        <div className="flex gap-x-3">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path
              d="M2 0V16H18V18H0V0H2ZM16.94 2.94L19.06 5.06L13 11.122L10 8.122L6.06 12.062L3.94 9.94L10 3.88L13 6.88L16.94 2.94Z"
              fill="#F27B50"
            />
          </svg>

          <div className="flex flex-col gap-y-0.5">
            <span className="font-bold">Progress</span>
            <span className="text-sm text-gray-400">5 / 10 tests</span>
          </div>
        </div>
        <div className="flex gap-x-3">
          <AiFillCalendar className="fill-[#65FEB7] h-5 w-5" />
          <div className="flex flex-col gap-y-0.5">
            <span className="font-bold">10 days</span>
            <span className="text-sm text-gray-400">Time remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}
