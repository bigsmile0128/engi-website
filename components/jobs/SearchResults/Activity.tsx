import React from 'react';
import classNames from 'classnames';
import { UserIcon } from '@heroicons/react/outline';

type ActivityProps = {
  className?: string;
  numTests?: number;
  testsPassed?: number;
  numContributors?: number;
  isSkeleton?: boolean;
};

export default function Activity({
  className,
  numTests,
  testsPassed,
  numContributors,
  isSkeleton,
}: ActivityProps) {
  return (
    <div className={classNames('flex items-end gap-x-4', className)}>
      <div
        className={classNames(
          'flex items-center -mb-1',
          isSkeleton ? 'children:skeleton' : ''
        )}
      >
        <UserIcon className="h-4 w-auto text-white/60" />
        <span className="font-bold md:w-6 ml-1">{numContributors}</span>
        <span className="block md:hidden text-sm text-[#C2C2C2] ml-1">{`(${testsPassed}/${numTests})`}</span>
      </div>
      <div className="hidden md:block w-20 xl:w-32">
        <div className="flex flex-col items-center w-full">
          <span
            className={classNames(
              'text-xs mb-1',
              isSkeleton ? `h-2 skeleton` : ''
            )}
          >
            <span>
              {!isSkeleton && testsPassed && numTests
                ? `${testsPassed} / ${numTests}`
                : ''}
              {isSkeleton && 'tests'}
            </span>
          </span>
          <div
            className={classNames(
              'rounded-full w-full overflow-hidden',
              isSkeleton ? 'skeleton' : 'bg-white/10'
            )}
          >
            <div
              className={classNames(
                'h-1.5 rounded-full',
                isSkeleton ? 'invisible' : 'bg-[#F27B50]'
              )}
              style={{ width: `${(testsPassed / numTests || 0) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
