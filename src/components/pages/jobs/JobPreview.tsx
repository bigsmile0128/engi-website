import React from 'react';
import classNames from 'classnames';
import { AiOutlineUser } from '@react-icons/all-files/ai/AiOutlineUser';
import Link from 'next/link';
import TimeEstimate from '~/components/TimeEstimate';
import JobInfo from './SearchResults/JobInfo';

interface JobPreviewProps {
  className?: string;
  id?: string;
  isLoading?: boolean;
  language?: string;
  numContributors?: number;
  numTests?: number;
  reward?: number;
  testsPassed?: number;
  timeEstimate?: number;
  title?: string;
}

export default function JobPreview({
  className,
  language,
  title,
  numTests,
  testsPassed,
  timeEstimate,
  reward,
  numContributors,
  isLoading,
  id,
}: JobPreviewProps) {
  return (
    <Link href={`/jobs/${id}`} passHref>
      <a>
        <div
          className={classNames(
            'bg-black/[.14] text-gray-200',
            // 'bg-red-300',
            isLoading ? 'pointer-events-none' : 'hover:bg-black/40',
            className
          )}
        >
          <JobInfo
            name={title}
            isLoading={isLoading}
            className="md:hidden flex items-center p-6 pb-0 gap-x-4"
          />
          <div className={classNames('flex-1 flex justify-between p-6')}>
            <JobInfo
              name={title}
              isLoading={isLoading}
              className="hidden md:flex flex-col justify-between"
            />
            <div className="hidden sm:flex flex-col justify-between items-start">
              <span
                className={classNames('text-xs', isLoading ? 'skeleton' : '')}
              >
                <span>contributors</span>
              </span>
              <div
                className={classNames(
                  'flex items-center',
                  isLoading ? 'hidden' : ''
                )}
              >
                <AiOutlineUser className="text-medium" />
                <span className="block ml-1 text-sm">
                  {numContributors ?? 'N/A'}
                </span>
              </div>
              <span className={isLoading ? 'text-xs skeleton' : 'hidden'}>
                <span>placeholder</span>
              </span>
            </div>
            <div className="flex flex-col justify-between items-start sm:w-20 md:w-32">
              <span
                className={classNames('text-xs', isLoading ? 'skeleton' : '')}
              >
                <span>test progress</span>
              </span>
              <div className="flex flex-col items-center w-full">
                <span
                  className={classNames(
                    'text-xs mb-1',
                    isLoading ? 'h-2 skeleton' : ''
                  )}
                >
                  <span>
                    {!isLoading && testsPassed && numTests
                      ? `${testsPassed} / ${numTests}`
                      : ''}
                    {isLoading && 'tests'}
                  </span>
                </span>
                <div
                  className={classNames(
                    'rounded-full w-full overflow-hidden',
                    isLoading ? 'skeleton' : 'bg-gray-200'
                  )}
                >
                  <div
                    className={classNames(
                      'h-1.5 rounded-full',
                      isLoading ? 'invisible' : 'bg-green-400'
                    )}
                    style={{ width: `${(testsPassed / numTests || 0) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-start">
              <span
                className={classNames('text-xs', isLoading ? 'skeleton' : '')}
              >
                <span>estimated time</span>
              </span>
              <TimeEstimate
                className={classNames(isLoading ? 'hidden' : '')}
                duration={timeEstimate ? `${timeEstimate} hours` : 'N/A'}
              />
              <span className={isLoading ? 'text-xs skeleton' : 'hidden'}>
                <span>placeholder</span>
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <span
                className={classNames('text-xs', isLoading ? 'skeleton' : '')}
              >
                <span>minimum wage</span>
              </span>
              <div className="flex items-end">
                <span
                  className={classNames(
                    'mr-1',
                    isLoading ? 'h-5 skeleton' : 'font-grifter -mb-[4px]'
                  )}
                >
                  <span>
                    {!isLoading && (reward ? `$${reward}` : 'N/A')}
                    {isLoading && '$100'}
                  </span>
                </span>
                <span
                  className={classNames(
                    'text-sm text-secondary',
                    isLoading ? 'h-4 skeleton' : ''
                  )}
                >
                  <span>
                    {!isLoading &&
                      (reward ? `e${Math.floor(reward * 1.6)}` : '')}
                    {isLoading && 'e100'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
