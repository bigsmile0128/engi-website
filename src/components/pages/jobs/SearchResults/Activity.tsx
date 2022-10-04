import React from 'react';
import classNames from 'classnames';
import { UserIcon } from '@heroicons/react/outline';

type ActivityProps = {
  className?: string;
  isLoading?: boolean;
  numContributors?: number;
  numTests?: number;
  testsPassed?: number;
};

export default function Activity({
  className,
  numTests,
  testsPassed,
  numContributors,
  isLoading,
}: ActivityProps) {
  if (!isLoading && numTests === 0) {
    return null;
  }

  return (
    <div className={classNames('flex items-end gap-x-4', className)}>
      <div
        className={classNames(
          'flex items-center',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <UserIcon className="h-4 w-auto text-white/60" />
        <span className="font-bold md:w-6 ml-1">{numContributors}</span>
        <span className="block md:hidden text-sm text-[#C2C2C2] ml-1 self-end mb-[2px]">{`(${testsPassed}/${numTests})`}</span>
      </div>
      <div className="hidden md:block w-20 xl:w-32">
        <div className="flex flex-col items-center w-full">
          <span
            className={classNames(
              'text-xs mb-1',
              isLoading ? 'h-2 skeleton' : ''
            )}
          >
            <span>
              {!isLoading && testsPassed && numTests
                ? `${testsPassed} / ${numTests ?? 1}`
                : ''}
              {isLoading && 'tests'}
            </span>
          </span>
          <div
            className={classNames(
              'rounded-full w-full overflow-hidden',
              isLoading ? 'skeleton' : 'bg-white/10'
            )}
          >
            <div
              className={classNames(
                'h-1.5 rounded-full',
                isLoading ? 'invisible' : 'bg-[#F27B50]'
              )}
              style={{ width: `${(testsPassed / numTests || 0) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
